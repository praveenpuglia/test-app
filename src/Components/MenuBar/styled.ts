import styled from "styled-components";

interface Dark {
    isDark: boolean
}

export const LinkPara = styled.p<Dark>`
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    ${(props) => (props.isDark ? "#372b7e" : "#c5b3e4")} 50%,
    ${(props) => (props.isDark ? "#1a1d47" : "#ede7f6")} 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  color: ${(props) => (props.isDark ? " #7c4dff" : "#673abc")};
  height: 40px;
  border-radius: 8px;
  padding-left: 10px;
  font-weight: 500;
  &:hover {
    background-position: left bottom;
    transition: all 0.4s ease;
    color: ${(props) => (props.isDark ? " #7c4dff" : "#673abc")};
  }
`;

export const SelectedLinkPara = styled.p<Dark>`
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    ${(props) => (props.isDark ? "#372b7e" : "#c5b3e4")} 50%,
    transparent 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  color: ${(props) => (props.isDark ? " #a8b2d8" : "#6f6466")};
  height: 40px;
  border-radius: 8px;
  padding-left: 10px;
  font-weight: 500;
  &:hover {
    background-position: left bottom;
    transition: all 0.4s ease;
    color: ${(props) => (props.isDark ? " #7c4dff" : "#673abc")};
  }
`;
