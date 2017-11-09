import React from 'react'
import _ from 'lodash'

import Heatmap from '../heatmap/Heatmap.js'
import heatmapData from '../../../data/heatmapPhi.csv'
import SectionTitle from './SectionTitle.js'

/*

Heatmap Data Import Workflow

1. export as CSV
2. Good Old Plain JavaScript => Plain JavaScript
3. No Front-End Framework => No Framework
4. I've used it before, and would use it again => Option
5. Remove any extra lines at the end
6. Custom REST API => REST API

*/

const heatmapNote = <p className="chart-block-note">Note: “user” defined as people who picked “I've used it before, and would use it again”. <a href="https://en.wikipedia.org/wiki/Phi_coefficient">Phi coefficient</a> values go from -100 to +100, darker red indicates stronger positive correlation, darker blue indicates stronger negative correlation.</p>

const SectionHeatmapBlock = props => {
  return (
    <div className="section section-layout-b">
      {props.title ? <SectionTitle title={props.title} /> : null}
      <Heatmap
        {...props}
        data={_.drop(heatmapData, 4)}
        columns={_.drop(_.keys(heatmapData[0]),4)}
        note={heatmapNote}
        disabledValues={[1]}
        width={600}
        height={600}
      />
      <div className="section-contents-wide">
        <props.contents />
      </div>
    </div>
  )
}

SectionHeatmapBlock.propTypes = {
  title: React.PropTypes.string,
  contents: React.PropTypes.func,
  data: React.PropTypes.array,
  items: React.PropTypes.array,
}

export default SectionHeatmapBlock
