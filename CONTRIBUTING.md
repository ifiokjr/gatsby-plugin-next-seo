# Contributing Guide

Thanks for wanting to contribute to gatsby-plugin-next-seo 😁

We are open to all and any contributions. If you are going to undertake quite a large feature or refactor, maybe open an issue first to start a discussion with the maintainers.

## Project Setup

1. Pull the repo and install the dependencies:

```
git clone git@github.com:ifiokjr/gatsby-plugin-next-seo.git
yarn install
```

2. Make your modifications / additions
3. Update / Add Documentation
4. Write / Update Tests. End to end tests are required for all changes and new features.
5. Open pull request

## Working with gatsby-plugin-next-seo

All of the library code is located in the `src` directory.

The `example` directory contains a fully working GatsbyJS app. This is used in the end to end tests. To run this app first you need to build gatsby-plugin-next-seo from the root directory `yarn build`. You can then run the example gatsby app with

```bash
yarn e2e:build
yarn e2e:start
```

This builds the local gatsby-plugin-next-seo) followed by `yarn e2e:dev`. You can also run it in a production build by running `yarn e2e:build` followed by `yarn e2e:build`.

To run the end to end tests you can run the following command

```bash
yarn test:e2e # builds everything first
yarn test:e2e:quick # Skips the initial build when all you want is to rerun the tests
```

To run the unit tests run `yarn test` or `yarn test:watch` to rerun automatically whenever a file changes.

## Being added as Contributor

This project is using https://allcontributors.org/ so you will be added for your contribution.
