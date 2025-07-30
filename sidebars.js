/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },

    {
      type: 'category',
      label: 'Get Started',
      link: {
        type: 'generated-index',
        description: 'Install drasyl and connect your first devices.',
        slug: '/get-started',
      },
      items: [
        {
          type: 'category',
          label: 'Installation',
          link: {
            type: 'generated-index',
            title: 'Installation',
            description: 'Install drasyl on your platform of choice.',
            slug: '/get-started/installation',
          },
          items: [
            'get-started/installation/windows',
            'get-started/installation/macos',
            'get-started/installation/linux',
          ],
        },
        'get-started/first-network',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      link: {
        type: 'generated-index',
        description: 'Learn how networks, nodes, policies, and routes work in drasyl.',
        slug: '/concepts',
      },
      items: [
        'concepts/networks',
        'concepts/nodes',
        'concepts/policies',
        'concepts/routes',
      ],
    },
    {
      type: 'category',
      label: 'How drasyl Works',
      link: {
        type: 'generated-index',
        description: 'Understand the technical architecture and inner workings of drasyl.',
        slug: '/architecture',
      },
      items: [
        'architecture/p2p-protocol',
        'architecture/network-management',
        'architecture/device-daemon',
      ],
    },
  ],
};

module.exports = sidebars;
