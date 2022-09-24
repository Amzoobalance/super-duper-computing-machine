import type { Nullable } from "@core/types"
import type { LocalSettings, OrdoFile, OrdoFolder, UserSettings } from "@core/app/types"

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

export type AppState = {
  userSettings: UserSettings
  localSettings: LocalSettings
  personalDirectory: Nullable<OrdoFolder>
  currentFileRaw: string
  currentFile: Nullable<OrdoFile>
}

const initialState: AppState = {
  userSettings: {} as UserSettings,
  localSettings: {} as LocalSettings,
  personalDirectory: null,
  currentFileRaw: "",
  currentFile: null,
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
  },
})

export const { setUserSetting, setLocalSetting } = appSlice.actions

export default appSlice.reducer
