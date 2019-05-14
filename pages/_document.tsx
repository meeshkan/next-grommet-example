import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

interface IProps {
  styleTags: {};
}

/**
 * Server-side stylesheets with styled-components
 * https://www.styled-components.com/docs/advanced#nextjs
 */
export default class MyDocument extends Document<IProps> {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render() {
    return (
      <html lang="en-US">
        <Head>{this.props.styleTags}</Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
