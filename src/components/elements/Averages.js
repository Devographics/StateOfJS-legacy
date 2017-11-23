import React from 'react'

    	// <div className="salariesaverage__label">Average Salary</div>

const Averages = ({ data }) => (
    <div className="averages">
        {data.map((value, index) => 
        	<div className="averages__item" key={index}>
        		<span>{value}</span>
    		</div>
    	)}
    </div>
)

export default Averages
