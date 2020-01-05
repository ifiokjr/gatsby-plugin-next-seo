import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { BaseSeo } from './meta/base-seo';
import { GatsbySeoPluginOptions } from './types';

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs, options: GatsbySeoPluginOptions) => {
  return (
    <>
      <BaseSeo {...options} />
      {element}
    </>
  );
};

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => {
  return <HelmetProvider>{element}</HelmetProvider>;
};
