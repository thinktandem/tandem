/*
 * Use this file to augment vuepress with other vue-y things
 */

import VueJsonLD from 'vue-jsonld';

export default ({ Vue, options, router, siteData }) => { // eslint-disable-line
  // Load in JSONLD
  Vue.use(VueJsonLD);
  // @NOTE: no idea why we need to do below
  // https://github.com/alvarotrigo/vue-fullpage.js/issues/126
  import('vue-fullpage.js').then(module => {
    Vue.use(module.default)
  });
};
