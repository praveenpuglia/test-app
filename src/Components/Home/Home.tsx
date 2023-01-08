import React from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { closeMenu } from "../../features/state";
import Menubar from "../MenuBar/Menubar";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import brandLetterLight from "../../images/logow.png";
import brandLetterDark from "../../images/logod.png";


function Home() {
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Navbar />
      <div
        className="bodyContainer"
        style={{ backgroundColor: ThemeMenu.theme ? "#111936" : "#FFFFFF" }}
      >
        <div className={ThemeMenu.menu ? "menubarContainer" : "hideMenu"}>
          <Menubar />
        </div>
        <div
          className="dashBoardContainer"
          style={{
            marginLeft: !ThemeMenu.menu ? "20px" : window.screen.width < 890 ? "20px" : "0px",
            backgroundColor: ThemeMenu.theme ? "#1a223f" : "#e3f2fd",
          }}
          onClick={() => dispatch(closeMenu())}
        >
          <Outlet />
        </div>
      </div>
      <div
        className={!ThemeMenu.menu ? "miniMenubarContainer" : "hideMiniMenu"}
        style={{ backgroundColor: ThemeMenu.theme ? "#111936" : "#FFFFFF" }}
      >
        <img
          src={ThemeMenu.theme ? brandLetterDark : brandLetterLight}
          alt="brand-letter"
          width={100}
          className="miniMenuBrandLetterImage"
        />
        <Menubar />
      </div>
    </div>
  );
}

export default Home;
