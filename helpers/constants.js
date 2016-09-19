const FILTERS = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const RESPONSES = {
  neverHeard: {
    string: "Never heard of it",
    onColor: '#e8e8e8',
    offColor: '#e8e8e8',
    filters: [FILTERS.ALL]
  },
  notInterested: {
    string: "Heard of it, not interested",
    onColor: '#b3d8da',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  wantToLearn: {
    string: "Heard of it, would like to learn",
    onColor: '#5ec6cc',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  notAgain: {
    string: "Used it before, would not use again",
    onColor: '#e0a4bc',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  },
  useAgain: {
    string: "Used it before, would use again",
    onColor: '#ed387a',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  }
}

export { FILTERS, RESPONSES }
