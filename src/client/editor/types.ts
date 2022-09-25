import { CaretRangeDirection } from "./constants"

export type CaretPosition = {
  line: number
  column: number
}

export type CaretRange = {
  start: CaretPosition
  end: CaretPosition
  direction: CaretRangeDirection
}
