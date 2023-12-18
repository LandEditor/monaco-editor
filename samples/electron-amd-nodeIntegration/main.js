const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			worldSafeExecuteJavaScript: true,
			sandbox: false,
			contextIsolation: false,
		},
	});
	mainWindow.loadURL(`file://${__dirname}/electron-index.html`);
	mainWindow.webContents.openDevTools();
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
