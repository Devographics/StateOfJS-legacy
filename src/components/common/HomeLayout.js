import React from 'react';
import TextBlock from '../blocks/TextBlock.js';

import Nav from './Nav';

const HomeLayout = props => (
  <div>
    <h1 className="logo">
      <img src="images/stateofjs2018-illustration.svg" alt="The State Of JavaScript" />
      {/*<div className="logo-1"/>
            <div className="logo-2"/>*/}
    </h1>
    <div className="home-layout">{props.children}</div>
  </div>
);

export default HomeLayout;
