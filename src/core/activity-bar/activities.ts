import type { Activity } from "@core/activity-bar/types"

/**
 * A list of activities natively supported by Ordo.
 */
export const topActivities: Activity[] = [
  {
    name: "editor",
    title: "ordo.activity.editor.title",
    icon: "BsLayoutTextWindow",
  },
  // {
  //   name: "graph",
  //   title: "ordo.activity.graph",
  //   icon: "BsShare",
  // },
  // {
  //   name: "checkboxes",
  //   title: "ordo.activity.checkboxes",
  //   icon: "BsCheck2Square",
  // },
  // {
  //   name: "tags",
  //   title: "ordo.activity.tags",
  //   icon: "BsTags",
  // },
  // {
  //   name: "calendar",
  //   title: "ordo.activity.calendar",
  //   icon: "BsCalendarDate",
  // },
  // {
  //   name: "find-in-files",
  //   title: "ordo.activity.find-in-files",
  //   icon: "BsSearch",
  // },
]

export const bottomActivities: Activity[] = [
  {
    icon: "BsBell",
    title: "ordo.activity.notifications.title",
    name: "notifications",
  },
  // {
  //   icon: "BsPerson",
  //   title: "ordo.activity.account.title",
  //   name: "account",
  // },
  // {
  //   icon: "BsAward",
  //   title: "ordo.activity.achievements.title",
  //   name: "achievements",
  // },
  // {
  //   icon: "BsPuzzle",
  //   title: "ordo.activity.extensions.title",
  //   name: "extensions",
  // },
  {
    icon: "FaCogs",
    title: "ordo.activity.settings.title",
    name: "settings",
  },
]
