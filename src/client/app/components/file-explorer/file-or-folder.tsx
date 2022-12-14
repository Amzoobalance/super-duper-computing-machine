import React from "react"

import type { OrdoFile, OrdoFolder } from "@core/app/types"
import { useFileExplorerComponent } from "@client/app/hooks/use-file-explorer-component"

type Props = {
  item: OrdoFile | OrdoFolder
}

export default function FileOrFolder({ item }: Props) {
  const Component = useFileExplorerComponent(item) as any

  return <Component item={item} />
}
