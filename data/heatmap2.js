import { random, flattenDeep } from 'lodash'

const MAX = 6000
const SECTIONS = {
  Flavors: ['Plain Javascript', 'CoffeeScript', 'TypeScript', 'Elm', 'ClojureScript'],
  Frameworks: ['None', 'React', 'Angular', 'Angular 2', 'Ember', 'Vue', 'Backbone'],
}
const RESPONSES = [
  "I've never heard of it", "I've heard of it, and would like to learn it", "I've heard of it, and am not interested", "I've used it before, and would use it again", "I've used it before, and would not use it again"
]

const heatmap = Object.keys(SECTIONS).map((section1) => (
  SECTIONS[section1].map((option1) => (
    Object.keys(SECTIONS).map((section2) => (
      SECTIONS[section2].map((option2) => ({
        key1: { section: section1, option: option1 },
        key2: { section: section2, option: option2 },
        count: random(MAX),
      }))
    ))
  ))
))

export default flattenDeep(heatmap)
