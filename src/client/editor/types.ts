import { PhrasingContent } from "mdast"
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

export type LinePosition = {
  start: CaretPosition & { indend?: boolean }
  end: CaretPosition & { indent?: boolean }
}

export type Line = {
  type: "line"
  data: { raw: string }
  position: LinePosition
  children: PhrasingContent[]
}

export type Root = {
  type: "root"
  data: { raw: string }
  children: Line[]
}
