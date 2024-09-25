This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on fleek

[Fleek](https://fleek.xyz) is a platform that allows you to deploy your website on IPFS and host it for free.

This guide will show you how to do deploy your SE-2 build to Fleek.

## ✅ Getting Started

1/ Goto [Fleek app](https://app.fleek.xyz/) to create your own Fleek account

2/ From your local computer, login into Fleek with this command:

To deploy your dapp to Fleek, run this command:

```shell
yarn fleek:login
```

## 🚀 Deploy to Fleek

```shell
yarn fleek:deploy
```

First time it will ask you to init your project, use these params:

- directory `out`
- optional build `no`
- config format `JSON`

Your app will be build then uploaded to Fleek.

For example, this repo is deployed to https://thundering-dawn-hissing.on-fleek.app/

## 🚫 Limitations

Note that decentralized storage as IPFS, requires `client only` application (i.e. SPA [`Single Page Application`](https://blogonyourown.com/single-page-application/)) without server side.

With NextJs this is possible by using [Static HTML Export](https://nextjs.org/docs/app/building-your-application/deploying#static-html-export). Nevertheless, note that dynamic routing is not possible, so for example instead of using https://myblog.com/posts/[postId], you will have to use https://myblog.com/posts/?postId=[postId].

For existing application, you may have to modify internal links: between absolute link (like `https://website.io/image.png`), related links (like `image.png` or `./image.png`) and root link (like `/image.png`).
