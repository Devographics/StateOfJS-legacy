"use strict";

module.exports = function (_ref) {
  var getNextQueuedResources = _ref.getNextQueuedResources,
      createResourceDownload = _ref.createResourceDownload;

  var pagesLoading = [];
  var resourcesDownloading = [];

  // Do things
  var startResourceDownloading = function startResourceDownloading() {
    var nextResource = getNextQueuedResources();
    if (nextResource) {
      resourcesDownloading.push(nextResource);
      createResourceDownload(nextResource);
    }
  };

  var reducer = function reducer(action) {
    switch (action.type) {
      case "RESOURCE_FINISHED":
        resourcesDownloading = resourcesDownloading.filter(function (r) {
          return r !== action.payload;
        });
        break;
      case "ON_PRE_LOAD_PAGE_RESOURCES":
        pagesLoading.push(action.payload.path);
        break;
      case "ON_POST_LOAD_PAGE_RESOURCES":
        pagesLoading = pagesLoading.filter(function (p) {
          return p !== action.payload.page.path;
        });
        break;
      case "ON_NEW_RESOURCES_ADDED":
        break;
    }

    // Take actions.
    // Wait for event loop queue to finish.
    setTimeout(function () {
      if (resourcesDownloading.length === 0 && pagesLoading.length === 0) {
        // Start another resource downloading.
        startResourceDownloading();
      }
    }, 0);
  };

  return {
    onResourcedFinished: function onResourcedFinished(event) {
      // Tell prefetcher that the resource finished downloading
      // so it can grab the next one.
      reducer({ type: "RESOURCE_FINISHED", payload: event });
    },
    onPreLoadPageResources: function onPreLoadPageResources(event) {
      // Tell prefetcher a page load has started so it should stop
      // loading anything new
      reducer({ type: "ON_PRE_LOAD_PAGE_RESOURCES", payload: event });
    },
    onPostLoadPageResources: function onPostLoadPageResources(event) {
      // Tell prefetcher a page load has finished so it should start
      // loading resources again.
      reducer({ type: "ON_POST_LOAD_PAGE_RESOURCES", payload: event });
    },
    onNewResourcesAdded: function onNewResourcesAdded() {
      // Tell prefetcher that more resources to be downloaded have
      // been added.
      reducer({ type: "ON_NEW_RESOURCES_ADDED" });
    },
    getState: function getState() {
      return { pagesLoading: pagesLoading, resourcesDownloading: resourcesDownloading };
    },
    empty: function empty() {
      pagesLoading = [];
      resourcesDownloading = [];
    }
  };
};
//# sourceMappingURL=prefetcher.js.map