import ReactGA from 'react-ga'

const trackShare = (platform, trackingId) => () => {
    ReactGA.event({
        category: platform,
        action: trackingId ? `${trackingId} share` : `site share`
    })
}

export default trackShare
