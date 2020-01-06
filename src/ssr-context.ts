import { FilledContext } from 'react-helmet-async';

export const emptyContext = {};

export const getFilledContext = (): FilledContext | undefined => {
  const filledContext = emptyContext as FilledContext;

  if (!filledContext.helmet) {
    return undefined;
  }

  return emptyContext as FilledContext;
};
