export const getMovies = async (noOfMovies: number) => {
    const options = {
        method: "GET",
    };
    const url = `${import.meta.env.VITE_SERVER_URL}allmovies?limit=${noOfMovies}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, data: responseData.data };
};

export const getSingleMovie = async (id: String | undefined) => {
    const options = {
        method: "GET",
    };
    const url = `${import.meta.env.VITE_SERVER_URL}movie/${id}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, data: responseData.data };
};

export const searchMovies = async (data: string) => {
    const options = {
        method: "GET",
    };
    const url = `${import.meta.env.VITE_SERVER_URL}searchmovies?search=${data}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}

export const getMovieComments = async (id: String | undefined) => {
    const options = {
        method: "GET",
    };
    const url = `${import.meta.env.VITE_SERVER_URL}comments/${id}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}

export const getSimilarMovies = async (data: string) => {
    const options = {
        method: "GET",
    };
    const url = `${import.meta.env.VITE_SERVER_URL}similarmovies?${data}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}