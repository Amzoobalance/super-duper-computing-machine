import type { RootNode } from "@core/editor/types"

import { createRoot } from "@core/app/parsers/create-root"

export const parseOrdoFile = (raw: string): RootNode => {
  const root = createRoot(raw)

  const extract = createExtractor()

  extract(root)

  return root
}

const createExtractor = () => (tree: RootNode) => {
  const tagRx = /--([\p{L}-]+)/giu
  const checkboxRx = /^\([*\s]\)\s.*/
  const linkRx = /\(\((.*)\)\)/giu

  for (let i = 0; i < tree.children.length; i++) {
    for (let ci = 0; ci < tree.children[i].children.length; ci++) {
      const node = tree.children[i].children[ci]

      if (!node.value) {
        continue
      }

      if (tagRx.test(node.value)) {
        const tags = node.value.match(tagRx) as string[]
        const organizedTags = tags.map((tag) => tag.slice(2))
        tree.data.tags = Array.from(new Set(tree.data.tags.concat(organizedTags)))
      }

      if (checkboxRx.test(node.value)) {
        const checked = node.value.startsWith("(*) ")
        tree.data.checkboxes.push({
          checked,
          value: node.value,
        })
      }

      if (linkRx.test(node.value)) {
        const links = node.value.match(linkRx) as string[]
        const organizedLinks = links.map((link) => ({
          embed: link.startsWith("!"),
          href: link.slice(2, -2),
        }))
        tree.data.links = Array.from(new Set(tree.data.links.concat(organizedLinks)))
      }
    }
  }
}

// TODO Extract links (they are wrapped with (()))
// @example ((folder/another-file.mdo)), ((photos/2022/img.png))
// TODO Extract embeds (they are wrapped with !(()))
// @example !((folder/another-file.mdo))

// TODO Extract dates (they look like !ISO_date--cron_pattern?--ISO_end_date or !(ISO_date_reminder--cron_pattern?--ISO_end_date))
// @example !2022-09-25, !2022-09-25T09:03:47.133Z
// @example !2022-09-25--00***--2022-10-25 - Appear daily at midnight since Sep 25, 2022 till Oct 25, 2022
// @example !(2022-09-25T09:00:00.133Z--****7--2022-12-31) - Remind every Sunday at 9am since Sep 25, 2022 till Dec 31, 2022
// TODO There are also critical dates (they they look like !!(ISO_additional_date) or !!(ISO_date_reminder)
// TODO They are used to highlight the main date in the file that should be shown in cases when only one date can be shown
// TODO f(for example, on Kanban board cards)
// @example !!2022-09-25--00***--2022-10-25 - Appear daily at midnight since Sep 25, 2022 till Oct 25, 2022

// TODO: "+++++ h1", "++++ h2", "+++ h3", "++ h4", "+ h5", "**strong**", "_em_", "`code`", "~~s~~", "---", ":emoji:", "text1 // text2" (<details><summary>{text1}</summary><div>{text2}</div><details />)
// TODO: MAYBE: wrap content in braces that shows on hover? This option can be disabled in options
