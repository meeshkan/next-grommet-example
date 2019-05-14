# Next.js app with Grommet and unmock

This is the code accompanying the [Medium post]() on how to build a Next.js app with server-side style-sheets, Grommet, and mock data.

## Development

First ensure that you have a recent version of Node.js installed.

Install dependencies in `node_modules/`:

```
yarn
```

Start the development server:

```
yarn next
```

Navigate to `http://localhost:3000`.

You may notice that the app is complaining about missing `UNMOCK_TOKEN` environment variable. To suppress the message, sign up at [https://unmock.io](https://unmock.io) (it's free) and start the server with

```
UNMOCK_TOKEN={your token here} yarn next
```
