import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../App/hooks';

import "./ComingSoon.css"

function ComingSoon(props: any) {
  const { componentName } = props
  const navigate = useNavigate()
  const ThemeMenu = useAppSelector(state => state.ThemeMenu);

  const headingStyles = {
    color: ThemeMenu.theme ? "#1565C0" : "#4527A0"
  }

  const textStyles = {
    color: ThemeMenu.theme ? "#bdc8f0" : "#212121"
  }

  const headingBackgroundColorStyle = {
    backgroundColor: ThemeMenu.theme ? "#1565C0" : "#4527A0"
  }

  return (
    <div className='comingSoonContainer'>
      <h1 className='comingSoonHeading' style={headingStyles}>Coming Soon</h1>
      <p className='movieDetailsImdbRating' style={textStyles}>{componentName.name} is under construction</p>
      <button onClick={() => navigate("/movies?page=1")} style={headingBackgroundColorStyle} className="comingSoonButton">Go to Movies</button>
    </div>
  )
}

export default ComingSoon