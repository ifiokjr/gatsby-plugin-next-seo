import { RenderBodyArgs } from 'gatsby';

import { onRenderBody } from '../gatsby-ssr';

jest.mock('../ssr-context');

const getActions = (actions = {}) => {
  return ({
    setHeadComponents: jest.fn(),
    ...actions,
  } as unknown) as RenderBodyArgs;
};

describe('onRenderBody', () => {
  it('sets head components', () => {
    const actions = getActions();

    onRenderBody(actions);

    expect(actions.setHeadComponents).toHaveBeenCalledTimes(1);
    expect(actions.setHeadComponents).toHaveBeenCalledWith([
      'title-component',
      'link-component',
      'meta-component',
      'noscript-component',
      'script-component',
      'style-component',
      'base-component',
    ]);
  });

  it('sets html attributes', () => {
    const actions = getActions({ setHtmlAttributes: jest.fn() });

    onRenderBody(actions);

    expect(actions.setHeadComponents).toHaveBeenCalledTimes(1);
    expect(actions.setHtmlAttributes).toHaveBeenCalledWith('html-attributes-component');
  });

  it('sets body attributes', () => {
    const actions = getActions({ setBodyAttributes: jest.fn() });

    onRenderBody(actions);

    expect(actions.setBodyAttributes).toHaveBeenCalledTimes(1);
    expect(actions.setBodyAttributes).toHaveBeenCalledWith('body-attributes-component');
  });
});
