"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _apiRunnerBrowser = require("./api-runner-browser");

var _apiRunnerBrowser2 = _interopRequireDefault(_apiRunnerBrowser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require("react-router-dom");

var _reactRouterScroll = require("react-router-scroll");

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _emitter = require("./emitter");

var _emitter2 = _interopRequireDefault(_emitter);

var _pages = require("./pages.json");

var _pages2 = _interopRequireDefault(_pages);

var _componentRenderer = require("./component-renderer");

var _componentRenderer2 = _interopRequireDefault(_componentRenderer);

var _asyncRequires = require("./async-requires");

var _asyncRequires2 = _interopRequireDefault(_asyncRequires);

var _loader = require("./loader");

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.___emitter = _emitter2.default;
// emitter.on(`*`, (type, e) => console.log(`emitter`, type, e))

// import invariant from "invariant"

_loader2.default.addPagesArray(_pages2.default);
_loader2.default.addProdRequires(_asyncRequires2.default);
window.asyncRequires = _asyncRequires2.default;

window.___loader = _loader2.default;

window.matchPath = _reactRouterDom.matchPath;

// Let the site/plugins run code very early.
(0, _apiRunnerBrowser2.default)("onClientEntry"

// Let plugins register a service worker. The plugin just needs
// to return true.
);if ((0, _apiRunnerBrowser2.default)("registerServiceWorker").length > 0) {
  require("./register-service-worker");
}

var navigateTo = function navigateTo(pathname) {
  // If we're already at this path, do nothing.
  if (window.location.pathname === pathname) {
    return;
  }

  // Listen to loading events. If page resources load before
  // a second, navigate immediately.
  function eventHandler(e) {
    if (e.page.path === _loader2.default.getPage(pathname).path) {
      _emitter2.default.off("onPostLoadPageResources", eventHandler);
      clearTimeout(timeoutId);
      window.___history.push(pathname);
    }
  }

  // Start a timer to wait for a second before transitioning and showing a
  // loader in case resources aren't around yet.
  var timeoutId = setTimeout(function () {
    _emitter2.default.off("onPostLoadPageResources", eventHandler);
    _emitter2.default.emit("onDelayedLoadPageResources", { pathname: pathname });
    window.___history.push(pathname);
  }, 1000);

  if (_loader2.default.getResourcesForPathname(pathname)) {
    // The resources are already loaded so off we go.
    clearTimeout(timeoutId);
    window.___history.push(pathname);
  } else {
    // They're not loaded yet so let's add a listener for when
    // they finish loading.
    _emitter2.default.on("onPostLoadPageResources", eventHandler);
  }
};

// window.___loadScriptsForPath = loadScriptsForPath
window.___navigateTo = navigateTo;

var history = (0, _createBrowserHistory2.default

// Call onRouteUpdate on the initial page load.
)();(0, _apiRunnerBrowser2.default)("onRouteUpdate", {
  location: history.location,
  action: history.action
});

function attachToHistory(history) {
  if (!window.___history) {
    window.___history = history;

    history.listen(function (location, action) {
      (0, _apiRunnerBrowser2.default)("onRouteUpdate", { location: location, action: action });
    });
  }
}

function shouldUpdateScroll(prevRouterProps, _ref) {
  var pathname = _ref.location.pathname;

  var results = (0, _apiRunnerBrowser2.default)("shouldUpdateScroll", {
    prevRouterProps: prevRouterProps,
    pathname: pathname
  });
  if (results.length > 0) {
    return results[0];
  }

  if (prevRouterProps) {
    var oldPathname = prevRouterProps.location.pathname;

    if (oldPathname === pathname) {
      return false;
    }
  }
  return true;
}

var AltRouter = (0, _apiRunnerBrowser2.default)("replaceRouterComponent", { history: history })[0];
var DefaultRouter = function DefaultRouter(_ref2) {
  var children = _ref2.children;
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    { history: history },
    children
  );
};

var loadLayout = function loadLayout(cb) {
  if (_asyncRequires2.default.layouts["index"]) {
    _asyncRequires2.default.layouts["index"](function (err, executeChunk) {
      var module = executeChunk();
      cb(module);
    });
  } else {
    cb(function (props) {
      return _react2.default.createElement(
        "div",
        null,
        props.children()
      );
    });
  }
};

loadLayout(function (layout) {
  _loader2.default.getResourcesForPathname(window.location.pathname, function () {
    var Root = function Root() {
      return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_reactRouterScroll.ScrollContext, { shouldUpdateScroll: shouldUpdateScroll }, (0, _react.createElement)((0, _reactRouterDom.withRouter)(layout), {
        children: function children(layoutProps) {
          return (0, _react.createElement)(_reactRouterDom.Route, {
            render: function render(routeProps) {
              attachToHistory(routeProps.history);
              var props = layoutProps ? layoutProps : routeProps;
              if (_loader2.default.getPage(props.location.pathname)) {
                return (0, _react.createElement)(_componentRenderer2.default, (0, _extends3.default)({}, props));
              } else {
                return (0, _react.createElement)(_componentRenderer2.default, {
                  location: { pathname: "/404.html" }
                });
              }
            }
          });
        }
      })));
    };

    var NewRoot = (0, _apiRunnerBrowser2.default)("wrapRootComponent", { Root: Root }, Root)[0];
    _reactDom2.default.render(_react2.default.createElement(NewRoot, null), typeof window !== "undefined" ? document.getElementById("___gatsby") : void 0);
  });
});
//# sourceMappingURL=production-app.js.map