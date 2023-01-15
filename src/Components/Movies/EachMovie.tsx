import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchMovieDetails } from "../../Services/TMDB/tmdbService";

import MovieDetails from "./MovieDetails";
import { useAppSelector } from "../../App/hooks";
import ErrorPage from "../Error Page/ErrorPage";

const serviceStateValue = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failed: "FAILED"
}


function EachMovie() {
  const { id } = useParams();
  const ServiceState = useAppSelector(state => state.ServiceState);

  useEffect(() => {
    fetchMovieDetails(Number(id))
  }, [id]);

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
        return <MovieDetails />
      case serviceStateValue.failed:
        return <ErrorPage retryPage={() => fetchMovieDetails(Number(id))} />;
      default:
        return null;
    }
  };

  return <MoviesContainer />;
}

export default EachMovie;
