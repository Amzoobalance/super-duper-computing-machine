import { Color } from "@core/colors"
import { Nullable } from "@core/types"

export type OrdoPathLike = string
export type OrdoPath = OrdoPathLike
export type OrdoRelativePath = OrdoPathLike
export type OrdoFileExtension = `.${string}`

export type OrdoAppEvent<T = unknown> = {
  type: string
  payload: T
}

export interface OrdoFSElement {
  path: OrdoPath
  relativePath: OrdoRelativePath
  readableName: string
  parent: OrdoFolder | null
  depth: number
  createdAt: Date
  updatedAt: Date
  accessedAt: Date
}

export interface OrdoFile<TMetadata extends Record<string, unknown> = Record<string, unknown>>
  extends OrdoFSElement {
  extension: Nullable<OrdoFileExtension>
  metadata: TMetadata & { color: Color }
  size: number
}

export interface OrdoFolder<TMetadata extends Record<string, unknown> = Record<string, unknown>>
  extends OrdoFSElement {
  children: (OrdoFile | OrdoFolder)[]
  metadata: TMetadata & { color: Color }
}
