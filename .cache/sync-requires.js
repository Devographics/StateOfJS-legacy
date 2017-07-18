// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---src-pages-results-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/Results.js")),
  "page-component---src-pages-svg-container-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/SVGContainer.js")),
  "page-component---src-pages-index-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/index.js")),
  "page-component---src-pages-2016-api-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/API.js")),
  "page-component---src-pages-2016-build-tools-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/BuildTools.js")),
  "page-component---src-pages-2016-css-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/CSS.js")),
  "page-component---src-pages-2016-conclusion-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Conclusion.js")),
  "page-component---src-pages-2016-features-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Features.js")),
  "page-component---src-pages-2016-flavors-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Flavors.js")),
  "page-component---src-pages-2016-frontend-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Frontend.js")),
  "page-component---src-pages-2016-full-stack-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/FullStack.js")),
  "page-component---src-pages-2016-introduction-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Introduction.js")),
  "page-component---src-pages-2016-mobile-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Mobile.js")),
  "page-component---src-pages-2016-opinions-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Opinions.js")),
  "page-component---src-pages-2016-profiles-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Profiles.js")),
  "page-component---src-pages-2016-state-management-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/StateManagement.js")),
  "page-component---src-pages-2016-testing-js": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/pages/2016/Testing.js"))
}

exports.json = {
  "results.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/results.json"),
  "svg-container.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/svg-container.json"),
  "index.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/index.json"),
  "2016-api.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-api.json"),
  "2016-build-tools.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-build-tools.json"),
  "2016-css.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-css.json"),
  "2016-conclusion.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-conclusion.json"),
  "2016-features.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-features.json"),
  "2016-flavors.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-flavors.json"),
  "2016-frontend.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-frontend.json"),
  "2016-full-stack.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-full-stack.json"),
  "2016-introduction.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-introduction.json"),
  "2016-mobile.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-mobile.json"),
  "2016-opinions.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-opinions.json"),
  "2016-profiles.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-profiles.json"),
  "2016-state-management.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-state-management.json"),
  "2016-testing.json": require("/Users/sachagreif/Dev/StateOfJS/.cache/json/2016-testing.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/sachagreif/Dev/StateOfJS/src/layouts/index"))
}