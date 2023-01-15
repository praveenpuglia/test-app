import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../App/store'


interface Genres {
    id: number;
    name: number;
}

interface GenresState {
    genresList: Genres[]
    genresState: boolean
    moviesList: any[]
    movieDetails: any
}


const initialState: GenresState = {
    genresList: [],
    genresState: false,
    moviesList: [],
    movieDetails : {}
}
export const dataState = createSlice({
    name: 'dataState',
    initialState,
    reducers: {
        setGenresData: (prevState, action: any) => {
            prevState.genresList = action.payload.genres;
            prevState.genresState = true
        },
        setMoviesData: (prevState, action: any) => {
            return { ...prevState, moviesList: action.payload.results }
        },
        setMovieDetails: (prevState, action: any) => {
            return { ...prevState, movieDetails: action.payload }
        },
    }
})

export const { setGenresData, setMoviesData,setMovieDetails } = dataState.actions
export const data = (state: RootState) => state.Data
export default dataState.reducer