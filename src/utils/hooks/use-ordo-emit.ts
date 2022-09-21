import type { OrdoAction, OrdoEvent } from "@utils/types"

export const useEmit =
  ({ event, sendToApi }: OrdoAction) =>
  <T>(payload?: T) =>
    payload === undefined
      ? window.ordo.emit({ event, sendToApi })
      : window.ordo.emit({ event, payload, sendToApi })

export const useOrdoEmit = (event: OrdoEvent) => useEmit({ event })
export const useOrdoEmitWithAPI = (event: OrdoEvent) => useEmit({ event, sendToApi: true })
