const FILTERS = {
  ALL: 'All',
  INTEREST: 'Interest',
  SATISFACTION: 'Satisfaction',
}

const RESPONSES = {
  neverHeard: {
    order: 1,
    string: "Never heard of it",
    onColor: '#D8D8D8',
    offColor: '#e8e8e8',
    filters: [FILTERS.ALL]
  },
  notInterested: {
    order: 2,
    string: "Heard of it, not interested",
    onColor: '#fffec7',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  wantToLearn: {
    order: 3,
    string: "Heard of it, would like to learn",
    onColor: '#fbf34c',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.INTEREST]
  },
  notAgain: {
    order: 4,
    string: "Used it before, would not use again",
    onColor: '#B4ADDC',
    offColor: '#dadada',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  },
  useAgain: {
    order: 5,
    string: "Used it before, would use again",
    onColor: '#9688E4',
    offColor: '#cecece',
    filters: [FILTERS.ALL, FILTERS.SATISFACTION]
  }
}

export { FILTERS, RESPONSES }
