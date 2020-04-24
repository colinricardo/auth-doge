import React, { Children, cloneElement } from "react";
import { Block } from "baseui/block";
import { styled } from "baseui";

export const breakpoints = {
  zero: `0px`,
  small: `480px`,
  medium: `768px`,
  large: `992px`,
};

export const screenWidthBetween = (keyMin: string, keyMax: string) =>
  `@media (min-width: ${breakpoints[keyMin]}) and (max-width: ${breakpoints[keyMax]})`;

export const HideOnMobile = ({ children }) => {
  const _children = Children.map(children, (child) => {
    return React.cloneElement(child, {});
  });

  return <Block display={["none", "inherit"]}>{_children}</Block>;
};

export const ShowOnMobile = ({ children }) => {
  const _children = Children.map(children, (child) => {
    return React.cloneElement(child, {});
  });

  return <Block display={["inherit", "none"]}>{_children}</Block>;
};

export const ColOnMobile = ({ children }) => {
  const _children = Children.map(children, (child) => {
    return React.cloneElement(child, {});
  });

  return (
    <Block display={"flex"} flexDirection={["column", "row"]}>
      {_children}
    </Block>
  );
};

interface Space {
  [key: string]: number;
}

export const space: Space = {
  a: 8,
  b: 16,
  c: 24,
  d: 32,
  e: 40,
  f: 48,
  g: 56,
  h: 64,
};

interface SpacerProps {
  h?: string;
  w?: string;
  expand?: boolean;
}

export const Spacer = styled(
  "div",
  ({ h = ``, w = ``, expand }: SpacerProps) => ({
    height: `${space[h]}px` || 0,
    width: `${space[w]}px` || 0,
    flexGrow: expand ? 1 : 0,
  })
);
