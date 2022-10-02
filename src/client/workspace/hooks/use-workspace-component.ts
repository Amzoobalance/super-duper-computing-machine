import { useAppSelector } from "@client/state"
import Switch from "@core/utils/switch"

import Settings from "@client/app/settings"
import Editor from "@client/editor"
import Null from "@client/null"
import Checkboxes from "@client/checkboxes"

export const useWorkspaceComponent = () => {
  const currentActivity = useAppSelector((state) => state.activityBar.currentActivity)

  return Switch.of(currentActivity)
    .case("editor", Editor)
    .case("checkboxes", Checkboxes)
    .case("settings", Settings)
    .default(Null)
}
