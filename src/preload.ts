import type { OrdoAction, OrdoActionWithPayload } from "@utils/types"

import { contextBridge, ipcRenderer } from "electron"

import { ordoEventEmitter } from "./ordo-event-emitter"

/**
 * @see https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 */
contextBridge.exposeInMainWorld("ordo", {
  emit: async (action: OrdoActionWithPayload) => {
    if (action.sendToApi) {
      const applied = await ipcRenderer.invoke(action.event, action.payload)

      const appliedApiAction: OrdoActionWithPayload = {
        event: `${action.event}::applied`,
        payload: {
          emitted: action,
          result: applied,
        },
      }

      ordoEventEmitter.emit(appliedApiAction)

      return applied
    } else {
      ordoEventEmitter.emit(action)
    }
  },
  on: (key: any, value: any) => ordoEventEmitter.on(key, value),
  off: (key: any, value: any) => ordoEventEmitter.off(key, value),
})
