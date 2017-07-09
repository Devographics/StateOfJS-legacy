"use strict";

var _reactRouterDom = require("react-router-dom");

var pageCache = {}; // TODO add tests especially for handling prefixed links.


module.exports = function (pages) {
  var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return function (pathname) {
    // Remove the pathPrefix from the pathname.
    var trimmedPathname = pathname.slice(pathPrefix.length

    // Remove any hashfragment
    );if (trimmedPathname.split("#").length > 1) {
      trimmedPathname = trimmedPathname.split("#").slice(0, -1).join("");
    }

    if (pageCache[trimmedPathname]) {
      return pageCache[trimmedPathname];
    }

    var foundPage = void 0;
    // Array.prototype.find is not supported in IE so we use this somewhat odd
    // work around.
    pages.some(function (page) {
      if (page.matchPath) {
        // Try both the path and matchPath
        if ((0, _reactRouterDom.matchPath)(trimmedPathname, { path: page.path }) || (0, _reactRouterDom.matchPath)(trimmedPathname, {
          path: page.matchPath
        })) {
          foundPage = page;
          pageCache[trimmedPathname] = page;
          return true;
        }
      } else {
        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
          path: page.path,
          exact: true
        })) {
          foundPage = page;
          pageCache[trimmedPathname] = page;
          return true;
        }
      }

      return false;
    });

    return foundPage;
  };
};
//# sourceMappingURL=find-page.js.map