import PropTypes from 'prop-types'

export const GeoMapPropTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['Feature']).isRequired,
            properties: PropTypes.object,
            geometry: PropTypes.object.isRequired
        })
    ).isRequired,

    projectionType: PropTypes.oneOf(['mercator']).isRequired,
    projectionScale: PropTypes.number.isRequired,
    projectionTranslation: PropTypes.arrayOf(PropTypes.number).isRequired,
    pathHelper: PropTypes.func.isRequired,

    fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getFillColor: PropTypes.func.isRequired,
    borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    getBorderWidth: PropTypes.func.isRequired,
    borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getBorderColor: PropTypes.func.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.func,

    layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['features']), PropTypes.func]))
        .isRequired
}

export const GeoMapDefaultProps = {
    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    fillColor: '#dddddd',
    borderWidth: 0,
    borderColor: '#000000',

    isInteractive: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseMove: () => {},
    onClick: () => {},

    layers: ['features'],

    pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
}
