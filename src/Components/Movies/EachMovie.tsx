import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMovie } from "../../Api/Movies/MoviesApi";
import CircularProgress from "@mui/material/CircularProgress";
import MovieDetails from "./MovieDetails";

function EachMovie() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [moviesState, setMoviesState] = useState("INITIAL");

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    setMoviesState("LOADING");
    const { status, data } = await getSingleMovie(id);
    if (status === 200) {
      setMovieData(data.movie);
      setMoviesState("SUCCESS");
    } else {
      setMoviesState("FAILED");
    }
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
        return <MovieDetails data={movieData} />;
      case "FAILED":
        return <p>ERROR</p>;
      default:
        return null;
    }
  };

  return <MoviesContainer />;
}

export default EachMovie;
