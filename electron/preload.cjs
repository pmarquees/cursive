const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  appVersion: () => ipcRenderer.invoke("app:getVersion")
});
