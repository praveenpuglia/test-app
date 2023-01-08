
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../App/store'

// Define a type for the slice state
interface CounterState {
    theme: boolean,
    menu: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    theme: false,
    menu: true
}

export const themeMenuSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeTheme: state => {
            state.theme = !state.theme
        },
        changeMenu: state => {
            state.menu = !state.menu
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        closeMenu: state => {
            if (window.screen.width < 890) {
                state.menu = true
            }
        }
    }
})

export const { changeTheme, changeMenu, closeMenu } = themeMenuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.ThemeMenu

export default themeMenuSlice.reducer