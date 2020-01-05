import { RenderBodyArgs, WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { BaseSeo } from './meta/base-seo';
import { emptyContext, getFilledContext } from './ssr-context';
import { GatsbySeoPluginOptions } from './types';

(HelmetProvider as any).canUseDOM = false;

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes }: RenderBodyArgs) => {
  const { helmet } = getFilledContext();
  if (setHtmlAttributes) {
    setHtmlAttributes(helmet.htmlAttributes.toComponent());
  }
  if (setBodyAttributes) {
    setBodyAttributes(helmet.bodyAttributes.toComponent());
  }
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
    helmet.base.toComponent(),
  ]);
};

export const wrapPageElement = ({ element }: WrapPageElementNodeArgs, options: GatsbySeoPluginOptions) => {
  return (
    <>
      <BaseSeo {...options} defer={false} />
      {element}
    </>
  );
};

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => {
  return <HelmetProvider context={emptyContext}>{element}</HelmetProvider>;
};
