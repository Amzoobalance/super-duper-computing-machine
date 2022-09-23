import type { Activity } from "@client/activity-bar/types"

/**
 * A list of activities natively supported by Ordo.
 * 3rd party activities also go here.
 */
export const topActivities: Activity[] = [
  {
    name: "editor",
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

/**
 * A list of static activities that cannot be extended externally.
 */
export const bottomActivities: Activity[] = [
  {
    icon: "BsBell",
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
    name: "settings",
  },
]
