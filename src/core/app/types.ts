import { Color } from "@core/colors"

export type OrdoPathLike = string
export type OrdoPath = OrdoPathLike
export type OrdoRelativePath = OrdoPathLike
export type OrdoFileExtension = `.${string}`

export type OrdoAppEvent<T = unknown> = {
  type: string
  payload: T
}

export type OrdoFile<
  TMetadata extends Record<string, unknown> = Record<string, unknown>
> = {
  path: OrdoPath
  relativePath: OrdoRelativePath
  readableName: string
  parent: OrdoFolder | null
  depth: number
  createdAt: Date
  updatedAt: Date
  accessedAt: Date
  extension: OrdoFileExtension
  size: number
  metadata: TMetadata & { color: Color }
}

export type OrdoFolder<
  TMetadata extends Record<string, unknown> = Record<string, unknown>
> = OrdoFile<TMetadata> & {
  children: (OrdoFile | OrdoFolder)[]
  extension: null
}
