import type { UnaryFn } from "@core/types"

export const noOp: UnaryFn<[...unknown[]], void> = () => void 0
