module.exports = {
  title: 'Tandem 2.0',
  description: 'A secret codex to power agency-incubators that are great to work at.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles/overrides.css'}],
  ],
  themeConfig: {
    repo: 'thinktandem/tandem',
    repoLabel: 'Contribute!',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/placeholder/' },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: {
      '/placeholder/': [
        '',
        'rando',
      ]
    }
  }
}
