const ReactGA = require('react-ga')
ReactGA.initialize('UA-83022212-4')

exports.onRouteUpdate = ({ location }) => {
    ReactGA.pageview(location.pathname)
}
