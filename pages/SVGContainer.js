import React from 'react'
import _ from 'lodash'

import parseCSV from '../helpers/parseCSV.js'
import { FILTERS, RESPONSES } from '../helpers/constants.js'
import Sections from '../data/sections.yaml'

import HorizontalChart from '../components/horizontalbar/Chart.js'
import VerticalChart from '../components/verticalbar/Chart.js'
import StackedChart from '../components/stackedbar/Chart.js'

import flavors from '../data/flavors/results.csv'
import frontend from '../data/frontend/results.csv'
import statemanagement from '../data/statemanagement/results.csv'
import api from '../data/api/results.csv'
import fullstack from '../data/fullstack/results.csv'
import testing from '../data/testing/results.csv'
import css from '../data/css/results.csv'
import buildtools from '../data/buildtools/results.csv'
import mobile from '../data/mobile/results.csv'

const sections = {
  flavors,
  frontend,
  statemanagement,
  api,
  fullstack,
  testing,
  css,
  buildtools,
  mobile,
}

const SVGContainer = () =>
  <div className="svg-container">
    {_.map(sections, (section, key) => {
      return (
      <div key={key} className="svg-block" id={`${key}-stacked`}>
        <StackedChart data={parseCSV(section)} section={key} identifier="Option" showPercent responses={RESPONSES} filter="All" title={_.find(Sections, s => s.slug === key).name} isExport />
      </div>
      )}
    )}
  </div>

export default SVGContainer
