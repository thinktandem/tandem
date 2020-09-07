/*
 * Use this file to augment vuepress with other vue-y things
 */

import VueJsonLD from 'vue-jsonld';

export default ({ Vue, options, router, siteData, isServer }) => { // eslint-disable-line
  // Load in JSONLD
  Vue.use(VueJsonLD);

  // We have to do this non-import to obey eslint and also
  // https://github.com/alvarotrigo/vue-fullpage.js/issues/126
  if (!isServer && window) {
    const VueFullpage = require('vue-fullpage.js').default;
    Vue.use(VueFullpage);
  }

  // Provide mechanisms for passing around global stylingz
  Vue.use({install: Vue => {
    const EventBus = new Vue();
    Vue.prototype.$themeListener = handler => EventBus.$on('update-theme', handler);
    Vue.prototype.$updateTheme = data => EventBus.$emit('update-theme', data);
  }});

  // Check whether route exists or not
  const hasRoute = (path, routes = []) => {
    return routes.some(route => {
      return route.path.toLowerCase() === path.toLowerCase();
    });
  };

  // Redirect non-existent routes to tag pages if they exist
  router.beforeEach((to, from, next) => {
    const {routes} = router.options;

    // If routes already exist then dont redirect
    if (hasRoute(to.path, routes)) next();
    else if (hasRoute(`${to.path}/`, routes)) next();
    else if (hasRoute(`${to.path}.html`, routes)) next();

    // Otherwise lets try to route to a tag if that exists
    else {
      if (hasRoute(`/tag${to.path}/`, routes)) next(`/tag${to.path}`);
      else next();
    }
  });
};
