/*
 * Use this file to augment vuepress with other vue-y things
 */

import VueJsonLD from 'vue-jsonld';

export default ({ Vue, options, router, siteData, isServer }) => { // eslint-disable-line
  // Load in JSONLD
  Vue.use(VueJsonLD);

  // We have to do this non-import to obey eslint and also
  // https://github.com/alvarotrigo/vue-fullpage.js/issues/126
  const VueFullpage = require('vue-fullpage.js').default;
  Vue.use(VueFullpage);
};
