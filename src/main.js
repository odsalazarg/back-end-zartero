const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
require('./index.js');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    icon: path.join(__dirname, 'img/icons/zartero.jpg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    show: false // No mostrar la ventana hasta que esté lista
  });

  mainWindow.maximize();
  mainWindow.loadURL('http://localhost:3000/');

  // Mostrar la ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Manejar el foco de la ventana
  mainWindow.on('blur', () => {
    mainWindow.webContents.focus();
  });

  // Reenfoque después de diálogos
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      setTimeout(() => {
        mainWindow.webContents.focus();
      }, 100);
      return { action: 'allow' };
    });
  });

  mainWindow.webContents.on('new-window', function (evt, url, frameName, disposition, options, additionalFeatures) {
    if(options.width == 800 && options.height == 600) {
      let {width, height} = screen.getPrimaryDisplay().workAreaSize;
      options.width = width * 0.9 | 0;
      options.height = height * 0.9 | 0;
    }
  });

  // Manejar errores de la ventana
  mainWindow.webContents.on('crashed', () => {
    mainWindow.webContents.reload();
  });
}

app.on('ready', createMainWindow);

// Manejar la activación de la aplicación
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// Manejar el cierre de la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});