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
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'get-started',
      label: 'Get Started',
    },
    {
      type: 'category',
      label: 'Manage',
      link: {
        type: 'generated-index',
        description: 'Manage nodes, groups, policies, resources, users, and join keys in the Netsody controller.',
        slug: '/manage',
      },
      items: [
        'manage/nodes',
        'manage/groups',
        'manage/policies',
        'manage/resources',
        'manage/users',
        'manage/join-keys',
      ],
    },
    {
      type: 'category',
      label: 'How Netsody Works',
      link: {
        type: 'generated-index',
        description: 'Understand the controller, agent, access enforcement, and connectivity model.',
        slug: '/architecture',
      },
      items: [
        'architecture/connectivity',
        'architecture/network-management',
        'architecture/agent',
      ],
    },
    {
      type: 'category',
      label: 'Self-Hosting',
      link: {
        type: 'doc',
        id: 'self-hosting',
      },
      items: [
        'self-hosting/super-peer',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      link: {
        type: 'generated-index',
        description: 'Troubleshooting and support information.',
        slug: '/help',
      },
      items: [
        'help/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Other',
      link: {
        type: 'generated-index',
        description: 'Additional documentation for non-controller-managed Netsody networks.',
        slug: '/other',
      },
      items: [
        'other/manually-managed-networks',
      ],
    },
  ],
};

module.exports = sidebars;
