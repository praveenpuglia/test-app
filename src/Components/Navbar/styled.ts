import styled from "styled-components";

interface DarkClose {
  isClose: boolean,
  isDark: boolean
}

interface Dark {
  isDark: boolean
}


export const Button = styled.button<DarkClose>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isClose
      ? props.isDark
        ? "#29314f"
        : "#fbe9e7"
      : props.isDark
        ? "#29314f"
        : "#ede7f6"};
  border: none;
  border-radius: 7px;
  color: ${(props) =>
    props.isDark
      ? props.isClose
        ? "#d84315"
        : "#7c4dff"
      : props.isClose
        ? "#d84315"
        : "#643cb4"};
  transition: 0.2s;
  &:hover {
    background-color: ${(props) => (props.isClose ? "#d84315" : "#643cb4")};
    color: #ffffff;
    transition: 0.2s;
  }
`;

export const MiniSearchContainer = styled.div<Dark>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 46px;
  border: solid 2px;
  border-radius: 10px;
  border-color: ${(props) => (props.isDark ? "#2d3654" : "#cacaca")};
  background: ${(props) => (props.isDark ? "#1a223f" : "#fafafa")};
  transition: 0.3s;
  &:hover {
    border-color: #616161;
    transition: 0.2s;
  }
  &:focus-within {
    border-color: #1e88e5;
    transition: 0.3s;
    border-width: 2px;
  }
  @media (min-width: 890px) {
    display: none;
  }
`;

export const SearchContainer = styled.div<Dark>`
  display: flex;
  align-items: center;
  width: 450px;
  height: 46px;
  border: solid 2px;
  border-color: ${(props) => (props.isDark ? "#2d3654" : "#cacaca")};
  margin-left: 20px;
  border-radius: 10px;
  background: ${(props) => (props.isDark ? "#1a223f" : "#fafafa")};
  transition: 0.3s;
  &:hover {
    border-color: ${(props) => (props.isDark ? "#bdc8f0" : "#616161")};
    transition: 0.2s;
  }
  &:focus-within {
    border-color: #1e88e5;
    transition: 0.3s;
    border-width: 2px;
  }
  @media (max-width: 890px) {
    display: none;
  }
`;


export const MoviesListSearchContainer = styled.div<Dark>`
  z-index: 100;
  width: 448px;
  position: absolute;
  top: 62px;
  border-radius: 0 0 10px 10px;
  border: solid 2px #1e88e5;
  background-color: ${(props) => (props.isDark ? "#1a223f " : "#e3f2fd")};
  color: ${(props) => (props.isDark ? "#bdc8f0 " : "#212121")}
`

export const MiniMoviesListSearchContainer = styled.div<Dark>`
  z-index: 100;
  position: absolute;
  top: 62px;
  border-radius: 0 0 10px 10px;
  border: solid 2px #1e88e5;
  background-color: ${(props) => (props.isDark ? "#1a223f " : "#e3f2fd")};
  color: ${(props) => (props.isDark ? "#bdc8f0 " : "#212121")};
  @media (width > 375px) {width: 88.5%;}
    @media (768px <= width <= 1024px) {
        width: 94%;
    }
`