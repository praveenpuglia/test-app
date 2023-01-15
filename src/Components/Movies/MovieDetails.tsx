import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCategory, BiArrowBack } from "react-icons/bi";
import { BsStarFill, BsFillPlayCircleFill } from "react-icons/bs";
import { MdSupervisorAccount } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper";
import format from 'date-fns/format'
import { useAppSelector } from "../../App/hooks";

import "./MovieDetails.css";
import { fetchMovieReviews, fetchSimilarMovies } from "../../Services/TMDB/tmdbService";

function MovieDetails(props: any) {
    const navigate = useNavigate();
    const ThemeMenu = useAppSelector(state => state.ThemeMenu);
    const Data = useAppSelector(state => state.Data.movieDetails);
    const [openDialog, setOpenDialog] = useState(false);
    const [formattedBudget, setFormattedBudget] = useState("")
    const [formattedRevenue, setFormattedRevenue] = useState("")
    const [runTime, setRunTime] = useState("")
    const [reviews, setReviews] = useState([])
    const [similarMovies, setSimilarMovies] = useState([]);
    const [slides, setSlides] = useState(3)

    useEffect(() => {
        setFormattedBudget(formatCurrency(Data.budget));
        setFormattedRevenue(formatCurrency(Data.revenue));
        formatRuntime();
        getSimilarMovies();
        getMovieReviews();
        if (window.innerWidth > 375 && window.innerWidth < 768) {
            setSlides(1)
        } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
            setSlides(2)
        } else if (window.innerWidth > 1024) {
            setSlides(3)
        }
    }, [])

    const getSimilarMovies = async () => {
        const { response, data } = await fetchSimilarMovies(Data.id);
        if (response.status === 200) {
            setSimilarMovies(data.results.slice(0, 4))
        }
    }

    const getMovieReviews = async () => {
        const { response, data } = await fetchMovieReviews(Data.id);
        if (response.status === 200) {
            setReviews(data.results)
        }
    }

    const formatRuntime = () => {
        let hours = Math.floor(Data.runtime / 60)
        let minutes = Data.runtime - (hours * 60)
        let time = ""
        if (hours !== 0) {
            time += hours + "h"
        }
        if (minutes !== 0) {
            time += " " + minutes + "m"
        }
        setRunTime(time);
    }

    const formatCurrency = (amount: number) => {
        let revenue = String(amount).split("").reverse()
        let count = 1;
        let newRevenue = []
        let value = ""
        for (let eachNum of revenue) {
            if (count === 3) {
                newRevenue.push(eachNum)
                newRevenue.push(",")
                count = 1
            } else {
                newRevenue.push(eachNum)
                count += 1
            }
        }
        value = newRevenue.reverse().join("")
        if (value[0] === ",") {
            value = value.slice(1, value.length)
        }
        return value
    }
    const textStyles = {
        color: ThemeMenu.theme ? "#bdc8f0" : "#212121"
    }

    const headingStyles = {
        color: ThemeMenu.theme ? "#1565C0" : "#4527A0"
    }

    const backgroundColorStyle = {
        backgroundColor: ThemeMenu.theme ? "#90CAF9" : "#B39DDB"
    }

    const headingBackgroundColorStyle = {
        backgroundColor: ThemeMenu.theme ? "#1565C0" : "#4527A0"
    }

    const swiperBackgroundColorStyle = {
        backgroundColor: ThemeMenu.theme ? "#E3F2FD" : "#EDE7F6"
    }

    const castBackgroundColorStyle = {
        backgroundColor: ThemeMenu.theme ? "#111936" : "#ffffff"
    }

    return (
        <div >
            <button className="movieDetailsBackArrowButton" onClick={() => navigate(-1)}>
                <BiArrowBack style={headingStyles} className="movieDetailsBackArrowIcon" />
            </button>

            <div className="movieDetailsContainer">
                <div className="movieDetailsHeadContainer">
                    <div className="movieDetailsPosterContainer">
                        <img src={`https://image.tmdb.org/t/p/original${Data.poster_path}`} alt="movie-poster" className="movieDetailsPoster" />
                    </div>
                    <div className="movieDetailsSubHeadContainer">
                        <div className="movieDetailsTrailerHeadContainer">
                            <div className="movieDetailsTitleContainer">
                                <p className="movieDetailsTitle" style={headingStyles}>{Data.title}</p>
                                <p className="movieDetailsTagline" style={textStyles}>{Data.tagline}</p>
                            </div>
                            {Data.trailer ?
                                <div className="movieDetailsTrailerContainer" onClick={() => setOpenDialog(true)}>
                                    <BsFillPlayCircleFill className="movieDetailsPlayTrailerIcon" />
                                    <p className="movieDetailsPlayTrailer" style={textStyles}>Play Trailer</p>
                                </div>
                                : null}
                        </div>

                        <p className="movieDetailsReleasedDate" style={textStyles}>
                            <FaRegCalendarAlt className="movieDetailsCalendarIcon" style={headingStyles} />
                            {format(new Date(Data.release_date), "do MMM yyyy")} </p>

                        <div className="movieDetailsGenresContainer">
                            <BiCategory className="movieDetailsGenresIcon" style={headingStyles} />
                            {Data.genres.map((eachGenre: { id: number, name: string }) =>
                                <p className="movieDetailsGenre" key={eachGenre.id} style={backgroundColorStyle}>{eachGenre.name}</p>
                            )}
                        </div>

                        <div className="movieDetailsLanguageAndCountryContainer">
                            {Data.spoken_languages.length > 0 ?
                                <div className="movieDetailsLanguagesContainer">
                                    <IoLanguageSharp className="movieDetailsLanguageIcon" style={headingStyles} />
                                    {Data.spoken_languages.map((eachLanguage: { english_name: string, iso_639_1: string, name: string }) =>
                                        <p className="movieDetailsGenre" key={eachLanguage.iso_639_1} style={backgroundColorStyle}>{eachLanguage.english_name}</p>
                                    )}
                                </div>
                                : null}
                            {Data.production_countries.length > 0 ?
                                <div className="movieDetailsCountriesContainer">
                                    <HiOutlineLocationMarker className="movieDetailsCountriesIcon" style={headingStyles} />
                                    {Data.production_countries.map((eachCountry: { iso_3166_1: string, name: string }) =>
                                        <p className="movieDetailsGenre" key={eachCountry.iso_3166_1} style={backgroundColorStyle}>{eachCountry.name}</p>
                                    )}
                                </div>
                                : null}
                        </div>
                        <div className="movieDetailsImdbContainer">
                            <p className="movieDetailsImdbHeading">IMDB</p>
                            <div className="movieDetailsSubImdbContainer">
                                <div>
                                    <BsStarFill className="movieDetailsImdbStarIcon" />
                                    <p className="movieDetailsImdbRating">
                                        {String(Data.vote_average).split(".")[0]}.{String(Data.vote_average).split(".")[1].slice(0, 1)}
                                    </p>
                                </div>
                                <div>
                                    <MdSupervisorAccount className="movieDetailsImdbUserIcon" />
                                    <p className="movieDetailsImdbRating">{Data.vote_count}</p>
                                </div>
                            </div>
                        </div>
                        {Data.directors ?
                            <div className="movieDetailsDirectorContainer" style={backgroundColorStyle}>
                                <p className="movieDetailsDirectorHeading" style={headingBackgroundColorStyle}>
                                    {Data.directors.length > 1 ? "Directors" : "Director"}</p>
                                {Data.directors.map((eachDirector: any) =>
                                    <p key={eachDirector.id} className="eachMovieDetailsDirector" >{eachDirector.name}</p>)}
                            </div>
                            : null}
                        {Data.writers ?
                            <div className="movieDetailsDirectorContainer" style={backgroundColorStyle}>
                                <p className="movieDetailsDirectorHeading" style={headingBackgroundColorStyle}>
                                    {Data.writers.length > 1 ? "Writers" : "Writer"}
                                </p>
                                {Data.writers.map((eachWriter: any) =>
                                    <p key={eachWriter.id} className="eachMovieDetailsDirector" >{eachWriter.name}</p>)}
                            </div>
                            : null}
                    </div>
                </div>
                <hr className="eachMovieDetailsHorizontalLine" style={headingBackgroundColorStyle} />
                <div className="eachMovieDetailsBodyContainer">
                    <div className="eachMovieDetailsBodySubContainer">
                        <p className="movieDetailsBodyHeading" style={headingStyles}>Overview</p>
                        <p className="movieDetailsBodyPara" style={textStyles}>{Data.overview}</p>
                        <hr className="eachMovieDetailsHorizontalLine" style={headingBackgroundColorStyle} />
                        <p className="movieDetailsBodyHeading" style={headingStyles}>Runtime</p>
                        <p className="movieDetailsBodyPara" style={textStyles}>{runTime}</p>
                        <hr className="eachMovieDetailsHorizontalLine" style={headingBackgroundColorStyle} />
                        <div className="movieDetailsBudgetContainer">
                            <div>
                                <p className="movieDetailsBodyHeading" style={headingStyles}>Budget</p>
                                <p className="movieDetailsBodyPara" style={textStyles} >${formattedBudget}</p>
                            </div>
                            <div>
                                <p className="movieDetailsBodyHeading" style={headingStyles}>Revenue</p>
                                <p className="movieDetailsBodyPara" style={textStyles}>${formattedRevenue}</p>
                            </div>
                        </div>
                        {Data.homepage ?
                            <>
                                <hr className="eachMovieDetailsHorizontalLine" style={headingBackgroundColorStyle} />
                                <p className="movieDetailsBodyHeading" style={headingStyles}>Website</p>
                                <a className="movieDetailsBodyPara movieDetailsWebsiteLink" href={Data.homepage} target="_blank">{Data.homepage}</a>
                            </> : null}
                    </div>
                    <div className="eachMovieDetailsCastContainer">
                        <hr className="eachMovieDetailsHorizontalLine movieDetailsSmallHr" style={headingBackgroundColorStyle} />
                        <p className="movieDetailsBodyHeading" style={headingStyles}>Cast</p>
                        <div className="eachMovieDetailsCastSubContainer">
                            {Data.cast.map((eachCast: any) =>
                                <div key={eachCast.id} className="movieDetailsEachCastContainer" style={castBackgroundColorStyle}>
                                    <img src={`https://image.tmdb.org/t/p/original/${eachCast.profile_path}`} alt="cast-picture" className="eachMovieDetailsProfilePicture" />
                                    <p className="eachMovieDetailsCastName" style={textStyles}>{eachCast.name}</p>
                                    <p className="eachMovieDetailsCharacterName" style={textStyles}>{eachCast.character}</p>
                                </div>)}
                        </div>
                    </div>
                </div>
                {similarMovies.length > 0 ?
                    <>
                        <hr className="eachMovieDetailsCastBottomHorizontalLine" style={headingBackgroundColorStyle} />
                        <p className="movieDetailsBodyHeading" style={headingStyles}>Similar Movies</p>
                        <div className="movieDetailsSimilarMoviesContainer">
                            {similarMovies.map((eachMovie: any) =>
                                <div key={eachMovie.id} className="movieDetailsEachSimilarMovieContainer" style={castBackgroundColorStyle} onClick={() => navigate(`/movie/${eachMovie.id}`)}>
                                    <img src={`https://image.tmdb.org/t/p/original${eachMovie.poster_path}`} alt="movie-poster" className="movieDetailsEachSimilarMoviePoster" />
                                    <p className="eachMovieDetailsReviewAuthor movieDetailsAddPadding" style={headingStyles}>{eachMovie.title}</p>
                                    <p className="eachMovieDetailsReviewDate movieDetailsAddPadding" style={textStyles}>{eachMovie.release_date.split("-")[0]}</p>
                                </div>
                            )}
                        </div>
                    </>
                    : null}
                {reviews.length > 0 ?
                    <>
                        <hr className="eachMovieDetailsHorizontalLine" style={headingBackgroundColorStyle} />
                        <p className="movieDetailsBodyHeading" style={headingStyles}>Review ({reviews.length})</p>
                        <Swiper
                            slidesPerView={slides}
                            spaceBetween={10}
                            freeMode={true}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Autoplay, FreeMode, Pagination]}
                            className="mySwiper"
                        >
                            {reviews.map((eachReview: any) =>
                                <SwiperSlide key={eachReview.id} style={swiperBackgroundColorStyle}>
                                    <p className="eachMovieDetailsReviewAuthor" style={headingStyles}>{eachReview.author}</p>
                                    <p className="eachMovieDetailsReviewDate" >{format(new Date(eachReview.created_at), "do MMM yyyy")}</p>
                                    <p className="eachMovieDetailsReviewContent" >{eachReview.content}</p>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </>
                    : null}
            </div>
            {Data.trailer ?
                <Dialog open={openDialog}>
                    <div className="movieDetailsTrailerDialogTitleContainer">
                        <p className="movieDetailsTrailerHeading">Trailer</p>
                        <AiOutlineClose className="movieDetailsTrailerCloseIcon" onClick={() => { setOpenDialog(false) }} />
                    </div>
                    <iframe width="fit-content" height="100%" src={`https://www.youtube.com/embed/${Data.trailer.key}?rel=0&autoplay=1`}
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen style={{ border: "none" }} ></iframe>
                </Dialog>
                : null}
        </div>
    );
}

export default MovieDetails;
