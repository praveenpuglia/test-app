import styled from "styled-components";

interface Props {
    isDark: boolean;
    fontSize: string;
    fontWeight: number
}

interface DarkProps {
    isDark: boolean;
}

export const ErrorParagraphHeading = styled.p<Props>`
    margin:0;
    font-size:${(props) => props.fontSize};
    font-weight:${(props) => props.fontWeight};
    color:${(props) => props.isDark ? "#1565C0" : "#4527A0"}
`

export const ErrorParagraph = styled.p<Props>`
    margin:0;
    font-size:${(props) => props.fontSize};
    font-weight:${(props) => props.fontWeight};
    line-height:1.3;
    color:${(props) => props.isDark ? "#bdc8f0" : "#212121"}
`

export const SubErrorParagraph = styled.p<Props>`
    margin:1 0 0 0;
    font-size:${(props) => props.fontSize};
    font-weight:${(props) => props.fontWeight};
    color:${(props) => props.isDark ? "#8492c4" : "#616161"}
    @media (width >1024px) {
        width:430px;
    }
    @media (768px <= width <= 1024px) {
      width: 100%
    }
    @media (768px > width) {
        width: 95%;
        text-align:center;
    }
`

export const ErrorButton = styled.button<DarkProps>`
    padding:12px 25px;
    margin:0 5px;
    border-radius:25px;
    border:solid 2px;
    border-color:${(props) => props.isDark ? "#7c4dff" : "#4527A0"};
    background-color:${(props) => props.isDark ? "#1a1d47" : "#ede7f6"};
    color:${(props) => props.isDark ? "#7c4dff" : "#4527A0"};
    font-size:17px;
    font-weight:600;
    transition:0.9;
    &:hover{ 
        background-color:${(props) => props.isDark ? "#372b7e" : "#c5b3e4"};
        transition:0.9;
        color:${(props) => props.isDark ? "#7c4df6" : "#673abc"};
        
    }
`