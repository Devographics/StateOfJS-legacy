import React from 'react'
import parseCSV from '../helpers/parseCSV.js'
import { FILTERS, RESPONSES } from '../helpers/constants.js'

import HorizontalChart from '../components/horizontalbar/Chart.js'
import VerticalChart from '../components/verticalbar/Chart.js'
import StackedChart from '../components/stackedbar/Chart.js'

import flavors from '../data/flavors/results.csv'
import frontend from '../data/frontend/results.csv'

const SVGContainer = () =>
  <div className="svg-container">
    <div className="svg-block block-1" id="flavors-stacked">
      <StackedChart data={parseCSV(flavors)} showPercent responses={RESPONSES} filter="All" title="JavaScript Flavors" isExport />
    </div>
    <div className="svg-block block-2" id="frontend-stacked">
      <StackedChart data={parseCSV(frontend)} showPercent responses={RESPONSES} filter="All" title="Front-End Frameworks" isExport />
    </div>
  </div>

export default SVGContainer
