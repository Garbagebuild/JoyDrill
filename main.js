const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let minerProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'logo.png'), // ✅ Uses logo.png in project root
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  // Optional: Only open DevTools in development mode
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

function startMiner(cpuLimit) {
  // Kill any existing miner before starting new one
  if (minerProcess) {
    minerProcess.kill();
    minerProcess = null;
  }

  const isDev = !app.isPackaged;
  const xmrigPath = isDev
    ? path.join(__dirname, 'xmrig.exe')
    : path.join(process.resourcesPath, 'xmrig.exe');

  minerProcess = spawn(xmrigPath, [
    '--config=config.json',
    `--max-cpu-usage=${cpuLimit}`,
    '--print-time=10',
    '--donate-level=1'
  ], {
    cwd: path.dirname(xmrigPath)
  });

  // Pipe logs to renderer
  minerProcess.stdout.on('data', (data) => {
    mainWindow.webContents.send('miner-log', data.toString());
  });

  minerProcess.stderr.on('data', (data) => {
    mainWindow.webContents.send('miner-log', `[stderr] ${data.toString()}`);
  });

  minerProcess.on('error', (err) => {
    mainWindow.webContents.send('miner-log', `[spawn error] ${err.message}`);
  });

  minerProcess.on('exit', () => {
    mainWindow.webContents.send('miner-stopped');
    minerProcess = null;
  });
}

function stopMiner() {
  if (minerProcess) {
    minerProcess.kill();
    minerProcess = null;
  }
}

// 🚀 App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopMiner();
    app.quit();
  }
});

app.on('before-quit', stopMiner);

// 🛰 IPC
ipcMain.on('startMiner', (event, cpuLimit) => startMiner(cpuLimit));
ipcMain.on('stopMiner', stopMiner);
