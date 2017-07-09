"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _apiRunnerSsr = require("./api-runner-ssr");

var _apiRunnerSsr2 = _interopRequireDefault(_apiRunnerSsr);

var _pages = require("./pages.json");

var _pages2 = _interopRequireDefault(_pages);

var _syncRequires = require("./sync-requires");

var _syncRequires2 = _interopRequireDefault(_syncRequires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Html = void 0;
try {
  Html = require("../src/html");
} catch (e) {
  Html = require("./default-html");
}

var pathChunkName = function pathChunkName(path) {
  var name = path === "/" ? "index" : (0, _lodash.kebabCase)(path);
  return "path---" + name;
};

var $ = _react2.default.createElement;

// Use default layout if one isn't set.
var layout = void 0;
if (_syncRequires2.default.layouts.index) {
  layout = _syncRequires2.default.layouts.index;
} else {
  layout = function layout(props) {
    return _react2.default.createElement(
      "div",
      null,
      props.children()
    );
  };
}

module.exports = function (locals, callback) {
  var pathPrefix = "/";
  if (__PREFIX_PATHS__) {
    pathPrefix = __PATH_PREFIX__ + "/";
  }

  var bodyHTML = "";
  var headComponents = [];
  var preBodyComponents = [];
  var postBodyComponents = [];
  var bodyProps = {};

  var replaceBodyHTMLString = function replaceBodyHTMLString(body) {
    bodyHTML = body;
  };

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

  var bodyComponent = $(_reactRouterDom.StaticRouter, {
    location: {
      pathname: locals.path
    },
    context: {}
  }, $((0, _reactRouterDom.withRouter)(layout), {
    children: function children(layoutProps) {
      return $(_reactRouterDom.Route, {
        children: function children(routeProps) {
          var props = layoutProps ? layoutProps : routeProps;
          var page = _pages2.default.find(function (page) {
            return page.path === props.location.pathname;
          });
          return $(_syncRequires2.default.components[page.componentChunkName], (0, _extends3.default)({}, props, _syncRequires2.default.json[page.jsonName]));
        }
      });
    }
  })

  // Let the site or plugin render the page component.
  );(0, _apiRunnerSsr2.default)("replaceRenderer", {
    bodyComponent: bodyComponent,
    replaceBodyHTMLString: replaceBodyHTMLString,
    setHeadComponents: setHeadComponents,
    setPreBodyComponents: setPreBodyComponents,
    setPostBodyComponents: setPostBodyComponents,
    setBodyProps: setBodyProps
  }

  // If no one stepped up, we'll handle it.
  );if (!bodyHTML) {
    bodyHTML = (0, _server.renderToString)(bodyComponent);
  }

  (0, _apiRunnerSsr2.default)("onRenderBody", {
    setHeadComponents: setHeadComponents,
    setPreBodyComponents: setPreBodyComponents,
    setPostBodyComponents: setPostBodyComponents,
    setBodyProps: setBodyProps,
    pathname: locals.path
  }

  // Add the chunk-manifest as a head component.
  );var chunkManifest = require("!raw!../public/chunk-manifest.json");

  headComponents.unshift(_react2.default.createElement("script", {
    id: "webpack-manifest",
    key: "webpack-manifest",
    dangerouslySetInnerHTML: {
      __html: "\n            //<![CDATA[\n            window.webpackManifest = " + chunkManifest + "\n            //]]>\n            "
    }
  }));

  var stats = void 0;
  try {
    stats = require("../public/stats.json");
  } catch (e) {}
  // ignore


  // Create paths to scripts
  var scripts = ["commons", "app", "layout-component---index", pathChunkName(locals.path), _pages2.default.find(function (page) {
    return page.path === locals.path;
  }).componentChunkName].map(function (s) {
    var fetchKey = "assetsByChunkName[" + s + "]";

    var fetchedScript = (0, _lodash.get)(stats, fetchKey);

    if (!fetchedScript) {
      return null;
    }

    // If sourcemaps are enabled, then the entry will be an array with
    // the script name as the first entry.
    fetchedScript = (0, _lodash.isArray)(fetchedScript) ? fetchedScript[0] : fetchedScript;
    var prefixedScript = "" + pathPrefix + fetchedScript;

    // Make sure we found a component.
    if (prefixedScript === "/") {
      return null;
    }

    return prefixedScript;
  }).filter(function (s) {
    return (0, _lodash.isString)(s);
  });

  scripts.forEach(function (script) {
    // Add preload <link>s for scripts.
    headComponents.unshift(_react2.default.createElement("link", { rel: "preload", key: script, href: script, as: "script" }));
  }

  // Add script loader for page scripts to the head.
  // Taken from https://www.html5rocks.com/en/tutorials/speed/script-loading/
  );var scriptsString = scripts.map(function (s) {
    return "\"" + s + "\"";
  }).join(",");
  headComponents.push(_react2.default.createElement("script", {
    key: "script-loader",
    dangerouslySetInnerHTML: {
      __html: "\n  !function(e,t,r){function n(){for(;d[0]&&\"loaded\"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o=\"onreadystatechange\",f=\"readyState\";s=r.shift();)a=e.createElement(t),\"async\"in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write(\"<\"+t+' src=\"'+s+'\" defer></'+t+\">\"),a.src=s}(document,\"script\",[\n  " + scriptsString + "\n])\n  "
    }
  }));

  var html = "<!DOCTYPE html>\n " + (0, _server.renderToStaticMarkup)(_react2.default.createElement(Html, (0, _extends3.default)({}, bodyProps, {
    headComponents: headComponents,
    preBodyComponents: preBodyComponents,
    postBodyComponents: postBodyComponents,
    body: bodyHTML,
    path: locals.path
  })));

  callback(null, html);
};
//# sourceMappingURL=static-entry.js.map