# Next.js app with Grommet and unmock

This is the code accompanying the [Medium post](https://medium.com/@meeshkan/c502f099a086) on how to build a Next.js app with Grommet, using mock data from [unmock](https://unmock.io) for development.

## Development

First ensure that you have a recent version of Node.js and [yarn](https://yarnpkg.com/en/) installed.

Install dependencies in `node_modules/`:

```
yarn
```

Start the development server:

```
yarn start
```

Navigate to `http://localhost:3000`.

You may notice that the app is complaining about missing `UNMOCK_TOKEN` environment variable. To suppress the message and to ensure private mocks, sign up for free at [https://unmock.io](https://unmock.io) and start the server with

```
UNMOCK_TOKEN={your token here} yarn start
```
