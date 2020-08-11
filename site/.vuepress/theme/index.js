module.exports = {
  extend: '@vuepress/theme-blog',
  plugins: [
    ['container', {
      type: 'thumbnail',
      defaultTitle: '',
    }],
    ['container', {
      type: 'caption',
      defaultTitle: '',
    }],
    ['container', {
      type: 'quote',
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
    ['container', {
      type: 'col-third',
      defaultTitle: '',
    }],
  ],
};
