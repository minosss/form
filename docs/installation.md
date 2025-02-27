---
id: installation
title: Installation
---

TanStack Form is compatible with various front-end frameworks, including React and Vue. To use TanStack Form with your desired framework, install the corresponding adapter via NPM:

```bash
$ npm i @tanstack/react-form
# or
$ pnpm add @tanstack/vue-form
```

> Depending on your environment, you might need to add polyfills. If you want to support older browsers, you need to transpile the library from `node_modules` yourselves.

In addition, we support both Zod and Yup as validators through official validator packages:

```bash
$ yarn add @tanstack/zod-form-adapter zod
# or
$ npm i @tanstack/yup-form-adapter yup
```
