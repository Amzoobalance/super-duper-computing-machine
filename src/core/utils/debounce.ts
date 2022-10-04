import { Fn, Nullable } from "@core/types"

/**
 * Debounce function call if it happens too often.
 */
export const debounce = async <TArgs extends unknown[], TResult>(
  func: (...args: TArgs) => TResult,
  timeout = 500
) => {
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: TArgs) => {
    if (timer != null) {
      func.apply(this, args)
    }

    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

const deferred = (ms: number): { promise: Nullable<Promise<any>>; cancel: any } => {
  let cancel
  const promise = new Promise((resolve, reject) => {
    cancel = reject
    setTimeout(resolve, ms)
  })
  return { promise, cancel }
}

export const debouncePromise = <Args extends any[], Result>(task: Fn<Args, Result>, ms: number) => {
  let t = { promise: null, cancel: () => void 0 } as {
    promise: Nullable<Promise<any>>
    cancel: any
  }
  return async (...args: Args) => {
    try {
      t.cancel()
      t = deferred(ms)
      await t.promise
      const result = await task(...args)
      return result
    } catch (e) {
      /* prevent memory leak */
    }
  }
}
