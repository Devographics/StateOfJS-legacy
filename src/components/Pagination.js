import React from 'react'
import _ from 'lodash'
import Link from 'gatsby-link'
import classNames from 'classnames'

import Sections from '../../data/sections.yaml'

export default function Pagination ({ section }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: section })
  const previousSection = Sections[currentSectionIndex - 1]
  const nextSection = Sections[currentSectionIndex + 1]
  return (
    <div className="pagination">
      <div className="pagination-inner">
        {previousSection ? <Link className="pagination-link pagination-previous button" to={`/2016/${previousSection.slug}/`} >&lt;&lt; {previousSection.name}</Link> : <span />}
        {nextSection ? <Link className="pagination-link pagination-next button" to={`/2016/${nextSection.slug}/`} >{nextSection.name} &gt;&gt;</Link> : <span />}
      </div>
    </div>
  )
}