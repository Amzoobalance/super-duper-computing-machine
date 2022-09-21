import { IconName } from "@utils/hooks/use-icon"

/**
 * Application activity
 */
export type Activity = {
  /**
   * Unique activity identifier.
   */
  id: string

  /**
   * Activity icon (can be selected from the provided list).
   */
  icon: IconName

  /**
   * Translation string of the activity name.
   */
  title: string
}
