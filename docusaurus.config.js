// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Netsody',
  url: 'https://docs.netsody.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'drasyl', // Usually your GitHub org/user name.
  projectName: 'drasyl-rs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/netsody/docs.netsody.io/blob/master',
          routeBasePath: "/",
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Netsody',
        logo: {
          alt: 'Netsody Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/drasyl/drasyl-rs',
            position: 'right',
            className: 'header-github-link',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Netsody',
            items: [
              {
                label: 'Website',
                href: 'https://netsody.io',
              },
              {
                label: 'Blog',
                href: 'https://netsody.io/blog',
              },
              {
                label: 'Network Editor',
                href: 'https://editor.drasyl.org',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/drasyl/drasyl-rs/',
              },
              {
                label: 'Docker',
                href: 'https://hub.docker.com/r/drasyl/drasyl',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://netsody.io/discord',
              },
              {
                label: 'Mastodon',
                href: 'https://mastodon.world/@drasyl',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Changelog',
                href: 'https://github.com/drasyl/drasyl-rs/blob/master/CHANGELOG.md',
              },
              {
                label: 'Contributing',
                href: 'https://github.com/drasyl/drasyl-rs/blob/master/CONTRIBUTING.md',
              },
              {
                label: 'Statuspage',
                href: 'https://status.netsody.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} Heiko Bornholdt and Kevin Röbert.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['toml']
      },
      announcementBar: {
        id: 'netsody-sdn-documentation',
        content:
          '📚 <strong>Moved documentation:</strong> This site now serves the documentation for our new SDN solution. The Java P2P library moved to <a href="https://docs.java.drasyl.org" style="color: #ffffff; text-decoration: underline; font-weight: bold;">docs.java.drasyl.org</a>',
        backgroundColor: '#2563eb',
        textColor: '#ffffff',
        isCloseable: false,
      },
    }),
        themes: [
            // ... Your other themes.
            [
                require.resolve("@easyops-cn/docusaurus-search-local"),
                {
                    hashed: true,
                    indexBlog: false,
                    docsRouteBasePath: "/",
                },
            ],
        ],
};

module.exports = config;
