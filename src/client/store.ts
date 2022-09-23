import { configureStore } from "@reduxjs/toolkit"

import app from "@client/app/store"
import activityBar from "@client/activity-bar/store"

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    app,
    activityBar,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
