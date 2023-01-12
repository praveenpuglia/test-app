import styled from "styled-components";

interface Dark {
  isDark: boolean;
}

export const MoviePoster = styled.img<Dark>`
    
    border-radius: 10px;
    border-radius: 10px;
        background:${(props) => props.isDark ? "#616161" : "#EDE7F6"} ;
        box-shadow:  5px 5px 3px ${(props) => props.isDark ? "#0e0e0e" : "#615f65"},
                    -5px -5px 3px ${(props) => props.isDark ? "#343434" : "#ffffff"} ;
    transition: 0.3s all ease-in-out;
    &:hover{
      transform: scale(1.01);
    }
    @media (width > 375px) {width: 100%;}
    @media (768px <= width <= 1024px) {
      width: 70%;
      align-self:center;
    }
    @media (width > 1024px) {width: 28%;}
`

export const MovieTitle = styled.p<Dark>`
    margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.isDark ? "#1565C0" : "#4527a0"}  ;
`
export const MoviePlot = styled.p<Dark>`
margin: 8px 0 0 0;
font-size: 16px;
  color: ${(props) => props.isDark ? "#bdc8f0" : "#212121"}  ;
  `
export const MovieDate = styled.p<Dark>`
  display: flex;
  align-items: flex-end;
  margin: 20px 0 0 0;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.isDark ? "#bdc8f0" : "#212121"};
    `
export const MovieGenre = styled.p<Dark>`
background-color: ${(props) => props.isDark ? "#bdc8f0" : "#b39ddb"};
margin: 4px 8px 4px 0;
font-size: 17px;
font-weight: 500;
padding: 5px 10px;
border-radius: 4px;
color: #212121;
box-shadow:  ${(props) => props.isDark ? "#212121" : "#b39ddb"}  0px 5px 15px 0px;
      `

export const MovieDetailsAwardsRatingContainer = styled.div<Dark>`
background-color: ${(props) => props.isDark ? "#E3F2FD" : "#ede7f6"}; 
margin: 20px 0 0 0;
border-radius: 10px;
box-shadow: 5px 5px 9px ${(props) => props.isDark ? "#1c1c1c" : "#c9c4d1"}, -5px -5px 9px ${(props) => props.isDark ? "#262626" : "#ffffff"} ;
    @media (width > 375px) {
      display: flex;
      flex-direction:column;
      align-items:center;
      flex-wrap:wrap;
      gap: 10px;
    }
    @media (768px <= width <= 1024px) {
      display: flex;
      flex-direction:row;
      align-items:stretch;
      justify-content: space-evenly;
      gap: 10px;
    }
    @media (width > 1024px) {
      display: flex;
      flex-direction:row;
      align-items:stretch;
      justify-content: space-evenly;
      gap: 10px;
    }
`

export const MovieDetailsSubHeadings = styled.p<Dark>`
    margin: 10px 0 0 0;
    color: ${(props) => props.isDark ? "#1565C0" : "#4527a0"}  ;
  font-size: 20px;
  font-weight: 500;
`

export const MovieDetailsCommentsMoviesHeading = styled.p<Dark>`
    margin: 15px 0 0 0;
    color: ${(props) => props.isDark ? "#1565C0" : "#4527a0"}  ;
  font-size: 22px;
  font-weight: 600;
`

export const MovieDetailsSubParas = styled.p<Dark>`
    color: ${(props) => props.isDark ? "#bdc8f0" : "#212121"}  ;
    margin: 5px 0 0 0;
    word-wrap: break-word;
    font-size: 17px;
`

export const HorizontalLine = styled.hr<Dark>`
    border:none;
    width:100%;
    height:0.5px;
    margin:10px 0 0 0;
    background-color:${(props) => props.isDark ? "#1565C0" : "#4527a0"}  ;
`
export const EachSimilarMovieContainer = styled.div<Dark>`
  background-color: ${(props) => props.isDark ? "#bdc8f0" : "#b39ddb"};
  color:#212121;
  border-radius: 10px;
  overflow:hidden;
  &:hover{
    cursor:pointer
  }
  @media (width > 375px) {width: 45%;}
    @media (768px <= width <= 1024px) {
      width: 23%;
    }
    @media (width > 1024px) {width: 20%;}
`

export const MovieDetailsCommentName = styled.p<Dark>`
  margin:0;
  color: ${(props) => props.isDark ? "#bdc8f0" : "#212121"}  ;
  font-size:18px;
  font-weight:500;
`

export const MovieDetailsCommentDate = styled.p<Dark>`
  margin:0;
  color: ${(props) => props.isDark ? "#cac8ff" : "#616161"}  ;
  font-size:14px;
  font-weight:500;
  line-height:0.8
`
export const MovieDetailsCommentText = styled.p<Dark>`
  margin:10px 0 0 0;
  color: ${(props) => props.isDark ? "#bdc8f0" : "#212121"}  ;
  font-size:16px;
  line-height:1.2
`

export const EachMovieDetailsCommentContainer = styled.div<Dark>`
    background-color: ${(props) => props.isDark ? "#212946" : "#ede7f6"}; 
  padding:10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  border-radius:10px;
`