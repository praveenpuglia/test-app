const URL = import.meta.env.VITE_TMDB_URL;
const APIKEY = import.meta.env.VITE_TMDB_APIKEY;

const fetchGetRequest = async (url: string) => {
    const options = {
        method: "GET"
    }
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, data: responseData };
}

export const fetchMovieGenres = async () => {
    const url = `${URL}genre/movie/list?api_key=${APIKEY}`;
    let { status, data } = await fetchGetRequest(url)
    return { status, data }
}

export const fetchMovies = async (pageNumber: number) => {
    const url = `${URL}movie/top_rated?api_key=${APIKEY}&page=${pageNumber}`;
    let { status, data } = await fetchGetRequest(url)
    return { status, data }
}

export const fetchMovieDetails = async (movieId: number) => {

    const url = `${URL}movie/${movieId}?api_key=${APIKEY}`;
    let { status, data } = await fetchGetRequest(url);

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

    return { status, data };
}

const fetchMovieTrailer = async (movieId: number) => {
    const url = `${URL}movie/${movieId}/videos?api_key=${APIKEY}`;
    let { status, data } = await fetchGetRequest(url);
    if (status === 200) {
        let trailerData = data.results.filter((eachVideo: any) => eachVideo.type === "Trailer")
        return trailerData[trailerData.length - 1]
    }
}

const fetchMovieCast = async (movieId: number) => {
    const url = `${URL}movie/${movieId}/credits?api_key=${APIKEY}`;
    let { status, data } = await fetchGetRequest(url);
    if (status === 200) {
        let writerData = data.crew.filter((eachCrew: any) => eachCrew.job === "Writer")
        let directorData = data.crew.filter((eachCrew: any) => eachCrew.job === "Director")
        let castData = data.cast.slice(0, 12)
        return { writerData, directorData, castData }
    }
}

export const fetchMovieReviews = async (movieId: number) => {
    const url = `${URL}movie/${movieId}/reviews?api_key=${APIKEY}`;
    let { status, data } = await fetchGetRequest(url)
    return { status, data }
}

export const fetchSimilarMovies = async (movieId: number) => {
    const url = `${URL}movie/${movieId}/similar?api_key=${APIKEY}&page=1`;
    let { status, data } = await fetchGetRequest(url)
    return { status, data }
}