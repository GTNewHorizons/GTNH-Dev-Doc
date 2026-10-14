import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightThemeNova from 'starlight-theme-nova';

export default defineConfig({
  site: 'https://www.gtnewhorizons.com',
  base: '/GTNH-Dev-Doc',
  integrations: [
    starlight({
      title: 'GTNH Developer Documentation',
      description: 'Shared practices, workflows, and technical knowledge for GTNH development',
      lastUpdated: true,
      // Onboarding pages set their own previous and next links.
      pagination: false,
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
          collapsed: true,
          items: [
            { slug: 'start-here' },
            { slug: 'start-here/choose-a-repository' },
            { slug: 'start-here/set-up-your-workspace' },
            { slug: 'start-here/build-and-run' },
            { slug: 'start-here/make-your-first-gt5-change' },
            { slug: 'start-here/make-your-first-pull-request' },
          ],
        },
        {
          label: 'Contributing',
          collapsed: true,
          items: [
            { slug: 'contributing/before-you-start-coding' },
            { slug: 'contributing/find-where-a-change-belongs' },
            { slug: 'contributing/contribute-with-github-desktop' },
            { slug: 'contributing/pull-request-expectations' },
            { slug: 'contributing/contribute-to-this-documentation' },
          ],
        },
        {
          label: 'Build Tools',
          collapsed: true,
          items: [
            { slug: 'build-tools/understand-the-gtnh-build-system-stack' },
            { slug: 'build-tools/work-with-gradle-tasks' },
            { slug: 'build-tools/understand-java-and-runtime-selection' },
            { slug: 'build-tools/understand-dependencies-and-artifacts' },
          ],
        },
        {
          label: 'Testing',
          collapsed: true,
          items: [
            { slug: 'testing/testing-expectations' },
            { slug: 'testing/in-game-testing-tools-and-tricks' },
            { slug: 'testing/measure-a-performance-change' },
            { slug: 'testing/test-a-change-in-the-full-pack' },
            { slug: 'testing/test-cross-repository-changes' },
            { slug: 'testing/use-horizon-qa-gametests' },
          ],
        },
        {
          label: 'Troubleshooting',
          collapsed: true,
          items: [
            { slug: 'troubleshooting/locate-logs-and-useful-errors' },
            { slug: 'troubleshooting/java-problems' },
            { slug: 'troubleshooting/gradle-problems' },
            { slug: 'troubleshooting/development-client-and-server-problems' },
            { slug: 'troubleshooting/intellij-problems' },
            { slug: 'troubleshooting/ci-problems' },
            { slug: 'troubleshooting/mixins-and-transformers' },
          ],
        },
        {
          label: 'Development Practices',
          collapsed: true,
          items: [
            { slug: 'development-practices' },
            { slug: 'development-practices/code-style' },
            { slug: 'development-practices/balance-chemical-recipes' },
            { slug: 'development-practices/keep-values-separate-from-localized-text' },
            { slug: 'development-practices/add-localized-text-to-gt5' },
            { slug: 'development-practices/isolate-optional-mod-integrations' },
          ],
        },
        {
          label: 'Minecraft & Forge Internals',
          collapsed: true,
          items: [
            { slug: 'minecraft-forge-internals/understand-client-and-server-boundaries' },
            { slug: 'minecraft-forge-internals/understand-tile-entity-state' },
            { slug: 'minecraft-forge-internals/understand-ticks-and-updates' },
            { slug: 'minecraft-forge-internals/treat-nbt-as-a-persistent-schema' },
            { slug: 'minecraft-forge-internals/work-safely-across-chunk-boundaries' },
            { slug: 'minecraft-forge-internals/treat-rendering-and-block-bounds-as-shared-state' },
            { slug: 'minecraft-forge-internals/understand-stacks-and-inventory-contracts' },
          ],
        },
        {
          label: 'Releases and Maintenance',
          collapsed: true,
          items: [
            { slug: 'releases-and-maintenance/understand-the-gtnh-release-pipeline' },
            { slug: 'releases-and-maintenance/run-a-daily-modpack-build-manually' },
            { slug: 'releases-and-maintenance/run-an-experimental-modpack-build' },
            { slug: 'releases-and-maintenance/release-operations' },
            { slug: 'releases-and-maintenance/repair-maven-repository-metadata' },
          ],
        },
        {
          label: 'Reference',
          collapsed: true,
          items: [
            { slug: 'reference/gtnh-development-glossary' },
            { slug: 'reference/official-resources' },
          ],
        },
      ],
    }),
  ],
});
