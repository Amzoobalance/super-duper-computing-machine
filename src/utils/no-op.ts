import type { UnaryFn } from "@core/types"

export const noOp: UnaryFn<[...any[]], void> = () => void 0

const NoOp: UnaryFn<[...any[]], null> = () => null

export default NoOp
