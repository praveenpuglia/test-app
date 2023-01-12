import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { BsStarFill } from "react-icons/bs";


import { getMovies } from "../../Api/Movies/MoviesApi";
import "./Movies.css";
import { useAppSelector } from "../../App/hooks";
import { posterMoviesCount } from "../../Api/Dashboard/DashboardApi";

function Movies() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const [page, setPage] = useState(Number(search.split("=")[1]));
  const [moviesList, setMoviesList] = useState([]);
  const [moviesState, setMoviesState] = useState("INITIAL");
  const [posterCount, setPosterCount] = useState(100);

  useEffect(() => {
    fetchPosterCount();
    setPage(Number(search.split("=")[1]));
    fetchMovies(Number(search.split("=")[1]));
  }, []);

  const fetchPosterCount = async () => {
    const { status, data } = await posterMoviesCount();
    if (status === 200) {
      setPosterCount(data.count);
    }
  }

  const fetchMovies = async (limit: number) => {
    setMoviesState("LOADING");
    const { status, data } = await getMovies(limit);
    if (status === 200) {
      setMoviesList(data.moviesList);
      setMoviesState("SUCCESS");
    } else {
      setMoviesState("FAILED");
    }
  };

  const handlePagination = (e: any, value: number) => {
    navigate(`/movies?page=${value}`);
    setPage(value);
    fetchMovies(value);
  };

  const MoviesContainer = () => {
    switch (moviesState) {
      case "INITIAL":
        return null;
      case "LOADING":
        return (
          <div className="dashBoardLoaderContainer">
            <CircularProgress />
          </div>
        );
      case "SUCCESS":
        return (
          <>
            <div className="allMoviesCard">
              {moviesList.map((eachMovie:any) => (
                <div
                  key={eachMovie._id}
                  className={ThemeMenu.theme ? "eachMovieCard darkEachMovieCard" : "eachMovieCard lightEachMovieCard"}
                  onClick={() => navigate(`/movie/${eachMovie._id}`)}
                >
                  <img
                    src={eachMovie.poster}
                    alt="movie-poster"
                    className="eachMovieTitleCardPoster"
                  />
                  <p className="eachMovieTitleCardPara">{eachMovie.title}</p>
                  <p className="eachMovieYearCardPara">{eachMovie.year}</p>
                  <div className="eachMovieHoverContainer">
                    <BsStarFill className="eachMovieCardStarIcon" />
                    <p className="eachMovieCardRatingPara">
                      {eachMovie.imdb.rating} / 10
                    </p>
                    {eachMovie.genres !== undefined ? (
                      <div className="eachMovieCardGenreContainer">
                        {eachMovie.genres.map((eachGenre:any) => (
                          <p className="eachMovieCardGenrePara" key={eachGenre}>
                            {eachGenre}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    <button className={ThemeMenu.theme ? "eachMovieCardDetailsButton darkEachMovieCardDetailsButton" : "eachMovieCardDetailsButton lightEachMovieCardDetailsButton"}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              count={Math.ceil(posterCount / 100)}
              color={ThemeMenu.theme ? "primary" : "secondary"}
              page={page}
              onChange={handlePagination}
              className="moviesPagination"
            />
          </>
        );
      case "FAILED":
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
