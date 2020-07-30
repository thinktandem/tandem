/*
 * Use this file to augment vuepress with other vue-y things
 */

import VueJsonLD from 'vue-jsonld';

export default ({ Vue, options, router, siteData }) => { // eslint-disable-line
  Vue.use(VueJsonLD);
};
