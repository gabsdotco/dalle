### @dallgram

This is a repository for the Dallgram project.

#### Concept

This project aims to be a minimal Instagram clone for images generated by AI. It uses the DALL-E Mini implementation to generate a bunch of variants of an given prompt. The user can choose a variant and post it to the feed.

#### Usage

To use this application, first you need to install the dependencies:

```bash
pnpm install
```

After that you need to start the local MySQL container using docker-compose. Run the following command in the root of the project:

```bash
docker-compose up
```

With the database running, you can start the application:

```bash
pnpm dev
```

#### Technologies

The project is built using the following technologies:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [DALL-E Mini](https://github.com/borisdayma/dalle-mini)
- [Stitches](https://stitches.dev/)
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/)
- [NextAuth.js](https://next-auth.js.org/)
