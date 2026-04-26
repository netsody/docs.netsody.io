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
  organizationName: 'netsody', // Usually your GitHub org/user name.
  projectName: 'docs.netsody.io', // Usually your repo name.

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
        title: 'netsody',
        logo: {
          alt: 'Netsody Logo',
          src: 'img/logo.svg',
        },
        items: [],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Home',
                href: 'https://netsody.io',
              },
              {
                label: 'Business VPN',
                href: 'https://netsody.io/use-cases/business-vpn/',
              },
              {
                label: 'Remote Access',
                href: 'https://netsody.io/use-cases/remote-access/',
              },
              {
                label: 'Sign In',
                href: 'https://my.netsody.io/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Blog',
                href: 'https://netsody.io/blog',
              },
              {
                label: 'Documentation',
                href: 'https://docs.netsody.io/',
              },
              {
                label: 'Status Page',
                href: 'https://status.netsody.io/',
              },
              {
                label: 'About',
                href: 'https://netsody.io/about/',
              },
              {
                label: 'Imprint',
                href: 'https://netsody.io/imprint/',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'hello@netsody.io',
                href: 'mailto:hello@netsody.io',
              },
              {
                label: 'Discord',
                href: 'https://netsody.io/discord',
              },
              {
                label: 'Mastodon',
                href: 'https://mastodon.world/@netsody',
              },
            ],
          },
        ],
        copyright: `© 2020-${new Date().getFullYear()} Heiko Bornholdt and Kevin Röbert`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['toml']
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
