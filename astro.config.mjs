import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightThemeNova from 'starlight-theme-nova';

export default defineConfig({
  site: 'https://www.gtnewhorizons.com',
  base: '/GTNH-Dev-Doc',
  redirects: {
    '/how-to/run-daily-build':
      '/GTNH-Dev-Doc/maintainers/run-daily-build',
    '/start-here/setup':
      '/GTNH-Dev-Doc/start-here/fork-clone-and-import',
    '/start-here/build-and-first-pr':
      '/GTNH-Dev-Doc/start-here/build-and-run',
    '/how-to/change-location':
      '/GTNH-Dev-Doc/how-to/find-change-location',
    '/how-to/logs': '/GTNH-Dev-Doc/how-to/locate-logs',
    '/how-to/maven-local':
      '/GTNH-Dev-Doc/how-to/test-cross-repository-changes',
    '/maintainers/tag-mod-version':
      '/GTNH-Dev-Doc/maintainers/release-operations',
    '/troubleshooting/common-problems':
      '/GTNH-Dev-Doc/troubleshooting/gradle',
    '/reference/resources':
      '/GTNH-Dev-Doc/reference/official-resources',
    '/contributing/contribution-types':
      '/GTNH-Dev-Doc/concepts/repository-map',
    '/contributing/review-and-ci':
      '/GTNH-Dev-Doc/contributing/pull-request-expectations',
    '/how-to/local-gradle-overrides':
      '/GTNH-Dev-Doc/how-to/gradle-tasks#use-local-overrides',
    '/reference/repository-directory':
      '/GTNH-Dev-Doc/concepts/repository-map',
    '/reference/mod-support':
      '/GTNH-Dev-Doc/concepts/repository-map#separate-ownership-from-support',
    '/contributing/contribute-to-the-handbook':
      '/GTNH-Dev-Doc/contributing/contribute-to-the-documentation',
  },
  integrations: [
    starlight({
      title: 'GTNH Developer Documentation',
      description: 'Shared practices, workflows, and technical knowledge for GTNH development',
      lastUpdated: true,
      // src/pages/404.astro owns this route; avoid duplicate content routes.
      disable404Route: true,
      plugins: [starlightThemeNova()],
      editLink: {
        baseUrl: 'https://github.com/GTNewHorizons/GTNH-Dev-Doc/edit/master/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub repository',
          href: 'https://github.com/GTNewHorizons/GTNH-Dev-Doc',
        },
        {
          icon: 'discord',
          label: 'Official GTNH Discord',
          href: 'https://discord.gg/EXshrPV',
        },
      ],
      sidebar: [
        { label: 'Home', slug: 'index' },
        {
          label: 'Start Here',
          items: [
            { slug: 'start-here/prerequisites' },
            { slug: 'start-here/choose-a-repository' },
            { slug: 'start-here/fork-clone-and-import' },
            { slug: 'start-here/build-and-run' },
            { slug: 'start-here/first-pull-request' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { slug: 'contributing/before-you-code' },
            { slug: 'contributing/pull-request-expectations' },
            { slug: 'contributing/testing-expectations' },
            { slug: 'contributing/contribute-to-the-documentation' },
          ],
        },
        {
          label: 'Development Practices',
          items: [
            { slug: 'development-practices' },
            { slug: 'development-practices/code-style' },
            { slug: 'development-practices/chemical-balance' },
            { slug: 'development-practices/localized-display-text' },
            { slug: 'development-practices/gt5-localization' },
            { slug: 'development-practices/optional-mod-integrations' },
          ],
        },
        {
          label: 'Minecraft & Forge Internals',
          items: [
            { slug: 'minecraft-forge-internals/client-server-boundaries' },
            { slug: 'minecraft-forge-internals/tile-entity-state' },
            { slug: 'minecraft-forge-internals/tick-update-model' },
            { slug: 'minecraft-forge-internals/nbt-schema' },
            { slug: 'minecraft-forge-internals/chunk-boundaries' },
            { slug: 'minecraft-forge-internals/rendering-state' },
            { slug: 'minecraft-forge-internals/stacks-and-inventories' },
          ],
        },
        {
          label: 'How-to Guides',
          items: [
            { slug: 'how-to/find-change-location' },
            { slug: 'how-to/use-github-desktop' },
            { slug: 'how-to/gradle-tasks' },
            { slug: 'how-to/test-cross-repository-changes' },
            { slug: 'how-to/test-in-full-pack' },
            { slug: 'how-to/locate-logs' },
            { slug: 'how-to/use-horizon-qa' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { slug: 'concepts/repository-map' },
            { slug: 'concepts/build-system-stack' },
            { slug: 'concepts/java-and-runtime-model' },
            { slug: 'concepts/dependencies-and-artifacts' },
            { slug: 'concepts/release-pipeline' },
          ],
        },
        {
          label: 'Maintainer Procedures',
          items: [
            { slug: 'maintainers/run-daily-build' },
            { slug: 'maintainers/run-experimental-build' },
            { slug: 'maintainers/release-operations' },
            { slug: 'maintainers/repair-maven-metadata' },
          ],
        },
        {
          label: 'Troubleshooting',
          items: [
            { slug: 'troubleshooting/java' },
            { slug: 'troubleshooting/gradle' },
            { slug: 'troubleshooting/development-client' },
            { slug: 'troubleshooting/intellij' },
            { slug: 'troubleshooting/ci' },
            { slug: 'troubleshooting/mixins-and-transformers' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { slug: 'reference/glossary' },
            { slug: 'reference/official-resources' },
          ],
        },
      ],
    }),
  ],
});
