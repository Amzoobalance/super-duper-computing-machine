export type Unary<TArg, TReturn = TArg> = (x: TArg) => TReturn

export type Unpack<T> = T extends Array<infer U> ? U : T

export type Nullable<T> = T | null | undefined

export type Thunk<T> = () => T

export type OrdoEvent<
  Scope extends string = string,
  Identifier extends string = string
> = `@${Scope}/${Identifier}`

export type OrdoAction = {
  event: OrdoEvent
  sendToApi?: boolean
}

export type OrdoActionWithPayload<T = any> = OrdoAction & {
  payload: T
}
