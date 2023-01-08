const serverUrl = "http://18.60.129.53/";

export const getMovies = async (value: number) => {
    const options = {
        method: "GET",
    };
    const url = `${serverUrl}allmovies?limit=${value}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, data: responseData.data };
};

export const getSingleMovie = async (id: String | undefined) => {
    const options = {
        method: "GET",
    };
    const url = `${serverUrl}movie/${id}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, data: responseData.data };
};

export const searchMovies = async (data: string) => {
    const options = {
        method: "GET",
    };
    const url = `${serverUrl}searchmovies?search=${data}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}

export const getMovieComments = async (id: String | undefined) => {
    const options = {
        method: "GET",
    };
    const url = `${serverUrl}comments/${id}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}

export const getSimilarMovies = async (data: string) => {
    const options = {
        method: "GET",
    };
    const url = `${serverUrl}similarmovies?${data}`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return { status: response.status, responseData: responseData.data };
}