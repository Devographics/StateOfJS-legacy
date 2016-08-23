console.log('foo')
exports.onRouteChange = (state, page, pages) => {
  console.log(state, page, pages)
  if (ga) {
    ga('send', 'pageview', {
      page: state.path
    }
  }
};
