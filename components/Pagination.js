import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import classNames from 'classnames'

import Sections from '../data/sections.yaml'

export default function Pagination ({ currentSection, position }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: currentSection })
  const previousSection = Sections[currentSectionIndex - 1]
  const nextSection = Sections[currentSectionIndex + 1]
  return (
    <div className={classNames('pagination', `pagination-${position}`)}>
      {previousSection ? <Link className="pagination-link pagination-previous button" to={`/2016/${previousSection.slug}/`} >&lt;&lt; {previousSection.name}</Link> : <span />}
      {nextSection ? <Link className="pagination-link pagination-next button" to={`/2016/${nextSection.slug}/`} >{nextSection.name} &gt;&gt;</Link> : <span />}
    </div>
  )
}