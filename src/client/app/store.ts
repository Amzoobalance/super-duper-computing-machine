import type { Nullable } from "@core/types"
import type { LocalSettings, OrdoFolder, UserSettings } from "@core/app/types"

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

export type AppState = {
  userSettings: UserSettings
  localSettings: LocalSettings
  personalDirectory: Nullable<OrdoFolder>
}

const initialState: AppState = {
  userSettings: {} as UserSettings,
  localSettings: {} as LocalSettings,
  personalDirectory: null,
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
  },
})

export const { setUserSetting, setLocalSetting } = appSlice.actions

export default appSlice.reducer
