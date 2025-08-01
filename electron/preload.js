const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Menu events
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-new-file', callback);
    ipcRenderer.on('menu-open-folder', callback);
    ipcRenderer.on('menu-save', callback);
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },

  // Platform info
  platform: process.platform,
  
  // App info
  getVersion: () => {
    return process.env.npm_package_version || '1.0.0';
  }
});

// Prevent the renderer process from accessing Node.js
delete global.require;
delete global.exports;
delete global.module;