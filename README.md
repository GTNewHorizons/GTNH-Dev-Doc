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

The `master` branch deploys with GitHub Actions to
<https://www.gtnewhorizons.com/GTNH-Dev-Doc/>.

## License

Original content and code are licensed under MIT. Imported and third-party
material retains its existing terms. See [LICENSE](LICENSE).
