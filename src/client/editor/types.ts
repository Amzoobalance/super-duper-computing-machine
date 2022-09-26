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

export type TextNode = {
  type: "text"
  position: LinePosition
  value: string
}

export type LineNode = {
  type: "line"
  data: { raw: string }
  position: LinePosition
  children: TextNode[]
}

export type RootNode = {
  type: "root"
  data: { raw: string }
  children: LineNode[]
}
