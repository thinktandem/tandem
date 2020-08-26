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

  // Redirects tags to landing pages if they exist
  router.beforeEach((to, from, next) => {
    // If this is not movement to a tag then just continue
    if (!to.meta || to.meta.pid !== 'tags') next();

    // Otherwise either go to the tag or the landing page if its there
    else {
      const tag = to.meta.id;
      const landingPage = siteData.pages.find(page => {
        return page.id === 'pages' && page.frontmatter.replaceTag === tag;
      });
      if (landingPage) next(landingPage.path);
      else next();
    }
  });
};
