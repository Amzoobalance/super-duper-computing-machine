import type { PayloadAction, Action } from "@reduxjs/toolkit"

declare global {
  interface Window {
    ordo: {
      emit: <Result = void, Payload = any>(
        action: Action | PayloadAction<Payload>
      ) => Promise<Result>
    }
  }
}

export {}
