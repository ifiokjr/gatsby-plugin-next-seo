import { FilledContext } from 'react-helmet-async';

export const emptyContext = {};

export const getFilledContext = (): FilledContext => {
  const filledContext = emptyContext as FilledContext;

  if (!filledContext.helmet) {
    throw new Error('No context yet created for the gatsby-plugin-next-seo');
  }

  return emptyContext as FilledContext;
};
