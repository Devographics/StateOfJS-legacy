"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loader = require("./loader");

var _loader2 = _interopRequireDefault(_loader);

var _emitter = require("./emitter");

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Pass pathname in as prop.
// component will try fetching resources. If they exist,
// will just render, else will render null.
var ComponentRenderer = function (_React$Component) {
  (0, _inherits3.default)(ComponentRenderer, _React$Component);

  function ComponentRenderer(props) {
    (0, _classCallCheck3.default)(this, ComponentRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentRenderer.__proto__ || (0, _getPrototypeOf2.default)(ComponentRenderer)).call(this));

    _this.state = {
      location: props.location,
      pageResources: _loader2.default.getResourcesForPathname(props.location.pathname)
    };
    return _this;
  }

  (0, _createClass3.default)(ComponentRenderer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.state.location.pathname !== nextProps.location.pathname) {
        var pageResources = _loader2.default.getResourcesForPathname(nextProps.location.pathname);
        if (!pageResources) {
          // Page resources won't be set in cases where the browser back button
          // or forward button is pushed as we can't wait as normal for resources
          // to load before changing the page.
          _loader2.default.getResourcesForPathname(nextProps.location.pathname, function (pageResources) {
            _this2.setState({
              location: nextProps.location,
              pageResources: pageResources
            });
          });
        } else {
          this.setState({
            location: nextProps.location,
            pageResources: pageResources
          });
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      // Listen to events so when our page gets updated, we can transition.
      // This is only useful on delayed transitions as the page will get rendered
      // without the necessary page resources and then re-render once those come in.
      _emitter2.default.on("onPostLoadPageResources", function (e) {
        if (e.page.path === _loader2.default.getPage(_this3.state.location.pathname).path) {
          _this3.setState({ pageResources: e.pageResources });
        }
      });
    }

    // Check if the component or json have changed

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.pageResources.component !== nextState.pageResources.component) {
        return true;
      }
      if (this.state.pageResources.json !== nextState.pageResources.json) {
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.pageResources) {
        return (0, _react.createElement)(this.state.pageResources.component, (0, _extends3.default)({}, this.props, this.state.pageResources.json));
      } else {
        return null;
      }
    }
  }]);
  return ComponentRenderer;
}(_react2.default.Component);

exports.default = ComponentRenderer;
//# sourceMappingURL=component-renderer.js.map