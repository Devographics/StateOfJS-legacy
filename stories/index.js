import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'

import flavors from '../data/flavors.json'
import StackedBar from '../pages/charts/_stackedbar'
import { FILTERS, RESPONSES } from '../pages/_constants'
import '../pages/_results.scss'

console.log('resp', RESPONSES);

storiesOf('StackedBar', module)
  .add('Filtered by All', () => (
    <StackedBar identifier="Flavor" title="JavaScript Flavors" data={flavors} responses={RESPONSES} filters={FILTERS} filter={FILTERS.ALL} handleSelect={action('filter')} />
  ))
  .add('Filtered by Interest', () => (
    <StackedBar identifier="Flavor" title="JavaScript Flavors" data={flavors} responses={RESPONSES} filters={FILTERS} filter={FILTERS.INTEREST} handleSelect={action('filter')} />
  ))
  .add('Filtered by Satisfaction', () => (
    <StackedBar identifier="Flavor" title="JavaScript Flavors" data={flavors} responses={RESPONSES} filters={FILTERS} filter={FILTERS.SATISFACTION} handleSelect={action('filter')} />
  ))
