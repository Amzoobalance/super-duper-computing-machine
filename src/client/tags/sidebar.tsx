import { useAppDispatch, useAppSelector } from "@client/state"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getTags, resetHoveredTag, resetSelectedTag, setHoveredTag, setSelectedTag } from "./store"

export default function TagsSidebar() {
  const dispatch = useAppDispatch()
  const tree = useAppSelector((state) => state.app.personalDirectory)
  const selectedTag = useAppSelector((state) => state.tags.selectedTag)
  const tags = useAppSelector((state) => state.tags.tags)
  const { t } = useTranslation()

  const [tagCount, setTagCount] = useState(0)

  useEffect(() => {
    const count = tags.reduce((acc, tag) => acc + tag.files.length, 0)
    setTagCount(count)
  }, [tags])

  useEffect(() => {
    if (tree) dispatch(getTags(tree))
  }, [tree])

  const activeClass =
    "hover:bg-gradient-to-r hover:from-rose-300 hover:dark:from-violet-700 hover:to-purple-300 hover:dark:to-purple-700 bg-gradient-to-r from-rose-300 dark:from-violet-700 to-purple-300 dark:to-purple-700"
  const hasNoSelectedTag = selectedTag === ""

  return (
    <div>
      <div
        onMouseEnter={() => dispatch(resetHoveredTag())}
        onClick={() => dispatch(resetSelectedTag())}
        className={`flex items-center justify-between text-sm px-4 py-1 hover-passive rounded-md cursor-pointer ${
          hasNoSelectedTag && activeClass
        }`}
      >
        <div className="truncate shrink-0">{t("tags.all-tags")}</div>
        <div className="shrink-0 text-xs font-bold font-mono text-neutral-600 dark:text-neutral-400">
          {tagCount}
        </div>
      </div>
      {tags.map((tag) => (
        <div
          key={tag.name}
          onMouseEnter={() => dispatch(setHoveredTag(tag.name))}
          onMouseLeave={() => dispatch(resetHoveredTag())}
          onClick={() => dispatch(setSelectedTag(tag.name))}
          className={`flex items-center justify-between text-sm px-4 py-1 hover-passive rounded-md cursor-pointer ${
            tag.name === selectedTag && activeClass
          }`}
        >
          <div className="truncate shrink-0">{tag.name}</div>
          <div className="shrink-0 text-xs font-bold font-mono text-neutral-500 dark:text-neutral-400">
            {tag.files.length}
          </div>
        </div>
      ))}
    </div>
  )
}
