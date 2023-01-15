
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../App/store'


interface ServiceState {
    state: string,
}

const serviceStateValue = {
    initial: "INITIAL",
    loading: "LOADING",
    success: "SUCCESS",
    failed: "FAILED"
}


const initialState: ServiceState = {
    state: serviceStateValue.initial
}

export const serviceState = createSlice({
    name: 'serviceState',
    initialState,
    reducers: {
        loadingState: prevState => {
            prevState.state = serviceStateValue.loading
        },
        successState: prevState => {
            prevState.state = serviceStateValue.success
        },
        failedState: prevState => {
            prevState.state = serviceStateValue.failed
        }
    }
})

export const { loadingState,
    successState,
    failedState } = serviceState.actions

export const service = (state: RootState) => state.ServiceState

export default serviceState.reducer