import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { BsStarFill } from "react-icons/bs";


import "./Movies.css";
import { useAppSelector } from "../../App/hooks";
import { fetchMovieDetails, fetchMovieGenres, fetchMovies } from "../../Services/TMDB/tmdbService";
import ErrorPage from "../Error Page/ErrorPage";

const serviceStateValue = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failed: "FAILED"
}

function Movies() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const ServiceState = useAppSelector(state => state.ServiceState);
  const Data = useAppSelector(state => state.Data);
  const [page, setPage] = useState(Number(search.split("=")[1]));

  useEffect(() => {
    if (Data.genresState === false) {
      fetchMovieGenres();
      fetchMovies(Number(search.split("=")[1]))
    } else {
      fetchMovies(Number(search.split("=")[1]))
    }
  }, [search]);


  const handlePagination = (e: any, value: number) => {
    fetchMovies(value)
    navigate(`/movies?page=${value}`);
    setPage(value);
  };

  const navigateToMovie = (id: number) => {
    fetchMovieDetails(id)
    navigate(`/movie/${id}`)
  }

  const MoviesContainer = () => {
    switch (ServiceState.state) {
      case serviceStateValue.initial:
        return null;
      case serviceStateValue.loading:
        return (
          <div className="dashBoardLoaderContainer">
            <CircularProgress />
          </div>
        );
      case serviceStateValue.success:
        return (
          <>
            <div className="allMoviesCard">
              {Data.moviesList.map((eachMovie: any) => (
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
                        Data.genresList.map((eachGenre: any) => (eachId === eachGenre.id ?
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
      case serviceStateValue.failed:
        return <ErrorPage retryPage={() => fetchMovies(Number(search.split("=")[1]))} />;
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
