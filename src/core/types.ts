export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type Fn<Arguments = any, Result = void> = Arguments extends any[]
  ? (...args: Arguments) => Result
  : Arguments extends void
  ? () => Result
  : (arg: Arguments) => Result

export type UnaryFn<Arg, Result> = (arg: Arg) => Result

export type BinaryFn<Arg1, Arg2, Result> = Fn<[Arg1, Arg2], Result>

export type TernaryFn<Arg1, Arg2, Arg3, Result> = Fn<[Arg1, Arg2, Arg3], Result>

export type Unpack<T> = T extends Array<infer U> ? U : T

export type Thunk<T> = () => T

export type OrdoEvent<
  Scope extends string = string,
  Identifier extends string = string
> = `@${Scope}/${Identifier}`
