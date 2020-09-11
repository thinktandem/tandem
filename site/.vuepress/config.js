module.exports = {
  title: 'Tandem',
  description: 'Tandem is a full service digital agency that works closely with you to get shit done and get it done right.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
    ['link', {rel: 'stylesheet', href: '//unpkg.com/fullpage.js/dist/fullpage.min.css'}],
    ['script', {src: '//js.hs-scripts.com/6864374.js', defer: true, async: true}],
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
            lengthPerPage: 5,

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
          title: 'Content',
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
      ga: 'UA-74237404-2',
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
    'vuepress-plugin-canonical': {
      baseURL: 'https://thinktandem.io',
      stripExtension: true
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
    locations: [
      {airport: 'OAK', name: 'Oakland', email: 'oak@thinktandem.io', background: '#EFB21E', text: '#003831'},
      {airport: 'BOS', name: 'Boston', email: 'bos@thinktandem.io', background: '#BD3039', text: '#0C2340'},
      {airport: 'SRQ', name: 'Sarasota', email: 'srq@thinktandem.io', background: '#8FBCE6', text: '#092C5C'},
      {airport: 'DCA', name: 'DC', email: 'dc@thinktandem.io', background: '#AB0003', text: '#14225A'},
      {airport: 'SAN', name: 'San Diego', email: 'san@thinktandem.io', background: '#FFC425', text: '#2F241D'},
    ],
    tags: {
      // Authors
      'alecr': {
        title: 'Alec Reynolds',
        byline: 'CEO, Co-Founder',
        pic: '/images/people/alec-sm.jpg',
      },
      'bgonz': {
        title: 'Brian Gonzales',
        byline: 'Founder, PAIRODIME, Guest Blogger',
        pic: '/images/people/brian-gonzales.jpg',
      },
      'donnab': {
        title: 'Donna Bungard',
        byline: 'Project Manager',
        pic: '/images/people/donna.jpg',
      },
      'dustinl': {
        title: 'Dustin LeBlanc',
        byline: 'Technical Project Manager',
        pic: '/images/people/dustin-sm.jpg',
      },
      'johno': {
        title: 'John Ouellet',
        byline: 'Senior Engineer',
        pic: '/images/people/john-sm.jpg',
      },
      'mikem': {
        title: 'Mike Milano',
        byline: 'Senior Architect',
        pic: '/images/people/milano.jpg',
      },
      'pirog': {
        title: 'Mike Pirog',
        byline: 'CTO, Co-Founder',
        pic: '/images/people/mike-sm.jpg',
      },
      'serundeputy': {
        title: 'Geoff St. Pierre',
        byline: 'Senior Engineer',
        pic: '/images/people/gff-sm.jpg',
      },

      // Strategy
      'strategy': {
        title: 'Strategy.',
        byline: 'We\'ve migrated millions of web pages, helping move complex, big websites for world-renowned brands to the next best thing.',
      },
      'business': {
        title: 'Business.',
        byline: 'Here\'s some work we\'ve done in business.',
      },
      'branding': {
        title: 'Branding.',
        byline: 'Here\'s some work we\'ve done in branding.',
      },
      'user-research': {
        title: 'User Research.',
        byline: 'Here\'s some work we\'ve done in user research.',
      },
      'content-strategy': {
        title: 'Content Strategy.',
        byline: 'Here\'s some work we\'ve done in content strategy.',
      },
      'seo': {
        title: 'Search Engine Optimization.',
        byline: 'Here\'s some work we\'ve done in seo.',
      },

      // Design
      'design': {
        title: 'Design.',
        byline: 'Here\'s some work we\'ve done in design.',
      },
      'accessibility': {
        title: 'Accessibility.',
        byline: 'Here\'s some work we\'ve done in accessibility.',
      },
      'responsive': {
        title: 'Responsive.',
        byline: 'Here\'s some work we\'ve done in responsive.',
      },
      'ux': {
        title: 'User Experience.',
        byline: 'Here\'s some work we\'ve done in ux.',
      },
      'styleguides': {
        title: 'Styleguides.',
        byline: 'Here\'s some work we\'ve done in styleguides.',
      },

      // Development
      'development': {
        title: 'Development.',
        byline: 'Here\'s some work we\'ve done in development.',
      },
      'performance': {
        title: 'Performance.',
        byline: 'Here\'s some work we\'ve done in performance.',
      },
      'security': {
        title: 'Security.',
        byline: 'Here\'s some work we\'ve done in security.',
      },
      'migrations': {
        title: 'We move the web.',
        byline: 'We\'ve migrated millions of web pages, helping move complex, big websites for world-renowned brands to the next best thing.',
        pic: '/images/tags/double-arrows.png',
      },
      'support': {
        title: 'Support.',
        byline: 'Here\'s some work we\'ve done in support.',
      },
      'training': {
        title: 'Teach a person to fish...',
        byline: 'We are the agency that trains other agencies. ;)',
      },

      // Industy
      'finance': {
        title: 'Finance.',
        byline: 'Here\'s some work we\'ve done in finance.',
      },
      'healthcare': {
        title: 'Healthcare.',
        byline: 'Here\'s some work we\'ve done in healthcare.',
      },
      'higher-ed': {
        title: 'Higher Education.',
        byline: 'Here\'s some work we\'ve done for higher ed.',
      },
      'non-profit': {
        title: 'Non Profit.',
        byline: 'Here\'s some work we\'ve done for non profits.',
      },
      'tech': {
        title: 'Startups. Hosting. Agencies.',
        byline: 'Here\'s some work we\'ve done in the startup scene.',
      },

      // Other
      'events': {
        title: 'Camps. Trainings. Meetup. Conferences.',
        byline: 'We\'ve helped organize and sponsor conferences and camps both large and small. We\'ve also presented and trained all around the world.',
        pic: '/images/tags/events-logo.jpg',
      },
      'localdev': {
        title: 'Localdev.',
        byline: 'With three popular localdev solutions under our belt, we\'ve been around these parts for a long time.',
        pic: '/images/tags/lando-logo.png',
      },
      'magic': {
        title: 'We make magic.',
        byline: 'Here are some Tandem greatest hits for which we are particularly proud.',
        pic: '/images/tags/magic-logo.gif',
      },
      'testing': {
        title: 'Test. Test. Test.',
        byline: 'When we can we love to make sure all the important business critical things are tested.',
      },
      'webinar': {
        title: 'Giving back with webinars.',
        byline: 'Every now and then we also host webinars so we can open source some of the knowledge we\'ve gained.',
      },

      // Tech
      'devops': {
        title: 'Build. Test. Deploy. Repeat.',
        byline: 'We help Fortune 500 companies perfect their developer workflows, host devops summits, and make awesome tools like Lando.',
        pic: '/images/tags/devops-logo.png',
      },
      'docker': {
        title: 'Shipping containers since 2015.',
        byline: 'We help over 11,000 developers deploy Docker applications on their computers each month. Let us help you!',
        pic: '/images/tags/docker-logo.png',
      },
      'drupal': {
        title: '10+ years of Drupal expertise.',
        byline: 'We have seen and done it all in Drupal on sites of every size and complexity. Let our years of experience help bring your Drupal project to the next level.',
        pic: '/images/tags/drupal-logo.png',
      },
      'electron': {
        title: 'Native macOS and Windows applications.',
        byline: 'Little known secret: Tandem might be powering your local development desktop app. Don\'t tell anyone!',
        pic: '/images/tags/electron-logo.png',
      },
      'javascript': {
        title: 'Not your granddad\'s scripting language.',
        byline: 'From Vue components to mobile and desktop apps built in Node, Tandem squeezes every drop of JS goodness.',
        pic: '/images/tags/js-logo.png',
      },
      'kalabox': {
        title: 'Localdev for the people.',
        byline: 'We built the original Docker powered local dev GUI for Drupal.',
        pic: '/images/tags/kalabox-logo.png',
      },
      'lando': {
        title: 'Over 11,000 strong and growing.',
        byline: 'We built one of the world\'s most popular local dev tools and help hosting companies, Fortune 500 companies, and efficiency-minded teams use it.',
        pic: '/images/logo-lando-pink-icon.png',
      },
      'laravel': {
        title: 'Making complex applications with beautiful code.',
        byline: 'A modern MVC framework, Laravel is our go-to choice for custom application development in PHP.',
        pic: '/images/tags/laravel-logo.png',
      },
      'node': {
        title: 'Asynchronous and loving it.',
        byline: 'Node.js forms the basis for Lando and numerous other high-performance projects in the Tandem arsenal.',
        pic: '/images/tags/node-logo.png',
      },
      'nuxt': {
        title: 'Building the Nuxt-best thing.',
        byline: 'Nuxt.js is how we supercharge Vue to build sites like Poets.org. A full-bodied framework for the discerning developer.',
        pic: '/images/tags/nuxt-logo.png',
      },
      'php': {
        title: 'We built this internet on rock and roll.',
        byline: 'We blaze new trails in the PHP wilderness with Lando and contributions to Laravel, Symfony, Drupal, and WordPress.',
        pic: '/images/tags/php-logo.png',
      },
      'vue': {
        title: 'A proactive frontend framework.',
        byline: 'We build frontends for web, desktop, and mobile apps using Vue. Think of it as React\'s hipper and nicer brother.',
        pic: '/images/tags/vue-logo.png',
      },
      'vuepress': {
        title: 'Lightning fast websites.',
        byline: 'When performance is key, Tandem uses VuePress. That\'s why this site is built with it!',
        pic: '/images/tags/vuepress-logo.png',
      },
      'wordpress': {
        title: 'Make content management easy.',
        byline: 'We help you adopt WordPress, from design through custom functionality, training, and support.',
        pic: '/images/tags/wordpress-logo.png',
      },
    },
    vibes: [
      'Budweiser in a can',
      ['Swimming in lake baikal', 'https://en.wikipedia.org/wiki/Olkhon_Island'],
      ['Miley Cyrus', 'https://www.youtube.com/watch?v=wOwblaKmyVw'],
      'Nightclubs in Belarus',
      'Retro gaming',
      'Vivaldi',
      ['Christopher Hitchens', 'https://www.youtube.com/watch?v=ZDTObha5lUE'],
      'Sour beers',
      ['The larch', 'https://www.youtube.com/watch?v=H0zVsxUbbjM'],
      'Todd Snider',
      'The Scream',
      'Miracle',
      'Wayne White',
      'Bertrand Russell',
      ['Super Mario Bros.', 'https://www.youtube.com/watch?v=4CgC2g43smA'],
      'The Badlands',
      'String instruments',
      ['Sturgill Simpson', 'https://en.wikipedia.org/wiki/Sturgill_Simpson'],
      'homebrewed cider',
      'The Englischer Garten',
      ['Wallace Stegner', 'https://en.wikipedia.org/wiki/Wallace_Stegner'],
      'Lawrence Halprin',
      'Orchard planting',
      'Thrice',
      ['Old Fashions', 'https://www.allrecipes.com/recipe/162397/classic-old-fashioned/'],
      'Albrecht Duerer',
      'Empire Strikes Back',
      'Chrono Trigger',
      'The guitar',
      ['pretty much all 90s music actually', 'https://www.cosmopolitan.com/entertainment/music/g32585720/best-90s-songs/'],
      'Coffee',
      ['The Matrix', 'https://www.youtube.com/watch?v=0YhJxJZOWBw'],
      'Scuba',
      'Coffee by day/Wine by night',
      'The Office',
      ['Ticket to Ride', 'https://www.daysofwonder.com/tickettoride/en/usa/'],
      ['Euchre', 'https://en.wikipedia.org/wiki/Euchre'],
      'Hiking',
      'Biking',
      'Beach volleyball',
    ],
  },
};
