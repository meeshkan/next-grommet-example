# Next.js app with Grommet and unmock

:warning: **This example is using an outdated version of Unmock.** If you'd be interested in helping us update this, please check out this [open issue](https://github.com/unmock/next-grommet-example/issues/5).

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

## Contributing

If you notice an error or you'd like to add something new to this example, please [open an issue](https://github.com/unmock/next-grommet-example/issues). We really appreciate the feedback and support! 

Please note that this project is governed by the [Unmock Community Code of Conduct](https://github.com/unmock/code-of-conduct). By participating in this project, you agree to abide by its terms.
