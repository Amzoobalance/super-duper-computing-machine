import type { Nullable } from "@core/types"
import type { LocalSettings, OrdoFile, OrdoFolder, UserSettings } from "@core/app/types"

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

export type AppState = {
  userSettings: UserSettings
  localSettings: LocalSettings
  personalDirectory: Nullable<OrdoFolder>
  currentFileRaw: string
  currentFile: Nullable<OrdoFile>
  isSavingFile: boolean
}

const initialState: AppState = {
  userSettings: {} as UserSettings,
  localSettings: {} as LocalSettings,
  personalDirectory: null,
  currentFileRaw: "",
  currentFile: null,
  isSavingFile: false,
}

export const getUserSettings = createAsyncThunk("@app/getUserSettings", async () =>
  window.ordo.emit<UserSettings>({ type: "@app/getUserSettings" })
)

export const getLocalSettings = createAsyncThunk("@app/getLocalSettings", () =>
  window.ordo.emit<LocalSettings>({ type: "@app/getLocalSettings" })
)

export const selectPersonalProjectDirectory = createAsyncThunk(
  "@app/selectPersonalProjectDirectory",
  () => window.ordo.emit<string>({ type: "@app/selectPersonalProjectDirectory" })
)

export const listFolder = createAsyncThunk("@app/listFolder", (payload: string) =>
  window.ordo.emit<OrdoFolder, string>({ type: "@app/listFolder", payload })
)

export const openFile = createAsyncThunk("@app/openFile", (payload: OrdoFile) =>
  window.ordo.emit<{ file: OrdoFile; raw: string }, OrdoFile>({ type: "@app/openFile", payload })
)

export const createFile = createAsyncThunk("@app/createFile", (payload: string) =>
  window.ordo.emit<OrdoFolder, string>({ type: "@app/createFile", payload })
)

export const createFolder = createAsyncThunk("@app/createFolder", (payload: string) =>
  window.ordo.emit<OrdoFolder, string>({ type: "@app/createFolder", payload })
)

export const deleteFileOrFolder = createAsyncThunk("@app/delete", (payload: string) =>
  window.ordo.emit<OrdoFolder, string>({ type: "@app/delete", payload })
)

type TRenameParams = { oldPath: string; newPath: string }

export const renameFileOrFolder = createAsyncThunk("@app/rename", (payload: TRenameParams) =>
  window.ordo.emit<OrdoFolder, TRenameParams>({ type: "@app/rename", payload })
)

type TSaveFileParams = { path: string; content: string }

export const saveFile = createAsyncThunk("@app/saveFile", (payload: TSaveFileParams) =>
  window.ordo.emit<void, TSaveFileParams>({ type: "@app/saveFile", payload })
)

export const appSlice = createSlice({
  name: "@app",
  initialState,
  reducers: {
    setUserSetting: <Key extends keyof UserSettings>(
      state: AppState,
      action: PayloadAction<[Key, UserSettings[Key]]>
    ) => {
      const [key, value] = action.payload
      state.userSettings[key] = value

      window.ordo.emit(action)
    },
    setLocalSetting: <Key extends keyof LocalSettings>(
      state: AppState,
      action: PayloadAction<[Key, LocalSettings[Key]]>
    ) => {
      const [key, value] = action.payload
      state.localSettings[key] = value

      window.ordo.emit(action)
    },
    updateFile: (state: AppState, action: PayloadAction<string>) => {
      state.currentFileRaw = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSettings.fulfilled, (state, action) => {
        state.userSettings = action.payload
      })
      .addCase(getLocalSettings.fulfilled, (state, action) => {
        state.localSettings = action.payload
      })
      .addCase(selectPersonalProjectDirectory.fulfilled, (state, action) => {
        state.userSettings["project.personal.directory"] = action.payload
      })
      .addCase(listFolder.fulfilled, (state, action) => {
        state.personalDirectory = action.payload
      })
      .addCase(openFile.fulfilled, (state, action) => {
        state.currentFileRaw = action.payload.raw
        state.currentFile = action.payload.file
      })
      .addCase(deleteFileOrFolder.fulfilled, (state, action) => {
        state.personalDirectory = action.payload
      })
      .addCase(renameFileOrFolder.fulfilled, (state, action) => {
        state.personalDirectory = action.payload
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.personalDirectory = action.payload
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.personalDirectory = action.payload
      })
      .addCase(saveFile.pending, (state) => {
        state.isSavingFile = true
      })
      .addCase(saveFile.fulfilled, (state) => {
        state.isSavingFile = false
      })
  },
})

export const { setUserSetting, setLocalSetting } = appSlice.actions

export default appSlice.reducer
