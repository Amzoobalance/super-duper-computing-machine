import { useEffect } from "react"

export const useGlobalEvent = (event: string, handler: (payload: any) => void, deps = []) => {
  useEffect(() => {
    window.ordo.on(event, handler)

    return () => {
      window.ordo.off(event, handler)
    }
  }, deps)
}
