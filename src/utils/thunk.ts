export const thunk =
  <T>(arg: T): (() => T) =>
  () =>
    arg
