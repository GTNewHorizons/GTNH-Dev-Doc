# GTNH Developer Documentation

Developer documentation for contributors to
[GT New Horizons](https://github.com/GTNewHorizons). Shared developer workflows
belong here. The [official GTNH wiki](https://wiki.gtnewhorizons.com/) serves
players and gameplay topics. Project-specific API manuals remain with their
owning projects and are linked as source references.

This repository also contains documents related to GTNH contributions, including
the [AI Policy](AI_POLICY.md) and the [vision for the modpack](vision%20of%20the%20modpack/original%20vision%20doc.md).

The Contribution Guidelines and Code of Conduct are maintained in the
[GTNewHorizons/.github](https://github.com/GTNewHorizons/.github) repository.
Please make changes to those documents there.

## Local setup

Requires Node.js 22.12 or newer and npm 10.8.2 or newer.

```sh
npm ci
npm run dev
```

Run `npm run build` before opening a pull request. Documentation lives in
`src/content/docs/`. Follow [the documentation contribution guide](src/content/docs/contributing/contribute-to-the-documentation.md)
to choose a useful topic, verify its advice, and review the rendered result.

## Source layout

| Location | Purpose |
| --- | --- |
| `src/content/docs/` | Published pages, grouped by the reader's task or topic. The home page is `index.mdx`. |
| `astro.config.mjs` | Sidebar sections, page order, redirects, and site configuration. |
| `src/assets/` and `public/` | Site images and static assets. |
| `src/content/i18n/` | Documentation interface labels. |
| `src/pages/404.astro` | Custom not-found page. |

Use `.md` for prose and `.mdx` for pages that import components. The sidebar
explicitly lists pages; keep its entries in `astro.config.mjs` aligned with
content changes. Root policy, governance, and vision documents are maintained
separately from the published handbook.

The `master` branch deploys with GitHub Actions to
<https://www.gtnewhorizons.com/GTNH-Dev-Doc/>.

## License

Original content and code are licensed under MIT. Imported and third-party
material retains its existing terms. See [LICENSE](LICENSE).
