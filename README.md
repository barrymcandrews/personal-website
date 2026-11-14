# Barry McAndrews' Personal Website 
[![Deploy Website to Production S3](https://github.com/barrymcandrews/personal-website/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/barrymcandrews/personal-website/actions/workflows/deploy-prod.yml)

Welcome to the source code of my [personal website](https://www.bmcandrews.com).

## Installation

To setup this project locally run the following:
```
$ git clone https://github.com/barrymcandrews/personal-website.git
$ cd personal-website
$ yarn install
```
To run the project in development mode:
```
$ yarn start
```

To build the production version of the site:
```
$ yarn build
```

## Images and deferred UI

`yarn dev` and `yarn build` generate responsive WebP images with Sharp before
starting Next.js. Originals in `public/images` remain unchanged. Variant widths
live in `src/config/images.json`; `yarn images:optimize` regenerates them manually.
Generated files in `public/images/optimized` are ignored by Git.
Run `yarn images:verify` after generation to check dimensions and verify that
encoding preserves every visible pixel of each resized source.

Variants use Lanczos3 resizing and **lossless** WebP encoding (no lossy quality
setting), with up to 3× the displayed resolution. Use `ResponsiveImage` and an
accurate `sizes` value when adding images or changing their layout.

Fonts are self-hosted by `next/font`. The footer reserves its height, waits for
window load and font readiness, then mounts the terminal during an idle callback
(with a timer fallback). Lazy images farther down the page do not block startup.

## Deployment

Since this project compiles into a static website, it is hosted in an S3 bucket. 
Any new commits on the master branch will trigger a GitHub Action for the deployment. 
This action builds the project using `yarn build` and copies the result to S3.
