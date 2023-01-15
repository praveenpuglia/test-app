import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./ErrorPage.css";
import Error404 from "../../images/Error404.svg";
import { ErrorButton, ErrorParagraph, ErrorParagraphHeading, SubErrorParagraph } from './styled';
import { useAppSelector } from '../../App/hooks';



function ErrorPage(props: any) {
    const { retryPage } = props
    const ThemeMenu = useAppSelector(state => state.ThemeMenu);
    const navigate = useNavigate();

    return (
        <div className='errorPageContainer'>
            <img src={Error404} alt="404-error" className="smallDeviceErrorImage" />
            <div className='errorPageParaContainer'>
                <ErrorParagraphHeading isDark={ThemeMenu.theme} fontSize="58px" fontWeight={600}>404</ErrorParagraphHeading>
                <ErrorParagraph isDark={ThemeMenu.theme} fontSize="28px" fontWeight={600}>Ooops!</ErrorParagraph>
                <ErrorParagraph isDark={ThemeMenu.theme} fontSize="28px" fontWeight={600}>Page Not Found</ErrorParagraph>
                <SubErrorParagraph isDark={ThemeMenu.theme} fontSize="18px" fontWeight={400}>This page doesn't exist or having issue! We suggest you back to home or retry</SubErrorParagraph>
                <div>
                    <ErrorButton isDark={ThemeMenu.theme} onClick={() => navigate("/")}>Back to Home</ErrorButton>
                    <ErrorButton isDark={ThemeMenu.theme} onClick={() => retryPage()}>Retry</ErrorButton>
                </div>
            </div>
            <img src={Error404} alt="404-error" className="largeDeviceErrorImage" />
        </div>
    )
}

export default ErrorPage