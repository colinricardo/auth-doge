import React from "react";
import App from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, lightThemePrimitives, createTheme } from "baseui";
import { styletron, debug } from "../styletron";

// As per: https://ricostacruz.com/til/css-media-query-breakpoints
const breakpoints = {
  small: 480,
  medium: 768,
  large: 992,
};

const primitives = {
  ...lightThemePrimitives,
  primary: "#255DEC",
  // This color is used for the hover state on primary button.
  primary700: "#5980e9",
  // This color is used for the active state on primary button.
  primary600: "#5980e9",
  primaryFontFamily: "Lato",
};

const theme = createTheme(primitives);

const ResponsiveTheme = Object.keys(breakpoints).reduce(
  (acc, key) => {
    acc.mediaQuery[
      key
    ] = `@media screen and (min-width: ${breakpoints[key]}px)`;
    return acc;
  },
  {
    breakpoints,
    mediaQuery: {},
  }
);

const MyTheme = { ...theme, ...ResponsiveTheme };

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider
          // @ts-ignore
          theme={MyTheme}
        >
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
