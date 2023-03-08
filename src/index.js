const {
  app,
  BrowserWindow
} = require("electron")
const prompt = require('electron-prompt');

let win

async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    title: "My App",
    resizable: false,
    icon: __dirname + "/icon.ico"
  })
  win.maximize()

  win.loadURL("https://discord.com/users/@me")
  win.on('closed', () => win = null)
  var toukan = await prompt({
    title: 'Input Toukan',
    label: 'Toukan:',
    value: '',
    type: 'input'
  })
  if (!toukan) return
  win.webContents.executeJavaScript(`
  let token = "${toukan}";

  function login(token) {
      setInterval(() => {
        document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage.token = \`"\${token}"\`
      }, 50);
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  
  login(token);`)
}



app.on('activate', () => {
  if (!win) createWindow(toukan)
})
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})