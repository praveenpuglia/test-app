import { store } from "../../App/store";
import { loadingState, successState, failedState } from "../../features/serviceState";
import { setGenresData, setMoviesData, setMovieDetails } from "../../features/dataState";

export const fetchMovieGenres = async () => {
    store.dispatch(loadingState());
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}genre/movie/list?api_key=${import.meta.env.VITE_TMDB_APIKEY}`;
    const response = await fetch(url, options);
    if (response.status === 200) {
        const data = await response.json()
        store.dispatch(setGenresData(data))
        store.dispatch(successState());
    } else {
        store.dispatch(failedState());
    }
}

export const fetchMovies = async (pageNumber: number) => {
    store.dispatch(loadingState());
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/top_rated?api_key=${import.meta.env.VITE_TMDB_APIKEY}&page=${pageNumber}`;

    const response = await fetch(url, options);
    if (response.status === 200) {
        const data = await response.json()
        store.dispatch(setMoviesData(data))
        setTimeout(() => { store.dispatch(successState()) }, 1000)
    } else {
        store.dispatch(failedState());
    }
}

export const fetchMovieDetails = async (movieId: number) => {
    store.dispatch(loadingState());
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_APIKEY}`;
    const response = await fetch(url, options);
    if (response.status === 200) {
        const data = await response.json();
        let trailerVideo = await fetchMovieTrailer(movieId);
        if (trailerVideo !== undefined && trailerVideo !== null) {
            data.trailer = trailerVideo
        }
        let CreditsData = await fetchMovieCast(movieId)
        if (CreditsData?.directorData.length > 0) {
            data.directors = CreditsData?.directorData
        }
        if (CreditsData?.writerData.length > 0) {
            data.writers = CreditsData?.writerData
        }
        if (CreditsData?.castData.length > 0) {
            data.cast = CreditsData?.castData
        }
        store.dispatch(setMovieDetails(data));
        store.dispatch(successState())
    } else {
        store.dispatch(failedState());
    }
}

const fetchMovieTrailer = async (movieId: number) => {
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_APIKEY}`;
    const response = await fetch(url, options);
    if (response.status === 200) {
        const data = await response.json();
        let trailerData = data.results.filter((eachVideo: any) => eachVideo.type === "Trailer")
        return trailerData[trailerData.length - 1]
    }
}

const fetchMovieCast = async (movieId: number) => {
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_APIKEY}`;
    const response = await fetch(url, options);
    if (response.status === 200) {
        const data = await response.json();
        let writerData = data.crew.filter((eachCrew: any) => eachCrew.job === "Writer")
        let directorData = data.crew.filter((eachCrew: any) => eachCrew.job === "Director")
        let castData = data.cast.slice(0, 12)
        return { writerData, directorData, castData }
    }
}

export const fetchMovieReviews = async (movieId: number) => {
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_APIKEY}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return ({ response, data })
}

export const fetchSimilarMovies = async(movieId:number) =>{
    const options = {
        method: "GET"
    }
    const url = `${import.meta.env.VITE_TMDB_URL}movie/${movieId}/similar?api_key=${import.meta.env.VITE_TMDB_APIKEY}&page=1`;
    const response = await fetch(url, options);
    const data = await response.json();
    return ({ response, data })
}