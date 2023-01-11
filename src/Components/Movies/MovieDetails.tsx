import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCategory, BiArrowBack } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper";
import format from 'date-fns/format'

import lightUser from "../../images/lightUser.png"
import darkUser from "../../images/darkUser.png"

import "./MovieDetails.css";
import { useAppSelector } from "../../App/hooks";
import { MoviePoster, MovieTitle, MoviePlot, MovieDate, MovieGenre, MovieDetailsAwardsRatingContainer, MovieDetailsSubHeadings, MovieDetailsSubParas, HorizontalLine, EachSimilarMovieContainer, MovieDetailsCommentsMoviesHeading, MovieDetailsCommentName, MovieDetailsCommentDate, MovieDetailsCommentText, EachMovieDetailsCommentContainer } from "./styled";
import { getMovieComments, getSimilarMovies } from "../../Api/Movies/MoviesApi";


function MovieDetails(props: any) {
    const navigate = useNavigate();
    const ThemeMenu = useAppSelector(state => state.ThemeMenu);
    const [comments, setComments] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [similarMoviesState, setSimilarMoviesState] = useState(false);
    const [slides, setSlides] = useState(0)
    const { data } = props;

    useEffect(() => {
        fetchSimilarMovies();
        if (data.num_mflix_comments > 0) {
            fetchComments();
        }
        if (window.screen.width > 100 && window.screen.width < 768) {
            setSlides(1)
        } else if (window.screen.width >= 768 && window.screen.width < 1000) {
            setSlides(2)
        } else if (window.screen.width >= 1000 && window.screen.width < 1200) {
            setSlides(3)
        } else if (window.screen.width >= 1200) {
            setSlides(4)
        }
    }, [])

    const fetchSimilarMovies = async () => {
        let fetchData = ""
        fetchData += `genres=${data.genres.join("%20")}`
        fetchData += `&year=${data.year}`
        fetchData += `&title=${data.title}`
        const { status, responseData } = await getSimilarMovies(fetchData);
        if (status === 200) {
            setSimilarMoviesState(true);
            setSimilarMovies(responseData.similarMoviesList);
        }
    }

    const fetchComments = async () => {
        const { status, responseData } = await getMovieComments(data._id);
        if (status === 200) {
            setComments(responseData.comments);
        }
    }

    const styles = {
        iconColor: {
            color: ThemeMenu.theme ? "#1565C0" : "#4527a0"
        },
    } as const;

    return (
        <div className="movieDetailMainContainer">
            <BiArrowBack className="movieDetailsBackArrowButton"
                style={{ color: ThemeMenu.theme ? "#1565C0" : "#4527a0" }}
                onClick={() => { navigate(-1) }} />
            <div className="movieDetailsHeaderContainer">
                <MoviePoster
                    src={data.poster}
                    alt="movie-poster"
                    isDark={ThemeMenu.theme}
                />
                <div className="movieDetailsHeaderSubContainer">
                    <MovieTitle isDark={ThemeMenu.theme}>{data.title}</MovieTitle>
                    <MoviePlot isDark={ThemeMenu.theme}>{data.plot}</MoviePlot>
                    <MovieDate isDark={ThemeMenu.theme}>
                        <FaRegCalendarAlt className="movieDetailsMovieCalendarIcon" style={styles.iconColor} />
                        {format(new Date(data.released), 'MMMM do yyyy')}
                    </MovieDate>
                    <div className="movieDetailsMovieGenreContainer">
                        <BiCategory className="movieDetailsMovieGenreIcon" style={styles.iconColor} />
                        {data.genres.map((eachGenre: any) =>
                            <MovieGenre isDark={ThemeMenu.theme} key={eachGenre}>{eachGenre}</MovieGenre>)}
                    </div>
                    <div className="movieDetailsHeaderMiniContainer">
                        {data.languages.length > 0 ?
                            <div className="movieDetailsMovieLanguageContainer">
                                <IoLanguageSharp className="movieDetailsMovieLanguageIcon" style={styles.iconColor} />
                                {data.languages.map((eachLanguage: any) =>
                                    <MovieGenre isDark={ThemeMenu.theme} key={eachLanguage}>{eachLanguage}</MovieGenre>)}
                            </div>
                            :
                            null}
                        {data.countries.length > 0 ?
                            <div className="movieDetailsMovieLocationContainer">
                                <HiOutlineLocationMarker className="movieDetailsMovieLocationIcon" style={styles.iconColor} />
                                {data.countries.map((eachCountry: any) =>
                                    <MovieGenre isDark={ThemeMenu.theme} className="movieDetailsMovieLocation" key={eachCountry}>{eachCountry}</MovieGenre>)}
                            </div>
                            :
                            null}
                    </div>
                    <MovieDetailsAwardsRatingContainer isDark={ThemeMenu.theme} >
                        {data.imdb.rating ?
                            <div className="movieDetailsRatingAndAwardsSubContainer" style={{ backgroundColor: "#fff8e1" }}>
                                <p className="movieDetailsMovieIMDB">IMDB</p>
                                <div className="movieDetailsMovieIMDBSubContainer">
                                    <div className="movieDetailsMovieIMDBSubRatingsContainer">
                                        <p className="movieDetailsMovieRatingReviewsPara">{data.imdb.rating.$numberDecimal}</p>
                                        <BsStarFill className="movieDetailsRatingStarIcon" />
                                    </div>
                                    <div className="movieDetailsMovieIMDBSubRatingsContainer">
                                        <p className="movieDetailsMovieRatingReviewsPara">{data.imdb.votes}</p>
                                        <MdSupervisorAccount className="movieDetailsRatingUserCountIcon" />
                                    </div>
                                </div>

                            </div>
                            : null}
                        {data.tomatoes && data.tomatoes.critic && data.tomatoes.viewer ?
                            <div className="movieDetailsRatingAndAwardsSubContainer" style={{ backgroundColor: "#ffab91" }}>
                                <p className="movieDetailsMovieTomato">Rotten tomato</p>
                                <div className="movieDetailsMovieIMDBSubContainer">
                                    <div className="movieDetailsMovieIMDBSubRatingsContainer">
                                        <p className="movieDetailsMovieRatingReviewsPara">{(data.tomatoes.critic.meter + data.tomatoes.viewer.meter) / 2}</p>
                                        <BsStarFill className="movieDetailsRatingStarIcon" />
                                    </div>
                                    <div className="movieDetailsMovieIMDBSubRatingsContainer">
                                        <p className="movieDetailsMovieRatingReviewsPara">{data.tomatoes.critic.numReviews + data.tomatoes.viewer.numReviews}</p>
                                        <MdSupervisorAccount className="movieDetailsRatingUserCountIcon" />
                                    </div>
                                </div>
                            </div>
                            : null}
                        {data.awards.wins > 0 ?
                            <div className="movieDetailsRatingAndAwardsSubContainer" style={{ backgroundColor: "#b9f6ca" }}>
                                <p className="movieDetailsMovieAward">Awards</p>
                                <p className="movieDetailsMovieRatingReviewsPara" style={{ marginTop: 15 }}>{data.awards.text}</p>
                            </div>
                            : null}
                    </MovieDetailsAwardsRatingContainer>
                </div>
            </div>
            <div className="movieDetailsBodyContainer">
                <div className="movieDetailsBodyPlotContainer">
                    {data.fullplot !== undefined ?
                        <>
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>Plot</MovieDetailsSubHeadings>
                            <MovieDetailsSubParas isDark={ThemeMenu.theme}>{data.fullplot}</MovieDetailsSubParas>
                        </> : null
                    }
                    {data.tomatoes && data.tomatoes.consensus !== undefined ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>critics consensus</MovieDetailsSubHeadings>
                            <MovieDetailsSubParas isDark={ThemeMenu.theme}>{data.tomatoes.consensus}</MovieDetailsSubParas>
                        </>
                        : null}
                    {data.tomatoes && data.tomatoes.boxOffice !== undefined ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>Box Office</MovieDetailsSubHeadings>
                            <MovieDetailsSubParas isDark={ThemeMenu.theme}>{data.tomatoes.boxOffice}</MovieDetailsSubParas>
                        </>
                        : null}
                    {data.tomatoes && data.tomatoes.production !== undefined ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>Production</MovieDetailsSubHeadings>
                            <MovieDetailsSubParas isDark={ThemeMenu.theme}>{data.tomatoes.production}</MovieDetailsSubParas>
                        </>
                        : null}
                    {data.tomatoes && data.tomatoes.website !== undefined ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>Website</MovieDetailsSubHeadings>
                            <a href={data.tomatoes.website} target="_blank" className="movieDetailsMovieWebsite">
                                <MovieDetailsSubParas isDark={ThemeMenu.theme}>{data.tomatoes.website}</MovieDetailsSubParas></a>
                        </>
                        : null}
                </div>
                <div className="movieDetailsBodyCastContainer">
                    {data.cast.length > 0 ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} className="hideHorizontalLineInLarge" />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>Cast</MovieDetailsSubHeadings>
                            <div className="movieDetailsMovieCastContainer">
                                {data.cast.map((eachCast: any) =>
                                    <div className="movieDetailsMovieCastSubContainer" key={eachCast}>
                                        <img src={ThemeMenu.theme ? darkUser : lightUser} alt="user-icon" width={30} style={{ marginRight: 5 }} />
                                        <MovieDetailsSubParas isDark={ThemeMenu.theme} >{eachCast}</MovieDetailsSubParas>
                                    </div>
                                )}
                            </div>

                        </>
                        : null}
                    {data.directors.length > 0 ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>{data.directors.length < 2 ? "Director" : "Directors"}</MovieDetailsSubHeadings>
                            <div className="movieDetailsMovieCastContainer">
                                {data.directors.map((eachDirector: any) =>
                                    <div className="movieDetailsMovieCastSubContainer" key={eachDirector}>
                                        <img src={ThemeMenu.theme ? darkUser : lightUser} alt="user-icon" width={30} style={{ marginRight: 5 }} />
                                        <MovieDetailsSubParas isDark={ThemeMenu.theme} >{eachDirector}</MovieDetailsSubParas>
                                    </div>

                                )}
                            </div>

                        </>
                        : null}
                    {data.writers.length > 0 ?
                        <>
                            <HorizontalLine isDark={ThemeMenu.theme} />
                            <MovieDetailsSubHeadings isDark={ThemeMenu.theme}>{data.writers.length < 2 ? "Writer" : "Writers"}</MovieDetailsSubHeadings>
                            <div className="movieDetailsMovieCastContainer">
                                {data.writers.map((eachWriter: any) =>
                                    <div className="movieDetailsMovieCastSubContainer" key={eachWriter}>
                                        <img src={ThemeMenu.theme ? darkUser : lightUser} alt="user-icon" width={30} style={{ marginRight: 5 }} />
                                        <MovieDetailsSubParas isDark={ThemeMenu.theme} >{eachWriter}</MovieDetailsSubParas>
                                    </div>
                                )}
                            </div>
                        </>
                        : null}
                </div>

            </div>
            {similarMoviesState ?
                <div>
                    <HorizontalLine isDark={ThemeMenu.theme} />
                    <MovieDetailsCommentsMoviesHeading isDark={ThemeMenu.theme}>Similar Movies</MovieDetailsCommentsMoviesHeading>
                    <div className="similarMoviesContainer">
                        {similarMovies.map((eachMovie: any) =>
                            <EachSimilarMovieContainer isDark={ThemeMenu.theme} onClick={() => navigate(`/movie/${eachMovie._id}`)} key={eachMovie._id} >
                                <img src={eachMovie.poster} alt="movie-poster" className="similarMoviePoster" />
                                <p className="eachSimilarMovieTitle">{eachMovie.title}</p>
                            </EachSimilarMovieContainer>)}
                    </div>
                </div>
                : null}
            {data.num_mflix_comments > 0 ? <div>
                <HorizontalLine isDark={ThemeMenu.theme} />
                <MovieDetailsCommentsMoviesHeading isDark={ThemeMenu.theme}>Comments ({data.num_mflix_comments})</MovieDetailsCommentsMoviesHeading>
                <Swiper
                    slidesPerView={slides}
                    spaceBetween={10}
                    freeMode={true}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                    className="moviesCommentsSwiper"
                >
                    {comments.map((eachComment: any) =>
                        <SwiperSlide key={eachComment._id}>
                            <EachMovieDetailsCommentContainer isDark={ThemeMenu.theme} >
                                <MovieDetailsCommentName isDark={ThemeMenu.theme}>{eachComment.name}</MovieDetailsCommentName>
                                <MovieDetailsCommentDate isDark={ThemeMenu.theme}>
                                    {format(new Date(data.released), 'MMMM do yyyy')}</MovieDetailsCommentDate>
                                <MovieDetailsCommentText isDark={ThemeMenu.theme}>{eachComment.text}</MovieDetailsCommentText>
                            </EachMovieDetailsCommentContainer>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div> : null}
        </div >
    );
}

export default MovieDetails;
