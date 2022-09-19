declare global {
  type EventMap = Record<string, any>
  type EventKey<T extends EventMap> = string & keyof T
  type EventReceiver<T> = (params: T) => void
  type OrdoEmitter<T extends EventMap> = {
    on<Key extends EventKey<T>>(
      eventName: Key,
      handler: EventReceiver<T[Key]>
    ): void
    off<Key extends EventKey<T>>(
      eventName: Key,
      handler: EventReceiver<T[Key]>
    ): void
    emit<Key extends EventKey<T>>(eventName: Key, params: T[Key]): void
  }

  interface Window {
    ordo: OrdoEmitter
    api: {
      emit: (key: string, ...args: any[]) => any
    }
  }
}

export {}
