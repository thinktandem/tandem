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
          title: 'Home',
          id: 'posts',
          dirname: 'posts',
          path: '/',
        },
      ],
      feed: {
        canonical_base: 'https://thinktandem.io',
        feed_options: {
          favicon: 'https://thinktandem.io/favicon.png',
          image: 'https://lando.dev/images/logo-pink-small.png',
        },
      },
      frontmatters: [
        {
          id: 'tag',
          keys: ['tag', 'tags'],
          path: '/tag/',
          frontmatter: {title: 'Tag'},
          pagination: {
            lengthPerPage: 25,
          },
        },
      ],
      sitemap: {
        hostname: 'https://thinktandem.io',
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
    // nav: [
    //   {
    //     text: 'Case Studies',
    //     link: '/tag/case-study/',
    //   },
    // ],
  },
};
