const SECTIONS = {
  FLAVORS: 'Flavors',
  FRAMEWORKS: 'Frameworks',
  TESTING: 'Testing',
  MOBILE: 'Mobile',
}

const FILTERS = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const RESPONSES = {
  neverHeard: {
    string: "I've never heard of it",
    onColor: '#e8e8e8',
    offColor: '#e8e8e8',
    filters: [FILTERS.ALL]
  },
  notInterested: {
    string: "I've heard of it, and am not interested",
    onColor: '#b3d8da',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  wantToLearn: {
    string: "I've heard of it, and would like to learn it",
    onColor: '#5ec6cc',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  notAgain: {
    string: "I've used it before, and would not use it again",
    onColor: '#e0a4bc',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  },
  useAgain: {
    string: "I've used it before, and would use it again",
    onColor: '#ed387a',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  }
}

export { SECTIONS, FILTERS, RESPONSES }
