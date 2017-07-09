"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesStr = void 0;
if (process.env.NODE_ENV === "production") {
  try {
    stylesStr = require("!raw-loader!../public/styles.css");
  } catch (e) {
    console.log(e);
  }
}

module.exports = function (_React$Component) {
  (0, _inherits3.default)(HTML, _React$Component);

  function HTML() {
    (0, _classCallCheck3.default)(this, HTML);
    return (0, _possibleConstructorReturn3.default)(this, (HTML.__proto__ || (0, _getPrototypeOf2.default)(HTML)).apply(this, arguments));
  }

  (0, _createClass3.default)(HTML, [{
    key: "render",
    value: function render() {
      var css = void 0;
      if (process.env.NODE_ENV === "production") {
        css = _react2.default.createElement("style", {
          id: "gatsby-inlined-css",
          dangerouslySetInnerHTML: { __html: stylesStr }
        });
      }
      return _react2.default.createElement(
        "html",
        null,
        _react2.default.createElement(
          "head",
          null,
          _react2.default.createElement("meta", { charSet: "utf-8" }),
          _react2.default.createElement("meta", { httpEquiv: "x-ua-compatible", content: "ie=edge" }),
          _react2.default.createElement("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1, shrink-to-fit=no"
          }),
          _react2.default.createElement(
            "title",
            null,
            "Gatsby.js"
          ),
          this.props.headComponents,
          css
        ),
        _react2.default.createElement(
          "body",
          null,
          this.props.preBodyComponents,
          _react2.default.createElement("div", {
            key: "body",
            id: "___gatsby",
            dangerouslySetInnerHTML: { __html: this.props.body }
          }),
          this.props.postBodyComponents
        )
      );
    }
  }]);
  return HTML;
}(_react2.default.Component);
//# sourceMappingURL=default-html.js.map