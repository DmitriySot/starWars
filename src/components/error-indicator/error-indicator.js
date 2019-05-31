import React from 'react'
import './error-indicator.css'

import icon from './death-star.png'


const ErrorIndicator = () => {
	return (
		<div className="error-indicator">
			<img src={icon} />
			<h3>BOOM</h3>
			<p>Its PIPEC</p>
			<span>!!!!!!!!!!!!!!!!</span>
		</div>
	)
}

export default ErrorIndicator
