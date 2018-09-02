import React from 'react';
import authors from '../../data/authors.yaml';
import ReactMarkdown from 'react-markdown';

const About = () => (
  <div className="section about">
    <h2 className="about__heading">StateOfJS is Made by:</h2>
    <div className="about__authors">
      {authors.map(({ name, bio, url }, i) => (
        <div key={i} className="about__author">
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
);

export default About;
