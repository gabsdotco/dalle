import { createCss } from "@stitches/react";

import { colors, space, fonts, fontSizes } from './foundations';

export const { styled, css, global, getCssString } = createCss({
  theme: {
    colors,
    space,
    fonts,
    fontSizes,
  },
});


export const globalStyles = global({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    outline: 0
  },
  body: {
    fontFamily: '$body',
    fontSize: '$md',
    width: '100vw',
    height: '100vh',
  },
  button: {
    cursor: 'pointer',
    border: 'none',
    background: 'none'
  }
});
