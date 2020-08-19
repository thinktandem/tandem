module.exports = {
  extend: '@vuepress/theme-blog',
  plugins: [
    ['container', {
      type: 'big',
      defaultTitle: '',
    }],
    ['container', {
      type: 'caption',
      defaultTitle: '',
    }],
    ['container', {
      type: 'important',
      defaultTitle: '',
    }],
    ['container', {
      type: 'point',
      defaultTitle: 'Point.',
    }],
    ['container', {
      type: 'thumbnail',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-third',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-wrapper',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-full',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-half',
      defaultTitle: '',
    }],
  ],
};
