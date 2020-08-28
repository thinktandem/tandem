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
            lengthPerPage: 5,
          },
          title: 'Blog',
        },
        {
          id: 'work',
          dirname: 'work',
          itemPermalink: '/work/:slug',
          itemLayout: 'CaseStudy',
          layout: 'Work',
          pagination: {
            lengthPerPage: 3,
          },
          title: 'Work',
        },
        {
          id: 'pages',
          dirname: 'pages',
          path: '/about/',
          itemPermalink: '/:slug',
          itemLayout: 'Page',
          layout: 'About',
          title: 'About',
        },
      ],
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/tag/',
          scopeLayout: 'Tag',
          pagination: {
            lengthPerPage: 5,
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
      policies: [
        {
          userAgent: '*',
          disallow: [
            '/tag/*',
          ],
        },
      ],
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
        title: '10+ years of Drupal expertise.',
        byline: 'We have seen and done it all in Drupal on sites of every size and complexity.  Let our years of experience help bring your Drupal project to the next level.',
        pic: '/images/tags/drupal-logo.png',
      },
      migration: {
        title: 'We move the web.',
        byline: 'We\'ve migrated millions of web pages, helping move complicated, large websites for world-renowned brands.',
        pic: '/images/tags/double-arrows.png',
      },
      wordpress: {
        title: 'Make content management easy.',
        byline: 'We help you adopt WordPress, from design, custom functionality, training, and support.',
        pic: '/images/tags/wordpress-logo.png',
      },
      vuepress: {
        title: 'Lightning fast websites.',
        byline: 'When performance is key, Tandem uses VuePress. That\'s why this site is built with it!',
        pic: '/images/tags/vuepress-logo.png',
      },
      laravel: {
        title: 'Making complex applications with beautiful code.',
        byline: 'A modern MVC framework, Laravel is our go-to choice for custom application development in PHP.',
        pic: '/images/tags/laravel-logo.png',
      },
      php: {
        title: 'We built this internet on rock and roll.',
        byline: 'We blaze new trails in the PHP wilderness with Lando and contributions to Laravel, Symfony, Drupal, and WordPress.',
        pic: '/images/tags/php-logo.png',
      },
      javascript: {
        title: 'Not your granddad\'s scripting language.',
        byline: 'From Vue components to mobile and desktop apps built in Node, Tandem squeezes every drop of JS goodness.',
        pic: '/images/tags/js-logo.png',
      },
      node: {
        title: 'Asynchronous and loving it.',
        byline: 'Node.js forms the basis for Lando and numerous other high-performance projects in the Tandem arsenal.',
        pic: '/images/tags/node-logo.png',
      },
      vue: {
        title: 'A proactive frontend framework.',
        byline: 'We build frontends for web, desktop, and mobile apps using Vue. Think of it as React\'s hipper and nicer brother.',
        pic: '/images/tags/vue-logo.png',
      },
      nuxt: {
        title: 'Building the Nuxt-best thing.',
        byline: 'Nuxt.js is how we supercharge Vue to build sites like Poets.org. A full-bodied framework for the discerning developer.',
        pic: '/images/tags/nuxt-logo.png',
      },
      electron: {
        title: 'Native Mac and Windows applications.',
        byline: 'Little known secret: Tandem powers the desktop apps of startups using web technology. Don\'t tell anyone!',
        pic: '/images/tags/nuxt-logo.png',
      },
      devops: {
        title: 'Build. Test. Deploy. Repeat.',
        byline: 'We help Fortune 500 companies perfect their developer workflows, host devops summits, and make awesome tools like Lando.',
        pic: '/images/tags/devops-logo.png',
      },
      docker: {
        title: 'Shipping containers since 2015.',
        byline: 'We help over 11,000 developers deploy Docker applications on their computers each month. Let us help you!',
        pic: '/images/tags/docker-logo.png',
      },
      lando: {
        title: 'Over 11,000 developers can\'t be wrong',
        byline: 'We built the world\'s most popular Drupal local dev tool and help hosting companies, Fortune 500 companies, and efficiency-minded teams use it.',
        pic: '/images/logo-lando-pink-icon.png',
      },
      johno: {
        title: 'I dominate',
        byline: 'CRUSH CRUSH CRUSH',
        pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33',
      },
    },
  },
};
