import styled from "styled-components";

export const MoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 0 10px;
  background: radial-gradient(
      200px circle at 380px 30px,
      #4527a0 50%,
      transparent 51%
    ),
    radial-gradient(180px circle at 280px 10px, #512ea9 50%, transparent 51%);
  background-color: #5e35b1;
  color: #ffffff;
  height: 190px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: 0.3s;
  }
  @media (600px <= width <= 1200px) {
    width: 50%;
  }
  @media (width > 1200px) {
    width: 33%;
  }
  @media (width <= 600px) {
    width: 100%;
  }
`;

export const BoxOfficeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 0 10px;
  background: radial-gradient(
      200px circle at 380px 30px,
      #1565c0 50%,
      transparent 51%
    ),
    radial-gradient(180px circle at 280px 10px, #1977d3 50%, transparent 51%);
  background-color: #1e88e5;
  color: #ffffff;
  height: 190px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: 0.3s;
  }
  @media (600px <= width <= 1200px) {
    width: 50%;
  }
  @media (width > 1200px) {
    width: 33%;
  }
  @media (width <= 600px) {
    width: 100%;
  }
`;

export const AwardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 190px;
  color: #ffffff;
  @media (600px <= width <= 1200px) {
    display: none;
  }
  @media (width > 1200px) {
    width: 33%;
  }
  @media (width <= 600px) {
    width: 105%;
  }
`;

export const MiniAwardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  @media (width > 1200px) {
    display: none;
  }
  @media (600px <= width <= 1200px) {
    gap: 10px;
    margin-top: 10px;
  }
  @media (width <= 600px) {
    display: none;
  }
`;

export const OscarsContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 90px;
  transition: 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: 0.3s;
  }
  @media (width > 1200px) {
    width: 100%;
    background: radial-gradient(
        100px circle at 350px 5px,
        #429dec 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 360px 70px, #3093e8 50%, transparent 51%);
    background-color: #1e88e5;
  }
  @media (600px <= width <= 1200px) {
    width: 50%;
    background: radial-gradient(
        100px circle at 310px 5px,
        #429dec 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 300px 70px, #3093e8 50%, transparent 51%);
    background-color: #1e88e5;
  }
  @media (width <= 600px) {
    background: radial-gradient(
        100px circle at 310px 5px,
        #429dec 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 300px 70px, #3093e8 50%, transparent 51%);
    background-color: #1e88e5;
  }
`;

interface Dark {
    isDark: boolean
}

export const TotalAwardsContainer = styled.div<Dark>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 90px;
  color:  ${(props) => (props.isDark ? " #FFFFFF" : "#212121")};
  transition: 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: 0.3s;
  }
  @media (width > 1200px) {
    width: 100%;
    background: radial-gradient(
        100px circle at 360px 5px,
        #ffecb2 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 350px 70px, #fff7dd 50%, transparent 51%);

    background-color: ${(props) => (props.isDark ? " #212946" : "#FFFFFF")};
  }
  @media (600px <= width <= 1200px) {
    width: 50%;
    background: radial-gradient(
        100px circle at 310px 5px,
        #ffecb2 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 300px 70px, #fff7dd 50%, transparent 51%);

    background-color: ${(props) => (props.isDark ? " #212946" : "#FFFFFF")};
  }
  @media (width <= 600px) {
    background: radial-gradient(
        100px circle at 300px 5px,
        #ffecb2 50%,
        transparent 51%
      ),
      radial-gradient(75px circle at 300px 70px, #fff7dd 50%, transparent 51%);

    background-color: ${(props) => (props.isDark ? " #212946" : "#FFFFFF")};
  }
`;

export const ChartContainer = styled.div<Dark>`
  background-color: ${(props) => (props.isDark ? " #212946" : "#FFFFFF")};
  padding: 5px 0;
  height: fit-content;
  overflow-x: auto;
  border-radius: 10px;
  transition: 0.3s;
  &::-webkit-scrollbar {
    height: 6px;
    color: red;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5e35b1;
    border-radius: 20px;
    border-right: none;
    border-left: none;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    transition: 0.3s;
  }
`;

export const ImdbContainer = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  height: 800px;
  @media (width > 767px) {
    width: 49.5%;
  }
  @media (width <= 767px) {
    width: 100%;
  }
`;

interface Height {
    height: string
}

export const ImdbHeaderContainer = styled.div<Height>`
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
