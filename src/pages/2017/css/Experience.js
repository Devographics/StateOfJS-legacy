import React from 'react'
import styleData from '../../../data/style.json'
import Experience from '../../../components/Experience'
import * as dto from '../../../dto'

const data = dto.experience(styleData.experience)

const StyleExperience = () => (
    <Experience
        title="Styling/CSS solutions"
        data={data}
        description={
            <div className="description">
                <p>
                    Although CSS is hardly related to JavaScript, it's becoming more tightly coupled
                    to it thanks to the popularity of client-side JavaScript frameworks.
                </p>
                <p>
                    And just like JavaScript, CSS is a mess. There are many variants of CSS
                    frameworks or preprocessors which extend capabilities of standard CSS (or Plain
                    CSS). SASS, LESS, and CSS Modules are just a few examples of such tools.
                </p>
                <p>
                    Looking at the result of the survey, it seems both SASS and Plain CSS are used
                    by developers at the same level. But looking at the satisfaction rate, it turns
                    out that developers who use SASS and CSS Modules are more satisfied with them
                    compared to the other options.
                </p>
            </div>
        }
    />
)

export default StyleExperience
