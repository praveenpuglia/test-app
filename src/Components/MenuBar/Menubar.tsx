import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { closeMenu } from "../../features/state";
import "./menubar.css";
import MenuIcons from "./MenuIcons";
import { LinkPara, SelectedLinkPara } from "./styled";

function Menubar() {
  const location = useLocation();
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const dispatch = useAppDispatch()

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Movies", path: "/movies?page=1" },
    { name: "Saved", path: "/saved" },
  ];

  return (
    <div className="menuBarLinksContainer">

      {menuItems.map((eachMenu) => (
        <Link to={eachMenu.path} key={eachMenu.name} className="menuLinks" onClick={() => { dispatch(closeMenu()) }}>
          {eachMenu.path.split("?")[0] === location.pathname.split("?")[0] ? (
            <LinkPara isDark={ThemeMenu.theme}>
              <MenuIcons name={eachMenu.name} /> {eachMenu.name}
            </LinkPara>
          ) : (
            <SelectedLinkPara isDark={ThemeMenu.theme}>
              <MenuIcons name={eachMenu.name} /> {eachMenu.name}
            </SelectedLinkPara>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Menubar;
