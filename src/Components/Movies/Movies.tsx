import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { BsStarFill } from "react-icons/bs";

import "./Movies.css";
import { useAppSelector } from "../../App/hooks";
import { fetchMovieGenres, fetchMovies } from "../../Api/TMDB/tmdbService";

enum apiStatus {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

function Movies() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const [page, setPage] = useState(Number(search.split("=")[1]));
  const [moviesList, setMoviesList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [moviesState, setMoviesState] = useState(apiStatus.INITIAL);

  useEffect(() => {
    getGenres()
  }, [search]);

  const getGenres = async () => {
    setMoviesState(apiStatus.LOADING);
    const { data, status } = await fetchMovieGenres();
    if (status === 200) {
      setGenresList(data.genres)
      getMovies();
    } else {
      setMoviesState(apiStatus.FAILED);
    }
  }

  const getMovies = async () => {
    setMoviesState(apiStatus.LOADING);
    const { status, data } = await fetchMovies(Number(search.split("=")[1]))
    if (status === 200) {
      setMoviesList(data.results);
      setMoviesState(apiStatus.SUCCESS);
    } else {
      setMoviesState(apiStatus.FAILED);
    }
  };

  const handlePagination = (e: any, value: number) => {
    navigate(`/movies?page=${value}`);
    setPage(value);
    fetchMovies(value);
  };

  const navigateToMovie = (id: number) => {
    navigate(`/movie/${id}`)
  }

  const MoviesContainer = () => {
    switch (moviesState) {
      case apiStatus.INITIAL:
        return null;
      case apiStatus.LOADING:
        return (
          <div className="dashBoardLoaderContainer">
            <CircularProgress />
          </div>
        );
      case apiStatus.SUCCESS:
        return (
          <>
            <div className="allMoviesCard">
              {moviesList.map((eachMovie: any) => (
                <div
                  key={eachMovie.id}
                  className={ThemeMenu.theme ? "eachMovieCard darkEachMovieCard" : "eachMovieCard lightEachMovieCard"}
                  onClick={() => navigateToMovie(eachMovie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${eachMovie.backdrop_path}`}
                    alt="movie-poster"
                    className="eachMovieTitleCardPoster"
                  />
                  <p className="eachMovieTitleCardPara">{eachMovie.title}</p>
                  <p className="eachMovieYearCardPara">{eachMovie.release_date.split("-")[0]}</p>
                  <div className="eachMovieHoverContainer">
                    <BsStarFill className="eachMovieCardStarIcon" />
                    <p className="eachMovieCardRatingPara">
                      {eachMovie.vote_average}
                    </p>
                    <div className="eachMovieCardGenreContainer">
                      {eachMovie.genre_ids.map((eachId: any) =>
                        genresList.map((eachGenre: any) => (eachId === eachGenre.id ?
                          <p className="eachMovieCardGenrePara" key={eachId}>{eachGenre.name}</p> : null)
                        )
                      )}
                    </div>
                    <button className={ThemeMenu.theme ? "eachMovieCardDetailsButton darkEachMovieCardDetailsButton" : "eachMovieCardDetailsButton lightEachMovieCardDetailsButton"}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              count={500}
              color={ThemeMenu.theme ? "primary" : "secondary"}
              page={page}
              onChange={handlePagination}
              className="moviesPagination"
            />
          </>
        );
      case apiStatus.FAILED:
        return <p>ERROR</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      <MoviesContainer />
    </div>
  );
}

export default Movies;
