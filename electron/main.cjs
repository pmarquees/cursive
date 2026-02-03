const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const { createServer } = require("http");
const { parse } = require("url");

const isDev = !app.isPackaged;
process.env.NODE_ENV = isDev ? "development" : "production";
const externalStartUrl = process.env.ELECTRON_START_URL;

let mainWindow;
let nextServer;
let nextServerPort;

function buildMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" }
            ]
          }
        ]
      : []),
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteAndMatchStyle" },
        { role: "delete" },
        { role: "selectAll" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [{ type: "separator" }, { role: "front" }]
          : [{ role: "close" }])
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function startNextServer() {
  const next = require("next");
  const appDir = isDev
    ? process.cwd()
    : path.join(process.resourcesPath, "app");

  const nextApp = next({ dev: isDev, dir: appDir });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();

  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });

    server.on("error", reject);
  });
}

async function ensureNextServer() {
  if (nextServer && nextServerPort) {
    return { server: nextServer, port: nextServerPort };
  }

  const { server, port } = await startNextServer();
  nextServer = server;
  nextServerPort = port;
  return { server, port };
}

async function createWindow() {
  const { port } = externalStartUrl ? { port: null } : await ensureNextServer();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 900,
    minHeight: 620,
    backgroundColor: "#0b0b0b",
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  const startUrl = externalStartUrl ?? `http://127.0.0.1:${port}`;
  await mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.on("ready", async () => {
  app.setName("Cursive");
  buildMenu();
  await createWindow();
});

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", async () => {
  if (nextServer) {
    await new Promise((resolve) => nextServer.close(resolve));
  }
});

ipcMain.handle("app:getVersion", () => app.getVersion());
ipcMain.handle("app:selectDirectory", async () => {
  if (!mainWindow) {
    return null;
  }
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"]
  });
  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }
  return result.filePaths[0];
});

function resolveWithinRoot(root, target) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(root, target || ".");
  if (
    resolvedTarget !== resolvedRoot &&
    !resolvedTarget.startsWith(resolvedRoot + path.sep)
  ) {
    throw new Error("Invalid path");
  }
  return { resolvedRoot, resolvedTarget };
}

async function listAll(root) {
  const results = [];

  async function walk(currentDir, prefix) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const relPath = prefix ? path.join(prefix, entry.name) : entry.name;
      const absPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        results.push({
          name: entry.name,
          path: relPath,
          type: "directory"
        });
        await walk(absPath, relPath);
      } else if (entry.isFile()) {
        const content = await fs.readFile(absPath, "utf-8");
        results.push({
          name: entry.name,
          path: relPath,
          type: "file",
          content
        });
      }
    }
  }

  await walk(root, "");
  return results;
}

ipcMain.handle("fs:listAll", async (_event, { root }) => {
  if (!root) {
    throw new Error("Root path is required");
  }
  const { resolvedRoot } = resolveWithinRoot(root, ".");
  return await listAll(resolvedRoot);
});

ipcMain.handle("fs:readFile", async (_event, { root, path: filePath }) => {
  if (!root || !filePath) {
    throw new Error("Root and path are required");
  }
  const { resolvedTarget } = resolveWithinRoot(root, filePath);
  return await fs.readFile(resolvedTarget, "utf-8");
});

ipcMain.handle("fs:writeFile", async (_event, { root, path: filePath, content }) => {
  if (!root || !filePath) {
    throw new Error("Root and path are required");
  }
  const { resolvedTarget } = resolveWithinRoot(root, filePath);
  await fs.mkdir(path.dirname(resolvedTarget), { recursive: true });
  await fs.writeFile(resolvedTarget, content ?? "", "utf-8");
  return true;
});

ipcMain.handle("fs:createEntry", async (_event, { root, path: filePath, type, content }) => {
  if (!root || !filePath || !type) {
    throw new Error("Root, path, and type are required");
  }
  const { resolvedTarget } = resolveWithinRoot(root, filePath);
  if (type === "directory") {
    await fs.mkdir(resolvedTarget, { recursive: true });
  } else {
    await fs.mkdir(path.dirname(resolvedTarget), { recursive: true });
    await fs.writeFile(resolvedTarget, content ?? "", "utf-8");
  }
  return true;
});

ipcMain.handle("fs:deleteEntry", async (_event, { root, path: filePath }) => {
  if (!root || !filePath) {
    throw new Error("Root and path are required");
  }
  const { resolvedTarget } = resolveWithinRoot(root, filePath);
  await fs.rm(resolvedTarget, { recursive: true, force: true });
  return true;
});
