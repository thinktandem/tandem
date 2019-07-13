module.exports = {
  title: 'Tandem 2.0',
  description: 'An ancient codex to power agency-incubators that are great to work at and with.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  themeConfig: {
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
        'paid',
        'tracking',
        'tools',
      ],
      '/guides/': [
        {
          title: 'Business',
          collapsable: false,
          children: [
            'improve-tandem'
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
      ],
    }
  }
}
