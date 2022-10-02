import { useAppSelector } from "@client/state"
import React, { useEffect, useMemo, useRef } from "react"
import { Network, Options, Edge, Node } from "vis-network"
import { collectTags } from "./collect-tags"

export default function Tags() {
  const tree = useAppSelector((state) => state.app.personalDirectory)
  const ref = useRef<HTMLDivElement>(null)

  const tags = collectTags(tree)
  const mode =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"

  const data = useMemo(
    () =>
      Object.keys(tags).reduce(
        (acc, key) => {
          const tagNode = acc.nodes.find((node) => node.id === key)

          if (!tagNode) {
            acc.nodes.push({
              id: key,
              label: key,
              size: 15 * tags[key].length,
              borderWidth: 0,
              color: mode === "dark" ? "#6d28d9" : "#d6d3d1",
            })
          }

          for (const file of tags[key]) {
            const fileNode = acc.nodes.find((node) => node.id === file)

            if (!fileNode) {
              acc.nodes.push({
                id: file,
                label: file.slice(0, -4),
                color: mode === "dark" ? "#86198f" : "#cbd5e1",
                borderWidth: 0,
              })
            }

            acc.edges.push({
              from: file,
              to: key,
              length: 150,
            })
          }

          return acc
        },
        { nodes: [] as Node[], edges: [] as Edge[] }
      ),
    [tree, ref.current]
  )

  useEffect(() => {
    if (!ref.current || !tree) return

    const options: Options = {
      manipulation: { enabled: false },
      nodes: { shape: "dot", font: { color: mode === "dark" ? "#ddd" : "#111" } },
      edges: { smooth: { enabled: true, type: "continuous", roundness: 0 } },
      interaction: { hover: true, hideEdgesOnDrag: true, tooltipDelay: 200 },
      physics: true,
    }

    console.log(data)

    const network = new Network(ref.current, data, options)
    network.disableEditMode()
  }, [ref, tree])

  return <div className="cursor-auto h-full w-full" ref={ref}></div>
}
