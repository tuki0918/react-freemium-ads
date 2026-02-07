# react-freemium-ads

## Setup

1. Run `npm ci`
2. Update `package.json`
    - Required updates: `name`, `license`, `author`, `repository`
3. Update `LICENSE`
    - Required updates: `author`

## Development

```bash
# test
npm run test
# format
npm run lint:fix
```

## First Release (Manual)

```bash
npm run build
npm pack   # verify package contents before publishing

npm login
npm publish
```

## Next Releases (Recommended: Trusted Publishing)

[Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers)

One-time setup:
1. Open the npm package settings and configure an OIDC trusted publisher for this repository/workflow.

For each release:
1. Increase the package version (`npm version patch|minor|major`).
2. Push the commit and tag (`git push && git push --tags`).
3. Create a GitHub Release from that tag.  
   This repository's `.github/workflows/npm-publish.yml` runs tests/build and publishes to npm on release creation.
