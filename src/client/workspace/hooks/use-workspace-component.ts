import { useAppSelector } from "@client/state"
import Settings from "@client/app/settings"
import Editor from "@client/editor"
import Null from "@client/null"
import Switch from "@core/utils/switch"

export const useWorkspaceComponent = () => {
  const currentActivity = useAppSelector((state) => state.activityBar.currentActivity)

  return Switch.of(currentActivity).case("editor", Editor).case("settings", Settings).default(Null)
}
