import Either from "@utils/either"
import { noOp } from "@utils/no-op"

const functionNotEquals =
  (receiver1: EventReceiver<any>) => (receiver2: EventReceiver<any>) =>
    String(receiver1) != String(receiver2)

const createOrdoEventEmitter = <T extends EventMap>(
  listeners: Record<EventKey<T>, EventReceiver<any>[]>
) => ({
  on: <Key extends EventKey<T>>(
    eventName: Key,
    handler: EventReceiver<T[Key]>
  ) => {
    listeners[eventName] = Either.fromNullable(listeners)
      .chain((listeners) => Either.fromNullable(listeners[eventName]))
      .fold(
        () => [handler],
        (handlers) => handlers.concat([handler])
      )
  },

  off: <Key extends EventKey<T>>(
    eventName: Key,
    handler: EventReceiver<T[Key]>
  ) => {
    listeners[eventName] = Either.fromNullable(listeners)
      .chain((listeners) => Either.fromNullable(listeners[eventName]))
      .fold(
        () => listeners[eventName],
        (handlers) => handlers.filter(functionNotEquals(handler))
      )
  },

  emit: <Key extends EventKey<T>>(eventName: Key, params: T[Key]) => {
    Either.fromNullable(listeners)
      .chain((listeners) => Either.fromNullable(listeners[eventName]))
      .fold(noOp, (listeners) => listeners.forEach((handle) => handle(params)))
  },
})

export const ordoEventEmitter = createOrdoEventEmitter({})
