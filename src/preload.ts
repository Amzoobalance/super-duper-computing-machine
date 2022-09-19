// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron"
import { ordoEventEmitter } from "./ordo-event-emitter"

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// contextBridge.exposeInMainWorld("ordo", ordoEventEmitter)
contextBridge.exposeInMainWorld("ordo", {
  emit: (key: any, value: any) => ordoEventEmitter.emit(key, value),
  on: (key: any, value: any) => ordoEventEmitter.on(key, value),
  off: (key: any, value: any) => ordoEventEmitter.off(key, value),
})

contextBridge.exposeInMainWorld("api", {
  emit: (key: any, ...args: any[]) => ipcRenderer.invoke(key, ...args),
})
