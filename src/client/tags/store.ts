import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrdoFolder } from "@core/app/types"
import { collectTags } from "./collect-tags"
import { TagObject } from "./types"

export type TagsState = {
  tags: TagObject[]
  hoveredTag: string
  selectedTag: string
}

const initialState: TagsState = {
  tags: [],
  hoveredTag: "",
  selectedTag: "",
}

export const tagsSlice = createSlice({
  name: "@activity-bar",
  initialState,
  reducers: {
    getTags: (state: TagsState, action: PayloadAction<OrdoFolder>) => {
      state.tags = collectTags(action.payload)
    },
    setHoveredTag: (state: TagsState, action: PayloadAction<string>) => {
      state.hoveredTag = action.payload
    },
    resetHoveredTag: (state: TagsState) => {
      state.hoveredTag = ""
    },
    setSelectedTag: (state: TagsState, action: PayloadAction<string>) => {
      state.selectedTag = action.payload
    },
    resetSelectedTag: (state: TagsState) => {
      state.selectedTag = ""
    },
  },
})

export const { getTags, setHoveredTag, resetHoveredTag, setSelectedTag, resetSelectedTag } =
  tagsSlice.actions

export default tagsSlice.reducer
