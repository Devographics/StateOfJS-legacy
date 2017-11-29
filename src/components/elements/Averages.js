import React from 'react'
import paddingFormula from '../../helpers/paddingFormula'

    	// <div className="salariesaverage__label">Average Salary</div>



const Averages = ({ data }) => (
    <div className={`averages averages--${data.length}-items`}>
    	<div className="averages__legend">
    		<span>Average:</span>
		</div>
    	<div className="averages__inner" style={{padding: paddingFormula(data.length)}}>
	        {data.map((value, index) => 
	        	<div className="averages__item" key={index}>
	        		<span className="averages__item__inner">{value}</span>
	    		</div>
	    	)}
    	</div>
    </div>
)

export default Averages
