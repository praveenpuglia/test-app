import React from "react";
import { BsCalendarDate, BsStarFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import Chart from "react-apexcharts";

import {
  ChartContainer,
  ImdbContainer,
  ImdbHeaderContainer,
} from "./styledComponents";
import imdb from "../../images/imdb.png";
import tomato from "../../images/tomato.png";
import tomatometer from "../../images/tomatometer.png";
import usermeter from "../../images/usermeter.png";
import { useAppSelector } from "../../App/hooks";

const SecondaryDashboard = (props:any) => {
  const { secondaryDashboardDetails } = props;
  const ThemeMenu = useAppSelector((state) => state.ThemeMenu)
  
  const series = [
    {
      data: secondaryDashboardDetails.count,
    },
  ];
  const options = {
    chart: {
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        },
      },
      height: 350,
      type: "bar",
      events: {
        click: function (chart:any, w:any, e:any) {
          console.log(chart, w, e);
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "55px",
        distributed: true,
      },
    },
    colors: [
      "#5E35B1",
      "#1565C0",
      "#69F0AE",
      "#D84315",
      "#F44336",
      "#FFC107",
      "#212121",
      "#90CAF9",
    ],
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: secondaryDashboardDetails.genre,
      labels: {
        style: {
          colors: [
            "#5E35B1",
            "#1565C0",
            "#69F0AE",
            "#D84315",
            "#F44336",
            "#FFC107",
            "#212121",
            "#90CAF9",
            "#5E35B1",
            "#1565C0",
            "#69F0AE",
            "#D84315",
            "#F44336",
            "#FFC107",
            "#212121",
            "#90CAF9",
            "#5E35B1",
            "#1565C0",
            "#69F0AE",
            "#D84315",
            "#F44336",
            "#FFC107",
            "#212121",
            "#90CAF9",
            "#5E35B1",
          ],
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#78909C",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  return (
    <div className="secondaryDashboardContainer">
      <ChartContainer isDark={ThemeMenu.theme}>
        <p
          className="secondaryDashboardHeading"
          style={{ color: ThemeMenu.theme ? "#1e88e5" : "#5e35b1" }}
        >
          Movie Genres
        </p>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={450}
          width={2000}
        />
      </ChartContainer>
      <div className="secondaryDashBoardRatingContainer">
        <ImdbContainer color="#ffc107">
          <ImdbHeaderContainer height="80px">
            <p className="imdbHeaderPara">Top IMDB Movies</p>
            <img
              src={imdb}
              alt="imdb-logo"
              width={100}
              height={80}
              style={{ borderRadius: "10px" }}
            />
          </ImdbHeaderContainer>
          <div className="imdbMoviesDetailsContainer">
            {secondaryDashboardDetails.topImdbMovies.map((eachMovie:any) => (
              <div
                className="imdbEachMovieDetailsContainer"
                key={eachMovie._id}
              >
                <img
                  src={eachMovie.poster}
                  alt="movie-poster"
                  className="imdbEachMoviePoster"
                />
                <div className="imdbEachMovieDetailsTitleContainer">
                  <p className="imdbEachMovieTitle">{eachMovie.title}</p>
                  <div className="imdbEachMovieDetailsSubContainer">
                    <div className="imdbEachMovieIconsContainer">
                      <BsCalendarDate
                        className="imdbEachMovieIcon"
                        style={{
                          color: "#212121",
                          fontSize: "22px",
                          strokeWidth: 0.2,
                        }}
                      />
                      <p className="imdbEachMoviePara">{eachMovie.year}</p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <BsStarFill
                        className="imdbEachMovieIcon"
                        style={{ color: "#ffd700", fontSize: "24px" }}
                      />
                      <p className="imdbEachMoviePara">{eachMovie.rating}</p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <MdSupervisorAccount
                        className="imdbEachMovieIcon"
                        style={{ color: "#212121", fontSize: "24px" }}
                      />
                      <p className="imdbEachMoviePara">{eachMovie.votes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ImdbContainer>
        <ImdbContainer color="#fa320a">
          <ImdbHeaderContainer height="100px">
            <p className="imdbHeaderPara">Top Rotten Tomatoes Movies</p>
            <img
              src={tomato}
              alt="imdb-logo"
              width={130}
              height={55}
              style={{ borderRadius: "10px" }}
            />
          </ImdbHeaderContainer>
          <div
            className="imdbMoviesDetailsContainer"
            style={{ height: "690px", backgroundColor: "#FFAB91" }}
          >
            {secondaryDashboardDetails.topTomatoMovies.map((eachMovie:any) => (
              <div key={eachMovie._id}>
                <div className="eachTomatoMovieContainer">
                  <img
                    src={eachMovie.poster}
                    alt="movie-poster"
                    className="tomatoPoster"
                    style={{ borderRadius: "10px" }}
                  />
                  <div className="eachTomatoMovieSubContainer">
                    <p className="tomatoEachMovieTitle">{eachMovie.title}</p>
                    <p className="tomatoEachMovieYear">{eachMovie.year}</p>
                    <p className="eachMovieSubHeading">TomatoMeter</p>
                    <div className="tomatoCriticsContainer">
                      <div className="imdbEachMovieIconsContainer">
                        <BsSpeedometer2
                          className="imdbEachMovieIcon"
                          style={{
                            color: "#212121",
                            fontSize: "24px",
                            strokeWidth: 0.2,
                          }}
                        />
                        <p className="imdbEachMoviePara">
                          {eachMovie.criticsMeter}
                        </p>
                      </div>
                      <div className="imdbEachMovieIconsContainer">
                        <img
                          src={tomatometer}
                          alt="tomatoMeter-logo"
                          width={33}
                        />
                        <p className="imdbEachMoviePara">
                          {eachMovie.criticsRating}
                        </p>
                      </div>
                      <div className="imdbEachMovieIconsContainer">
                        <MdSupervisorAccount
                          className="imdbEachMovieIcon"
                          style={{ color: "#212121", fontSize: "24px" }}
                        />
                        <p className="imdbEachMoviePara">
                          {eachMovie.criticsReviews}
                        </p>
                      </div>
                    </div>
                    <p className="eachMovieSubHeading">Audience Score</p>
                    <div className="tomatoCriticsContainer">
                      <div className="imdbEachMovieIconsContainer">
                        <BsSpeedometer2
                          className="imdbEachMovieIcon"
                          style={{
                            color: "#212121",
                            fontSize: "24px",
                            strokeWidth: 0.2,
                          }}
                        />
                        <p className="imdbEachMoviePara">
                          {eachMovie.viewerMeter}
                        </p>
                      </div>
                      <div className="imdbEachMovieIconsContainer">
                        <img src={usermeter} alt="userMeter-logo" width={35} />
                        <p className="imdbEachMoviePara">
                          {eachMovie.viewerRating}
                        </p>
                      </div>
                      <div className="imdbEachMovieIconsContainer">
                        <MdSupervisorAccount
                          className="imdbEachMovieIcon"
                          style={{ color: "#212121", fontSize: "24px" }}
                        />
                        <p className="imdbEachMoviePara">
                          {eachMovie.viewerReviews}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="eachTomatoMiniMovieContainer"
                  key={eachMovie.title}
                >
                  <div className="eachTomatoMovieMiniSubContainer">
                    <img
                      src={eachMovie.poster}
                      alt="movie-poster"
                      className="tomatoPoster"
                      style={{ borderRadius: "10px" }}
                    />
                    <div className="eachTomatoMovieSubContainer">
                      <p className="tomatoEachMovieTitle">{eachMovie.title}</p>
                      <p className="tomatoEachMovieYear">{eachMovie.year}</p>
                    </div>
                  </div>
                  <p className="eachMovieSubHeading">TomatoMeter</p>
                  <div className="tomatoCriticsContainer">
                    <div className="imdbEachMovieIconsContainer">
                      <BsSpeedometer2
                        className="imdbEachMovieIcon"
                        style={{
                          color: "#212121",
                          fontSize: "24px",
                          strokeWidth: 0.2,
                        }}
                      />
                      <p className="imdbEachMoviePara">
                        {eachMovie.criticsMeter}
                      </p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <img
                        src={tomatometer}
                        alt="tomatoMeter-logo"
                        width={33}
                      />
                      <p className="imdbEachMoviePara">
                        {eachMovie.criticsRating}
                      </p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <MdSupervisorAccount
                        className="imdbEachMovieIcon"
                        style={{ color: "#212121", fontSize: "24px" }}
                      />
                      <p className="imdbEachMoviePara">
                        {eachMovie.criticsReviews}
                      </p>
                    </div>
                  </div>
                  <p className="eachMovieSubHeading">Audience Score</p>
                  <div className="tomatoCriticsContainer">
                    <div className="imdbEachMovieIconsContainer">
                      <BsSpeedometer2
                        className="imdbEachMovieIcon"
                        style={{
                          color: "#212121",
                          fontSize: "24px",
                          strokeWidth: 0.2,
                        }}
                      />
                      <p className="imdbEachMoviePara">
                        {eachMovie.viewerMeter}
                      </p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <img src={usermeter} alt="userMeter-logo" width={35} />
                      <p className="imdbEachMoviePara">
                        {eachMovie.viewerRating}
                      </p>
                    </div>
                    <div className="imdbEachMovieIconsContainer">
                      <MdSupervisorAccount
                        className="imdbEachMovieIcon"
                        style={{ color: "#212121", fontSize: "24px" }}
                      />
                      <p className="imdbEachMoviePara">
                        {eachMovie.viewerReviews}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ImdbContainer>
      </div>
    </div>
  );
};

export default SecondaryDashboard;
