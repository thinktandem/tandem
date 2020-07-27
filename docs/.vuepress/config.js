module.exports = {
  title: 'Tandem 2.0',
  description: 'An ancient codex to power agency-incubators that are magical to work at and with.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-74237404-4',
    },
    'autometa': {
      site: {
        name: 'Tandem',
        twitter: 'thinktandem',
      },
      canonical_base: 'https://thinktandem.io',
    },
    'canonical': {
      baseURL: 'https://thinktandem.io',
    },
    'robots': {
      host: 'https://thinktandem.io',
    },
    'sitemap': {
      hostname: 'https://thinktandem.io',
      exclude: ['/404.html'],
    },
  },
  themeConfig: {
    repo: 'thinktandem/tandem',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Is this doc out of date? Is there something to make it better? Suggest a change!',
    nav: [
      {text: 'Manifesto', link: '/manifesto/'},
      {text: 'Handbook', link: '/handbook/'},
      {text: 'Guides', link: '/guides/'},
      {text: 'Templates', link: '/templates/'},
      {text: 'Tandem Website', link: 'https://thinktandem.io'},
    ],
    sidebar: {
      '/manifesto/': [
        '',
        'values',
        'sins',
        'roadmap',
        'roles',
        'org',
        'history',
        'tandemv1',
      ],
      '/handbook/': [
        '',
        'onboarding',
        'security-training-checklist',
        'benefits',
        'faq',
        'wrap',
      ],
      '/guides/': [
        {
          title: 'Business',
          collapsable: false,
          children: [
            'improve-tandem',
            'quarterly-review',
            'security-basics',
            'security-incident-response',
            'handling-emergency-requests',
          ],
        },
        {
          title: 'Sales',
          collapsable: false,
          children: [
            'ultimate-goals',
            'sales-marketing-channels',
            'audiences-personas',
            'invoicing',
            'sales-scripts',
            'sales-fanatical-prospecting-notes',
          ],
        },
        {
          title: 'Code lifecycle',
          collapsable: false,
          children: [
            'contributing-code',
            'qaing-code',
          ],
        },
        {
          title: 'DevOps',
          collapsable: false,
          children: [
            'spinning-up-new-projects',
          ],
        },
        {
          title: 'Meetings',
          collapsable: false,
          children: [
            'daily-standups',
            'eow-meeting',
          ],
        },
        {
          title: 'Project Management',
          collapsable: false,
          children: [
            'project-lifecycle',
            'roles-responsibilities',
          ],
        },
        {
          title: 'Hiring',
          collapsable: false,
          children: [
            'reference-check',
            'offboarding',
          ],
        },
      ],
    },
  },
};
