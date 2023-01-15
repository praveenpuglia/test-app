import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./Dashboard.css";
import {
  primaryDashboard,
  secondaryDashboard,
} from "../../Services/Dashboard/DashboardService";
import PrimaryDashboard from "./PrimaryDashboard";
import SecondaryDashboard from "./SecondaryDashboard";
import ComingSoon from "../Comming Soon/ComingSoon";

function Dashboard() {
  const [primaryDashboardDetails, setPrimaryDashboardDetails] = useState({});
  const [secondaryDashboardDetails, setSecondaryDashboardDetails] = useState(
    {}
  );
  const [primaryDetailsState, setPrimaryDetailsState] = useState("INITIAL");
  const [secondaryDetailsState, setSecondaryDetailsState] = useState("INITIAL");

  // useEffect(() => {
  //   fetchPrimaryData();
  // }, []);

  // const fetchPrimaryData = async () => {
  //   setPrimaryDetailsState("LOADING");
  //   const { status, data } = await primaryDashboard();
  //   if (status === 200) {
  //     setPrimaryDashboardDetails(data);

  //     setPrimaryDetailsState("SUCCESS");
  //     fetchSecondaryData();
  //   } else {
  //     setPrimaryDetailsState("FAILED");
  //   }
  // };

  // const fetchSecondaryData = async () => {
  //   setSecondaryDetailsState("LOADING");
  //   const { status, data } = await secondaryDashboard();
  //   if (status === 200) {
  //     let genre: string[] = [];
  //     let count: number[] = [];
  //     // eslint-disable-next-line array-callback-return
  //     data.movieGenres.map((eachGenre: any) => {
  //       genre.push(eachGenre.genre);
  //       count.push(eachGenre.count);
  //     });
  //     setSecondaryDashboardDetails({
  //       genre,
  //       count,
  //       topImdbMovies: data.topImdbMovies,
  //       topTomatoMovies: data.topTomatoMovies,
  //     });
  //     setSecondaryDetailsState("SUCCESS");
  //   } else {
  //     setSecondaryDetailsState("FAILED");
  //   }
  // };

  // const PrimaryContainer = () => {
  //   switch (primaryDetailsState) {
  //     case "INITIAL":
  //       return null;
  //     case "LOADING":
  //       return (
  //         <div className="dashBoardLoaderContainer">
  //           <CircularProgress />
  //         </div>
  //       );
  //     case "SUCCESS":
  //       return (
  //         <PrimaryDashboard primaryDashboardDetails={primaryDashboardDetails} />
  //       );
  //     case "FAILED":
  //       return <p>ERROR</p>;
  //     default:
  //       return null;
  //   }
  // };

  // const SecondaryContainer = () => {
  //   switch (secondaryDetailsState) {
  //     case "INITIAL":
  //       return null;
  //     case "LOADING":
  //       return (
  //         <div className="dashBoardLoaderContainer">
  //           <CircularProgress />
  //         </div>
  //       );
  //     case "SUCCESS":
  //       return (
  //         <SecondaryDashboard
  //           secondaryDashboardDetails={secondaryDashboardDetails}
  //         />
  //       );
  //     case "FAILED":
  //       return <p>ERROR</p>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <ComingSoon componentName={Dashboard} />
    // <div>
    //   <div className="primaryDashboardContainer">
    //     <PrimaryContainer />
    //   </div>
    //   <SecondaryContainer />
    // </div>
  );
}

export default Dashboard;
