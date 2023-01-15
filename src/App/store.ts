import { configureStore } from '@reduxjs/toolkit'
import themeMenuSlice from "../features/state"
import serviceStateSlice from "../features/serviceState"
import dataStateSlice from "../features/dataState"

export const store = configureStore({
    reducer: {
        ThemeMenu: themeMenuSlice,
        ServiceState: serviceStateSlice,
        Data: dataStateSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch