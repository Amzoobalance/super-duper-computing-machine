import type { PayloadAction, Action } from "@reduxjs/toolkit"

declare global {
  interface Window {
    ordo: {
      emit: <T = void>(action: Action | PayloadAction) => Promise<T>
    }
  }
}

export {}
