module.exports = {
  title: 'Tandem',
  description: 'Tandem uses open-source tools like Drupal, Laravel, and Docker to transform your complex workflows and technical debt into elegant web applications.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
    ['link', {rel: 'stylesheet', href: '/styles/overrides.css'}],
    ['link', {rel: 'stylesheet', href: '//unpkg.com/fullpage.js/dist/fullpage.min.css'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Poppins:wght@600;900&display=swap'}],
    ['script', {src: '//js.hs-scripts.com/6864374.js'}],
    ['script', {src: '/js/mautic-tracking.js'}],
  ],
  plugins: {
    '@vuepress/blog': {
      directories: [
        {
          id: 'blog',
          dirname: 'blog',
          itemPermalink: '/blog/:year/:month/:day/:slug',
          itemLayout: 'Post',
          layout: 'Blog',
          pagination: {
            lengthPerPage: 10,
          },
        },
        {
          id: 'work',
          dirname: 'work',
          itemPermalink: '/work/:slug',
          itemLayout: 'CaseStudy',
          layout: 'Work',
          pagination: {
            lengthPerPage: 5,
          },
        },
        {
          id: 'pages',
          dirname: 'pages',
          path: '/about/',
          itemPermalink: '/:slug',
          itemLayout: 'Page',
          layout: 'About',
        },
      ],
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/tag/',
          scopeLayout: 'Tag',
          pagination: {
            lengthPerPage: 10,
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
      disallowAll: true,
      sitemap: '/sitemap.xml',
    },
    'vuepress-plugin-frontmatters-feed': {
      canonical_base: 'https://thinktandem.io',
      posts_directories: ['/blog/'],
      feed_options: {
        favicon: 'https://thinktandem.io/favicon.png',
        image: 'https://thinktandem.io/images/hero-tandem-pink.png',
      },
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
        desc: 'Take it home.',
      },
      {
        text: 'Work',
        link: '/work/',
        desc: 'What we\'ve done.',
      },
      {
        text: 'About',
        link: '/about/',
        desc: 'Who we are.',
      },
      {
        text: 'Blog',
        link: '/blog/',
        desc: 'Our thoughts.',
      },
      {
        text: 'Contact',
        link: '/contact/',
        desc: 'Get in touch!',
      },
    ],
    tags: {
      drupal: {
        title: '10+ years of Drupal Expertise',
        byline: 'We have seen and done it all in Drupal on sites of every size and complexity.  Let our years or experience help bring your Drupal project to the next level.',
        pic: '/images/tags/drupal-logo.png',
      },
      migration: {
        title: 'Masters of Migrating Data',
        byline: 'We have migrated dozens of sites for our clients over the years.  We are a little strange in the fact that we love handling complex migration situations.',
        pic: '/images/tags/double-arrows.png',
      },
      wordpress: {
        title: 'Title about WordPress',
        byline: 'Words about WordPress.',
        pic: '/images/tags/wordpress-logo.png',
      },
      vuepress: {
        title: 'Title about VuePress',
        byline: 'Words about VuePress.',
        pic: '/images/tags/vuepress-logo.png',
      },
      laravel: {
        title: 'Title about Laravel',
        byline: 'Words about laravel.',
        pic: '/images/tags/laravel-logo.png',
      },
      johno: {
        title: 'I dominate',
        byline: 'CRUSH CRUSH CRUSH',
        pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33',
      },
    },
  },
};
