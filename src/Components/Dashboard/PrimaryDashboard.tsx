import React, { useState } from "react";

import { MdOutlineMoney, MdOutlineMovieFilter } from "react-icons/md";
import { BiDollar, BiData } from "react-icons/bi";
import { FiAward } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

import {
  AwardsContainer,
  BoxOfficeContainer,
  TotalAwardsContainer,
  MoviesContainer,
  OscarsContainer,
  MiniAwardsContainer,
} from "./styledComponents";
import { useAppSelector } from "../../App/hooks";


function PrimaryDashboard(props: any) {
  const [amount, setAmount] = useState("MILLION")
  const { primaryDashboardDetails } = props;
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);

  return (
    <>
      <div className="dashboardPrimaryContainer">
        <MoviesContainer>
          <p
            className="primaryDashBoardMoviesIcons"
            style={{ backgroundColor: "#4527a0" }}
          >
            <MdOutlineMovieFilter
              style={{ fontSize: "25px", strokeWidth: 0.2 }}
            />
          </p>
          <p className="dashBoardPrimaryHeading">
            <BiData
              style={{ fontSize: "30px", strokeWidth: 0.2, marginRight: 3 }}
            />
            {primaryDashboardDetails.totalMovies}
          </p>
          <p className="dashBoardPrimaryPara">Total Movies</p>
        </MoviesContainer>
        <BoxOfficeContainer>
          <div className="boxOfficeButtonsMainContainer">
            <p
              className="primaryDashBoardMoviesIcons"
              style={{ backgroundColor: "#1565c0" }}
            >
              <MdOutlineMoney style={{ fontSize: "25px" }} />
            </p>
            <div>
              <button
                className={
                  amount === "MILLION"
                    ? "selectedBoxOfficeButton"
                    : "boxOfficeButton"
                }
                onClick={() => setAmount("MILLION")}
              >
                Millions
              </button>
              <button
                className={
                  amount === "THOUSAND"
                    ? "selectedBoxOfficeButton"
                    : "boxOfficeButton"
                }
                onClick={() => setAmount("THOUSAND")}
              >
                Thousands
              </button>
            </div>
          </div>
          <p className="dashBoardPrimaryHeading">
            <BiDollar
              style={{ fontSize: "25px", strokeWidth: 0.8, marginRight: 3 }}
            />
            {amount === "MILLION"
              ? primaryDashboardDetails.totalCollectionsData
                .totalCollectionInMillion
              : primaryDashboardDetails.totalCollectionsData
                .totalCollectionInThousands}
          </p>
          <p className="dashBoardPrimaryPara">BoxOffice Collections</p>
        </BoxOfficeContainer>
        <AwardsContainer>
          <OscarsContainer>
            <p
              className="primaryDashBoardMoviesIcons"
              style={{ backgroundColor: "#1565c0", margin: "10px" }}
            >
              <FiAward style={{ fontSize: "22px", strokeWidth: 2.3 }} />
            </p>
            <div className="primaryDashBoardMiniContainer">
              <p className="primaryDashBoardMiniMainPara">
                <AiOutlineNumber
                  style={{ fontSize: "18px", strokeWidth: 5, marginRight: 4 }}
                />
                {primaryDashboardDetails.totalAwardsData.totalOscars}
              </p>
              <p className="primaryDashBoardMiniMiniPara">Total Oscars</p>
            </div>
          </OscarsContainer>
          <TotalAwardsContainer isDark={ThemeMenu.theme}>
            <p
              className="primaryDashBoardMoviesIcons"
              style={{ backgroundColor: "#fff8e1", margin: "10px" }}
            >
              <FiAward
                style={{ fontSize: "22px", strokeWidth: 2.7, color: "#ffc107" }}
              />
            </p>
            <div className="primaryDashBoardMiniContainer">
              <p className="primaryDashBoardMiniMainPara">
                <AiOutlineNumber
                  style={{ fontSize: "18px", strokeWidth: 5, marginRight: 4 }}
                />
                {primaryDashboardDetails.totalAwardsData.totalAwards}
              </p>
              <p className="primaryDashBoardMiniMiniPara">Total Awards</p>
            </div>
          </TotalAwardsContainer>
        </AwardsContainer>
      </div>
      <MiniAwardsContainer>
        <OscarsContainer>
          <p
            className="primaryDashBoardMoviesIcons"
            style={{ backgroundColor: "#1565c0", margin: "10px" }}
          >
            <FiAward style={{ fontSize: "22px", strokeWidth: 2.3 }} />
          </p>
          <div className="primaryDashBoardMiniContainer">
            <p className="primaryDashBoardMiniMainPara">
              <AiOutlineNumber
                style={{ fontSize: "18px", strokeWidth: 5, marginRight: 4 }}
              />
              {primaryDashboardDetails.totalAwardsData.totalOscars}
            </p>
            <p className="primaryDashBoardMiniMiniPara">Total Oscars</p>
          </div>
        </OscarsContainer>
        <TotalAwardsContainer isDark={ThemeMenu.theme}>
          <p
            className="primaryDashBoardMoviesIcons"
            style={{ backgroundColor: "#fff8e1", margin: "10px" }}
          >
            <FiAward
              style={{ fontSize: "22px", strokeWidth: 2.7, color: "#ffc107" }}
            />
          </p>
          <div className="primaryDashBoardMiniContainer">
            <p className="primaryDashBoardMiniMainPara">
              <AiOutlineNumber
                style={{ fontSize: "18px", strokeWidth: 5, marginRight: 4 }}
              />
              {primaryDashboardDetails.totalAwardsData.totalAwards}
            </p>
            <p className="primaryDashBoardMiniMiniPara">Total Awards</p>
          </div>
        </TotalAwardsContainer>
      </MiniAwardsContainer>
    </>
  );
}

export default PrimaryDashboard;
