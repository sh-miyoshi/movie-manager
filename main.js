const { app, BrowserWindow } = require('electron')
let mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') app.quit()
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // open developer tools for debug
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
