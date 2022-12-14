import type { IconName } from "@client/use-icon"
import type { Thunk } from "@core/types"

export type TMenuItem = {
  accelerator?: string
  title: string
  icon?: IconName
  action?: Thunk<any>
}

export type TMenu = {
  children: TMenuItem[]
}
