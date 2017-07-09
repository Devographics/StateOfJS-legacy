"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _lodash = require("lodash");

var _apiRunnerSsr = require("./api-runner-ssr");

var _apiRunnerSsr2 = _interopRequireDefault(_apiRunnerSsr);

var _pages = require("./pages.json");

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTML = void 0;
try {
  HTML = require("../src/html");
} catch (e) {
  HTML = require("./default-html");
}

module.exports = function (locals, callback) {
  // const apiRunner = require(`${directory}/.cache/api-runner-ssr`)
  var headComponents = [];
  var preBodyComponents = [];
  var postBodyComponents = [];
  var bodyProps = {};
  var htmlStr = void 0;

  var setHeadComponents = function setHeadComponents(components) {
    headComponents = headComponents.concat(components);
  };

  var setPreBodyComponents = function setPreBodyComponents(components) {
    preBodyComponents = preBodyComponents.concat(components);
  };

  var setPostBodyComponents = function setPostBodyComponents(components) {
    postBodyComponents = postBodyComponents.concat(components);
  };

  var setBodyProps = function setBodyProps(props) {
    bodyProps = (0, _lodash.merge)({}, bodyProps, props);
  };

  (0, _apiRunnerSsr2.default)("onRenderBody", {
    setHeadComponents: setHeadComponents,
    setPreBodyComponents: setPreBodyComponents,
    setPostBodyComponents: setPostBodyComponents,
    setBodyProps: setBodyProps
  });

  var htmlElement = _react2.default.createElement(HTML, (0, _extends3.default)({}, bodyProps, {
    body: "",
    headComponents: headComponents,
    preBodyComponents: preBodyComponents,
    postBodyComponents: postBodyComponents.concat([_react2.default.createElement("script", { key: "commons", src: "/commons.js" })])
  }));
  htmlStr = (0, _server.renderToStaticMarkup)(htmlElement);
  htmlStr = "<!DOCTYPE html>\n" + htmlStr;

  callback(null, htmlStr);
};
//# sourceMappingURL=develop-static-entry.js.map