interface Margin {
  [key: string]: string; // Add index signature.
}

export const margin: Margin = {
  horizontal: `marginRight`,
  vertical: `marginBottom`,
};

interface Flex {
  [key: string]: object;
}

export const flex: Flex = {
  flex: {
    display: `flex`,
  },
  row: {
    flexDirection: `row`,
  },
  col: {
    flexDirection: `column`,
  },
  centerRowX: {
    justifyContent: `center`,
  },
  centerRowY: {
    alignItems: `center`,
  },
  centerColX: {
    alignItems: `center`,
  },
  centerColY: {
    justifyContent: `center`,
  },
  centerXY: {
    justifyContent: `center`,
    alignItems: `center`,
  },
  rowRev: {
    flexDirection: `row-reverse`,
  },
  colRev: {
    flexDirection: `column-reverse`,
  },
  spaceAround: {
    justifyContent: `space-around`,
  },
  spaceBetween: {
    justifyContent: `space-between`,
  },
  justifyEnd: {
    justifyContent: `flex-end`,
  },
  centerScreen: {
    justifyContent: `center`,
    alignItems: `center`,
    height: `100vh`,
    width: `100vw`,
  },
  centerContainer: {
    justifyContent: `center`,
    alignItems: `center`,
    height: `100%`,
    width: `100%`,
  },
  spaceChildren: (space: string, direction = `horizontal`) => ({
    "& > *": {
      [margin[direction]]: space,
    },
    "& > *:last-child": {
      [margin[direction]]: 0,
    },
  }),
};
