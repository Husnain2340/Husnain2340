# Husnain Ahmad: Blog

A personal blog built with [Astro](https://astro.build), with Markdown posts, tags, search, reading time,
light and dark mode, and an RSS feed. It deploys to GitHub Pages at
https://husnain2340.github.io/husnain2340/.

## Run locally

```sh
npm install
npm run dev       # http://localhost:4321/husnain2340/
npm run build     # production build into ./dist
npm run preview   # serve the production build
```

Requires Node 22.

## Write a post

Create `src/content/blog/my-post.md`:

```md
---
title: 'My post'
description: 'One-line summary shown in lists and previews.'
pubDate: '2026-11-07'
tags: ['tech', 'python']
draft: false   # true = visible in `npm run dev` only
---

Post content in Markdown…
```

`.mdx` files are supported too. The URL is `/blog/<file-name>/`.

## Customise

- **Name, description, social links:** `src/consts.ts`
- **About page:** `src/pages/about.astro`
- **Home page intro:** `src/pages/index.astro`
- **Colours and typography:** the tokens at the top of `src/styles/global.css`

## Deploy

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

If you later use a custom domain or rename the repo to `husnain2340.github.io`, update `site` and
remove `base` in `astro.config.mjs`.
