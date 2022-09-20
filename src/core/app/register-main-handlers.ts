import type { IpcMain } from "electron"
import type { Fn } from "@core/types"

export const registerMainHandlers =
  (handlers: Record<string, Fn>) => (ipcMain: IpcMain) => {
    const keys = Object.keys(handlers)

    keys.forEach((key) => ipcMain.handle(key, (_, args) => handlers[key](args)))

    return () => keys.forEach((key) => ipcMain.removeHandler(key))
  }
