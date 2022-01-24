import React, { FC } from 'react';
import { EntryPoint, SearchAction, WebSite, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { Overrides } from '../utils/shared-types';
import { JsonLd } from './jsonld';

/**
 * The Sitelinks search box JSON LD component properties.
 *
 * @remarks
 *
 * See
 * {@link https://developers.google.com/search/docs/advanced/structured-data/sitelinks-searchbox | here}
 * for further documentation.
 */
export interface SitelinksSearchBoxJsonLdProps
  extends DeferSeoProps,
    Overrides<WebSite> {
  /**
   * The URL of the canonical homepage of the website associated with the Sitelinks search box.
   *
   * @remarks
   *
   * Example: https://example.com
   *
   */
  url: string;

  /**
   * Define the website's search engine query string as a URL.
   *
   * @remarks
   *
   * Example: https://example.com/search?q=
   *
   */
  searchHandlerQueryStringUrl: string;
}

/**
 * The `SitelinksSearchBoxJsonLd` component can be used to add JSON-LD structured data to your website
 * for a Sitelinks search box.
 *
 * @remarks
 *
 * See
 * {@link https://developers.google.com/search/docs/advanced/structured-data/sitelinks-searchbox | here}
 * for further documentation.
 *
 * ```jsx
 * import React from 'react';
 * import { SitelinksSearchBoxJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <h1>Sitelinks Search Box JSON-LD</h1>
 *     <SitelinksSearchBoxJsonLd
 *       url='https://example.com/'
 *       searchHandlerQueryStringUrl='https://example.com/?q='
 *     />
 *   </>
 * );
 * ```
 */
export const SitelinksSearchBoxJsonLd: FC<SitelinksSearchBoxJsonLdProps> = ({
  url,
  searchHandlerQueryStringUrl,
  overrides = {},
  defer = false,
}) => {
  const searchTarget: EntryPoint = {
    '@type': 'EntryPoint',
    urlTemplate: `${searchHandlerQueryStringUrl}{search_term_string}`,
  };

  /**
   * Defining type SearchActionWithQueryInput to allow 'query-input' property on SearchAction inspired by post:
   *   https://github.com/google/schema-dts/issues/33#issuecomment-706680584
   */
  type SearchActionWithQueryInput = SearchAction & { 'query-input': string };

  const searchAction: SearchActionWithQueryInput = {
    '@type': 'SearchAction',
    target: searchTarget,
    'query-input': 'required name=search_term_string',
  };

  const json: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    potentialAction: searchAction,
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
