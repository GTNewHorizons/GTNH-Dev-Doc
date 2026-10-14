# GTNH Developer Documentation

These docs cover shared development workflows for contributors to
[GT New Horizons](https://github.com/GTNewHorizons). For player guides and
gameplay topics, use the [official GTNH wiki](https://wiki.gtnewhorizons.com/).
Each project's API manual stays with that project; these docs link to those
manuals where you need them.

This repository also contains documents related to GTNH contributions, including
the [AI Policy](AI_POLICY.md) and the [vision for the modpack](vision%20of%20the%20modpack/original%20vision%20doc.md).

The Contribution Guidelines and Code of Conduct are maintained in the
[GTNewHorizons/.github](https://github.com/GTNewHorizons/.github) repository.
Make changes to those documents there.

## Local setup

Requires Node.js 22.12 or newer and npm 10.8.2 or newer.

```sh
npm ci
npm run dev
```

Run `npm run build` before opening a pull request. Documentation lives in
`src/content/docs/`. Follow [the documentation contribution guide](src/content/docs/contributing/contribute-to-this-documentation.md)
to choose a useful topic, verify its advice, and review the rendered result.

## Source layout

| Location | Purpose |
| --- | --- |
| `src/content/docs/` | Published pages, grouped by the reader's task or topic. The home page is `index.mdx`. |
| `astro.config.mjs` | Sidebar sections, page order, and site configuration. |
| `src/assets/` and `public/` | Site images and static assets. |
| `src/content/i18n/` | Documentation interface labels. |
| `src/pages/404.astro` | Custom not-found page. |

Name page files after their titles using lowercase words separated by hyphens.
Use `index` for the home page and section landing pages, `.md` for prose, and
`.mdx` for pages that import components. The sidebar explicitly lists pages, so
update its entries in `astro.config.mjs` when content changes. The policy,
governance, and vision documents at the repository root are maintained separately
from the published handbook.

The `master` branch deploys with GitHub Actions to
<https://www.gtnewhorizons.com/GTNH-Dev-Doc/>.

## License

Original content and code are licensed under MIT. Imported and third-party
material retains its existing terms. See [LICENSE](LICENSE).
