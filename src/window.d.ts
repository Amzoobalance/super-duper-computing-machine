type OrdoEmitter<T extends EventMap> = {
  on<Key extends EventKey<T>>(eventName: Key, handler: EventReceiver<T[Key]>): void
  off<Key extends EventKey<T>>(eventName: Key, handler: EventReceiver<T[Key]>): void
  emit<Key extends EventKey<T>>(action: { event: Key; payload: T[Key] }): void
}

declare global {
  interface Window {
    ordo: OrdoEmitter
  }

  type EventMap = Record<string, any>
  type EventKey<T extends EventMap> = string & keyof T
  type EventReceiver<T> = (params?: T) => void
}

export {}
