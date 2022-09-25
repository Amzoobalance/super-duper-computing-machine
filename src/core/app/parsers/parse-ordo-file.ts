import { Root } from "@client/editor/types"
import { visit } from "unist-util-visit"
import { createRoot } from "./create-root"

export const parseOrdoFile = (raw: string): Root => {
  const root = createRoot(raw)

  return root
}

const extractTags = () => (tree: Root) =>
  visit(tree, "text", (node, index, parent) => {
    // TODO Extract tags (they start with --)
    // @example --my-tag --work/to-do
  })

const extractToDos = () => (tree: Root) =>
  visit(tree, "text", (node, index, parent) => {
    // TODO Extract to dos (they start at line start with ( ) - unchecked or (*) - checked)
    // @example |( ) Wash the dishes, |(*) Play WoW all night
  })

const extractLinks = () => (tree: Root) =>
  visit(tree, "text", (node, index, parent) => {
    // TODO Extract links (they are wrapped with (()))
    // @example ((folder/another-file.mdo)), ((photos/2022/img.png))
    // TODO Extract embeds (they are wrapped with !(()))
    // @example !((folder/another-file.mdo))
  })

const extractDates = () => (tree: Root) =>
  visit(tree, "text", (node, index, parent) => {
    // TODO Extract dates (they look like !ISO_date--cron_pattern?--ISO_end_date or !(ISO_date_reminder--cron_pattern?--ISO_end_date))
    // @example !2022-09-25, !2022-09-25T09:03:47.133Z
    // @example !2022-09-25--00***--2022-10-25 - Appear daily at midnight since Sep 25, 2022 till Oct 25, 2022
    // @example !(2022-09-25T09:00:00.133Z--****7--2022-12-31) - Remind every Sunday at 9am since Sep 25, 2022 till Dec 31, 2022
    // TODO There are also critical dates (they they look like !!(ISO_additional_date) or !!(ISO_date_reminder)
    // TODO They are used to highlight the main date in the file that should be shown in cases when only one date can be shown
    // TODO f(for example, on Kanban board cards)
    // @example !!2022-09-25--00***--2022-10-25 - Appear daily at midnight since Sep 25, 2022 till Oct 25, 2022
  })

// TODO: "+++++ h1", "++++ h2", "+++ h3", "++ h4", "+ h5", "**strong**", "_em_", "`code`", "~~s~~", "---", ":emoji:", "text1 // text2" (<details><summary>{text1}</summary><div>{text2}</div><details />)
// TODO: MAYBE: wrap content in braces that shows on hover? This option can be disabled in options
