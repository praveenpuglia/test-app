import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiMoon, FiSearch, FiX, FiSun } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";

import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { changeTheme, changeMenu } from "../../features/state"
import "./Navbar.css";
import { Button, SearchContainer, MiniSearchContainer, MoviesListSearchContainer, MiniMoviesListSearchContainer } from "./styled.js"

import brandLetterLight from "../../images/logow.png";
import brandLetterDark from "../../images/logod.png";
import { searchMovies } from "../../Services/Movies/MoviesService";

interface Props {
  isClose: boolean,
  isDark: boolean
}

function Navbar() {
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchStatus, setSearchStatus] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const fetchSearchMovies = async (data: string) => {
    const { status, responseData } = await searchMovies(data);
    if (status === 200) {
      setSearchStatus(status)
      setSearchList(responseData.moviesList)
    } else if (status === 202) {
      setSearchStatus(status)
    }
  }

  const handleSearch = (e: any) => {
    if (e.target.value.length === 0) {
      setSearch(e.target.value)
      setSearchList([])
    } else {
      setSearch(e.target.value)
      fetchSearchMovies(e.target.value)
    }
  }

  const handleSearchNavigation = (id: string) => {
    navigate(`/movie/${id}`)
    setSearch("")
  }


  return (
    <header
      className="navbarHeaderContainer"
      style={{ backgroundColor: ThemeMenu.theme ? "#212946" : "#FFFFFF" }}
    >
      {showSearchContainer ? (
        <MiniSearchContainer isDark={ThemeMenu.theme}>
          <FiSearch className="navbarSearchIcon" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="navbarMiniSearchInput"
            style={{
              color: ThemeMenu.theme ? "#bdc8f0" : "#212121",
            }}
          />
          <div className="navbarSearchMiniActionsContainer">
            <Button isDark={ThemeMenu.theme} isClose={false}>
              <VscSettings className="navbarFilterIcon" />
            </Button>
            <Button
              isDark={ThemeMenu.theme}
              isClose={true}
              onClick={() => (setShowSearchContainer(false), setSearch(""))}
            >
              <FiX className="navbarHamIcon" />
            </Button>
          </div>
          {search.length > 0 ?
            <MiniMoviesListSearchContainer isDark={ThemeMenu.theme}>
              {searchStatus === 202 ? <p className="eachSearchMovieTitle">No movies found</p> : null}
              {searchStatus === 200 ? searchList.map((eachSearch: any) =>
                <div key={eachSearch._id} className="eachSearchContainer" onClick={() => (handleSearchNavigation(eachSearch._id), setShowSearchContainer(false))}>
                  <img src={eachSearch.poster} alt="movie-poster" className="eachSearchMovieImage" />
                  <p className="eachSearchMovieTitle">{eachSearch.title}</p>
                </div>
              ) : null}
            </MiniMoviesListSearchContainer> : null}
        </MiniSearchContainer>
      ) : (
        <>
          <div className="navbarSearchContainer">
            <div className="navbarLogoContainer">
              <Link to="/">
                <img
                  src={ThemeMenu.theme ? brandLetterDark : brandLetterLight}
                  alt="brand-letter"
                  width={100}
                  className="brandLetterImage"
                />
              </Link>
              <Button isDark={ThemeMenu.theme} isClose={false} onClick={() => { dispatch(changeMenu()) }}>
                <FiMenu className="navbarHamIcon" />
              </Button>
            </div>
            <div className="navbarMiniActionsContainer">
              <Button isDark={ThemeMenu.theme} isClose={false} onClick={() => { dispatch(changeMenu()) }}>
                <FiMenu className="navbarHamIcon" />
              </Button>
              <Button
                isClose={false}
                isDark={ThemeMenu.theme}
                onClick={() => setShowSearchContainer(true)}
              >
                <FiSearch className="navbarHamIcon" />
              </Button>
            </div>
            <SearchContainer isDark={ThemeMenu.theme}>
              <FiSearch className="navbarSearchIcon" />
              <input
                type="text"
                placeholder="Search"
                className="navbarSearchInput"
                onChange={handleSearch}
                value={search}
                style={{
                  color: ThemeMenu.theme ? "#bdc8f0" : "#212121",
                }}

              />
              <Button isDark={ThemeMenu.theme} isClose={false}>
                <VscSettings className="navbarFilterIcon" />
              </Button>
              {search.length > 0 ?
                <MoviesListSearchContainer isDark={ThemeMenu.theme}>
                  {searchStatus === 202 ? <p>No movies found</p> : null}
                  {searchStatus === 200 ? searchList.map((eachSearch: any) =>
                    <div key={eachSearch._id} className="eachSearchContainer" onClick={() => handleSearchNavigation(eachSearch._id)}>
                      <img src={eachSearch.poster} alt="movie-poster" className="eachSearchMovieImage" />
                      <p className="eachSearchMovieTitle">{eachSearch.title}</p>
                    </div>
                  ) : null}
                </MoviesListSearchContainer> : null}
            </SearchContainer>
          </div>
          <Button isDark={ThemeMenu.theme} onClick={() => { dispatch(changeTheme()) }} isClose={false}>
            {ThemeMenu.theme ? <FiSun className="navbarHamIcon" /> : <FiMoon className="navbarHamIcon" />}
          </Button>
        </>
      )}
    </header>
  );
}

export default Navbar;
