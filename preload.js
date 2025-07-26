const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startMiner: (cpuLimit) => ipcRenderer.send('startMiner', cpuLimit),
  stopMining: () => ipcRenderer.send('stopMiner'),
  receiveMinerLog: (callback) => ipcRenderer.on('miner-log', callback),
  receiveMinerStopped: (callback) => ipcRenderer.on('miner-stopped', callback)
});
