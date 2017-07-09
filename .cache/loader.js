"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _findPage = require("./find-page");

var _findPage2 = _interopRequireDefault(_findPage);

var _emitter = require("./emitter");

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findPage = void 0;

var syncRequires = {};
var asyncRequires = {};
var pathScriptsCache = {};
var resourceStrCache = {};
var resourceCache = {};
var pages = [];
// Note we're not actively using the path data atm. There
// could be future optimizations however around trying to ensure
// we load all resources for likely-to-be-visited paths.
var pathArray = [];
var pathCount = {};
var resourcesArray = [];
var resourcesCount = {};
var preferDefault = function preferDefault(m) {
  return m && m.default || m;
};
var prefetcher = void 0;
var inInitialRender = true;

// Prefetcher logic
if (process.env.NODE_ENV === "production") {
  prefetcher = require("./prefetcher")({
    getNextQueuedResources: function getNextQueuedResources() {
      return resourcesArray.slice(-1)[0];
    },
    createResourceDownload: function createResourceDownload(resourceName) {
      fetchResource(resourceName, function () {
        resourcesArray = resourcesArray.filter(function (r) {
          return r !== resourceName;
        });
        prefetcher.onResourcedFinished(resourceName);
      });
    }
  });
  _emitter2.default.on("onPreLoadPageResources", function (e) {
    prefetcher.onPreLoadPageResources(e);
  });
  _emitter2.default.on("onPostLoadPageResources", function (e) {
    prefetcher.onPostLoadPageResources(e);
  });
}

var sortResourcesByCount = function sortResourcesByCount(a, b) {
  if (resourcesCount[a] > resourcesCount[b]) {
    return 1;
  } else if (resourcesCount[a] < resourcesCount[b]) {
    return -1;
  } else {
    return 0;
  }
};

var sortPagesByCount = function sortPagesByCount(a, b) {
  if (pathCount[a] > pathCount[b]) {
    return 1;
  } else if (pathCount[a] < pathCount[b]) {
    return -1;
  } else {
    return 0;
  }
};

var fetchResource = function fetchResource(resourceName) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (resourceStrCache[resourceName]) {
    process.nextTick(function () {
      cb(null, resourceStrCache[resourceName]);
    });
  } else {
    // Find resource
    var resourceFunction = resourceName.slice(0, 6) === "page-c" ? asyncRequires.components[resourceName] : asyncRequires.json[resourceName];

    // Download the resource
    resourceFunction(function (err, executeChunk) {
      resourceStrCache[resourceName] = executeChunk;
      cb(err, executeChunk);
    });
  }
};

var getResourceModule = function getResourceModule(resourceName, cb) {
  if (resourceCache[resourceName]) {
    process.nextTick(function () {
      cb(null, resourceCache[resourceName]);
    });
  } else {
    fetchResource(resourceName, function (err, executeChunk) {
      if (err) {
        cb(err);
      } else {
        var _module = preferDefault(executeChunk());
        resourceCache[resourceName] = _module;
        cb(err, _module);
      }
    });
  }
};

var mountOrder = 1;
var queue = {
  empty: function empty() {
    pathArray = [];
    pathCount = {};
    resourcesCount = {};
    resourcesArray = [];
    pages = [];
  },
  addPagesArray: function addPagesArray(newPages) {
    pages = newPages;
    var pathPrefix = "";
    if (typeof __PREFIX_PATHS__ !== "undefined") {
      pathPrefix = __PATH_PREFIX__;
    }
    findPage = (0, _findPage2.default)(newPages, pathPrefix);
  },
  addDevRequires: function addDevRequires(devRequires) {
    syncRequires = devRequires;
  },
  addProdRequires: function addProdRequires(prodRequires) {
    asyncRequires = prodRequires;
  },
  dequeue: function dequeue(path) {
    return pathArray.pop();
  },
  enqueue: function enqueue(path) {
    // Check page exists.
    if (!pages.some(function (p) {
      return p.path === path;
    })) {
      return false;
    }

    var mountOrderBoost = 1 / mountOrder;
    mountOrder += 1;
    // console.log(
    // `enqueue "${path}", mountOrder: "${mountOrder}, mountOrderBoost: ${mountOrderBoost}`
    // )

    // Add to path counts.
    if (!pathCount[path]) {
      pathCount[path] = 1;
    } else {
      pathCount[path] += 1;
    }

    // Add path to queue.
    if (!queue.has(path)) {
      pathArray.unshift(path);
    }

    // Sort pages by pathCount
    pathArray.sort(sortPagesByCount

    // Add resources to queue.
    );var page = findPage(path);
    if (page.jsonName) {
      if (!resourcesCount[page.jsonName]) {
        resourcesCount[page.jsonName] = 1 + mountOrderBoost;
      } else {
        resourcesCount[page.jsonName] += 1 + mountOrderBoost;
      }

      // Before adding, checking that the JSON resource isn't either
      // already queued or been downloading.
      if (resourcesArray.indexOf(page.jsonName) === -1 && !resourceStrCache[page.jsonName]) {
        resourcesArray.unshift(page.jsonName);
      }
    }
    if (page.componentChunkName) {
      if (!resourcesCount[page.componentChunkName]) {
        resourcesCount[page.componentChunkName] = 1 + mountOrderBoost;
      } else {
        resourcesCount[page.componentChunkName] += 1 + mountOrderBoost;
      }

      // Before adding, checking that the component resource isn't either
      // already queued or been downloading.
      if (resourcesArray.indexOf(page.componentChunkName) === -1 && !resourceStrCache[page.jsonName]) {
        resourcesArray.unshift(page.componentChunkName);
      }
    }

    // Sort resources by resourcesCount.
    resourcesArray.sort(sortResourcesByCount);
    if (process.env.NODE_ENV === "production") {
      prefetcher.onNewResourcesAdded();
    }

    return true;
  },
  getResources: function getResources() {
    return {
      resourcesArray: resourcesArray,
      resourcesCount: resourcesCount
    };
  },
  getPages: function getPages() {
    return {
      pathArray: pathArray,
      pathCount: pathCount
    };
  },
  getPage: function getPage(pathname) {
    return findPage(pathname);
  },
  has: function has(path) {
    return pathArray.some(function (p) {
      return p === path;
    });
  },
  getResourcesForPathname: function getResourcesForPathname(path) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (inInitialRender && navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated") {
      // If we're loading from a service worker (it's already activated on
      // this initial render) and we can't find a page, there's a good chance
      // we're on a new page that this (now old) service worker doesn't know
      // about so we'll unregister it and reload.
      if (!findPage(path)) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(registrations), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var registration = _step.value;

              registration.unregister();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          window.location.reload();
        });
      }
    }
    inInitialRender = false;
    // In development we know the code is loaded already
    // so we just return with it immediately.
    if (process.env.NODE_ENV !== "production") {
      var page = findPage(path);
      if (!page) return;

      var pageResources = {
        component: syncRequires.components[page.componentChunkName],
        json: syncRequires.json[page.jsonName]
      };
      cb(pageResources);
      return pageResources;
      // Production code path
    } else {
      var _page = findPage(path);

      if (!_page) {
        console.log("A page wasn't found for \"" + path + "\"");
        return;
      }

      // Use the path from the page so the pathScriptsCache uses
      // the normalized path.
      path = _page.path;

      // Check if it's in the cache already.
      if (pathScriptsCache[path]) {
        process.nextTick(function () {
          cb(pathScriptsCache[path]);
          _emitter2.default.emit("onPostLoadPageResources", {
            page: _page,
            pageResources: pathScriptsCache[path]
          });
        });
        return pathScriptsCache[path];
      }

      _emitter2.default.emit("onPreLoadPageResources", { path: path }
      // Nope, we need to load resource(s)
      );var component = void 0;
      var json = void 0;
      // Load the component/json and parallal and call this
      // function when they're done loading. When both are loaded,
      // we move on.
      var done = function done() {
        if (component && json) {
          pathScriptsCache[path] = { component: component, json: json };
          var _pageResources = { component: component, json: json };
          cb(_pageResources);
          _emitter2.default.emit("onPostLoadPageResources", {
            page: _page,
            pageResources: _pageResources
          });
        }
      };
      getResourceModule(_page.componentChunkName, function (err, c) {
        if (err) {
          console.log("Loading the component for " + _page.path + " failed");
        }
        component = c;
        done();
      });
      getResourceModule(_page.jsonName, function (err, j) {
        if (err) {
          console.log("Loading the JSON for " + _page.path + " failed");
        }
        json = j;
        done();
      });

      return undefined;
    }
  },
  peek: function peek(path) {
    return pathArray.slice(-1)[0];
  },
  length: function length() {
    return pathArray.length;
  },
  indexOf: function indexOf(path) {
    return pathArray.length - pathArray.indexOf(path) - 1;
  }
};

module.exports = queue;
//# sourceMappingURL=loader.js.map