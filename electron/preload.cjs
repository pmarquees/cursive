const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  appVersion: () => ipcRenderer.invoke("app:getVersion"),
  selectDirectory: () => ipcRenderer.invoke("app:selectDirectory"),
  fsListAll: (root) => ipcRenderer.invoke("fs:listAll", { root }),
  fsReadFile: (root, filePath) =>
    ipcRenderer.invoke("fs:readFile", { root, path: filePath }),
  fsWriteFile: (root, filePath, content) =>
    ipcRenderer.invoke("fs:writeFile", { root, path: filePath, content }),
  fsCreateEntry: (root, filePath, type, content) =>
    ipcRenderer.invoke("fs:createEntry", { root, path: filePath, type, content }),
  fsDeleteEntry: (root, filePath) =>
    ipcRenderer.invoke("fs:deleteEntry", { root, path: filePath })
});
