module.exports = {
  title: 'Tandem',
  description: 'Tandem uses open-source tools like Drupal, Laravel, and Docker to transform your complex workflows and technical debt into elegant web applications.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
    ['link', {rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  plugins: {
    '@vuepress/blog': {
      directories: [
        {
          id: 'blog',
          dirname: 'blog',
          path: '/blog/',
          itemPermalink: '/blog/:year/:month/:day/:slug',
        },
        {
          id: 'careers',
          dirname: 'careers',
          path: '/careers/',
          itemPermalink: '/careers/:slug',
        },
        {
          id: 'case-study',
          dirname: 'case-study',
          path: '/case-study/',
          itemPermalink: '/case-study/:slug',
        },
        {
          id: 'service',
          dirname: 'service',
          path: '/service/',
          itemPermalink: '/service/:slug',
        },
        {
          id: 'staff',
          dirname: 'staff',
          path: '/staff/',
          itemPermalink: '/staff/:slug',
        },
      ],
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/',
          frontmatter: {title: 'Tags'},
          pagination: {
            lengthPerPage: 25,
          },
        },
      ],
      sitemap: {
        hostname: 'https://thinktandem.io',
      },
    },
    'vuepress-plugin-frontmatters-feed': {
      canonical_base: 'https://thinktandem.io',
      posts_directories: ['/blog/'],
      feed_options: {
        favicon: 'https://thinktandem.io/favicon.png',
        image: 'https://lando.dev/images/logo-pink-small.png',
      },
    },
    '@vuepress/google-analytics': {
      ga: 'UA-XXXXXXX',
    },
    'autometa': {
      site: {
        name: 'Tandem',
        twitter: 'ThinkTandem',
      },
      canonical_base: 'https://thinktandem.io',
    },
    'robots': {
      host: 'https://thinktandem.io',
      disallowAll: true,
      sitemap: '/sitemap.xml',
    },
  },
  theme: '@vuepress/theme-blog',
  themeConfig: {
    logo: '/images/logo-pink-small.png',
    docsDir: 'site',
    docsBranch: 'master',
    search: false,
    editLinks: false,
    nav: [
      {
        text: 'Industry Test',
        link: '/industry/healthcare/',
      },
      {
        text: 'Technology Test',
        link: '/technology/drupal/',
      },
    ],
  },
};
