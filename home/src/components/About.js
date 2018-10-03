import React from 'react'
import ReactMarkdown from 'react-markdown'
import authors from '../data/authors.yaml'

const About = () => (
    <div className="section about">
        <h2 className="about__heading">StateOfJS is Made by:</h2>
        <div className="about__authors">
            {authors.map(({ name, slug, bio, url }) => (
                <div key={slug} className="about__author">
                    <h3 className="about__author__name">
                        <a href={url}>{name}</a>
                    </h3>
                    <div className="about__author__bio">
                        <ReactMarkdown source={bio} />
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default About
