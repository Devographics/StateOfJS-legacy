import ReactGA from 'react-ga'
ReactGA.initialize('UA-83022212-1')

exports.onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname)
}
