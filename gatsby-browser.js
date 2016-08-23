import ReactGA from 'react-ga';
ReactGA.initialize('UA-83022212-1');

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.pathname);
};
