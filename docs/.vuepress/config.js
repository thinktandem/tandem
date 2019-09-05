module.exports = {
  title: 'Tandem 2.0',
  description: 'An ancient codex to power agency-incubators that are magical to work at and with.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  themeConfig: {
    ga: 'UA-74237404-2',
    repo: 'thinktandem/tandem',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Is this doc out of date? Is there something to make it better? Suggest a change!',
    nav: [
      { text: 'Manifesto', link: '/manifesto/' },
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Templates', link: '/templates/' },
      { text: 'Tandem Website', link: 'https://thinktandem.io' },
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
          ],
        },
        {
          title: 'Code lifecycle',
          collapsable: false,
          children: [
            'contributing-code',
            'qaing-code'
          ],
        },
        {
          title: 'Project Management',
          collapsable: false,
          children: [
            'project-lifecycle',
            'roles-responsibilities'
          ],
        },
        {
          title: 'Hiring',
          collapsable: false,
          children: [
            'reference-check',
          ],
        },
      ],
    }
  }
}
