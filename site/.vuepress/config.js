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
          id: 'casestudies',
          dirname: 'case-studies',
          path: '/case-studies/',
          itemPermalink: '/case-studies/:slug',
        },
      ],
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/tag/',
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
        image: 'https://thinktandem.io/images/hero-tandem-pink.png',
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
    logo: '/images/logo-tandem-svg.svg',
    docsDir: 'site',
    docsBranch: 'master',
    search: false,
    editLinks: false,
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Work',
        link: '/work/',
      },
      {
        text: 'About',
        link: '/about/',
      },
      {
        text: 'Blog',
        link: '/blog/',
      },
      {
        text: 'Contact',
        link: '/contact/',
      },
    ],
  },
};
