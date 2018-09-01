import React from 'react';
import TextBlock from '../blocks/TextBlock.js';

import Nav from './Nav';

import PeriodicTable from '../common/PeriodicTable';

const HomeLayout = props => (
  <div>
    <PeriodicTable />
    <div className="home-layout-wrapper">
      <h1 className="logo">
        <img src="images/stateofjs2018-logo.svg" alt="The State Of JavaScript" />
        {/*<div className="logo-1"/>
            <div className="logo-2"/>*/}
      </h1>
      <div className="home-layout">{props.children}</div>
    </div>
  </div>
);

export default HomeLayout;
