import React, { FC } from 'react';
import { Organization, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { BaseJsonLd } from './base';

/**
 * The Logo JSON LD component properties.
 *
 * @remarks
 *
 * See
 * {@link https://developers.google.com/search/docs/data-types/logo#definitions | here}
 * for further documentation.
 */
export interface LogoJsonLdProps extends DeferSeoProps {
  /**
   * URL of a logo that is representative of the organization.
   *
   * @remarks
   *
   * Additional image guidelines:
   *
   * - The image must be 112x112px, at minimum.
   * - The image URL must be crawlable and indexable.
   * - The image must be in .jpg, .png, or. gif format.
   */
  logo: string;

  /**
   * The URL of the website associated with the logo.
   */
  url: string;

  /**
   * An overrides object with custom properties for the provided schema type
   * type.
   */
  overrides?: Extract<Organization, object>;
}

/**
 * Specify the image Google Search uses for your organization's logo in Search
 * results and in the Knowledge Graph.
 *
 * @remarks
 *
 * Google Search uses the markup in the use case example to recognize the image
 * to use as the organization’s logo. This ensures that, when possible, the
 * image appears in search results about the company. Markup like this is a
 * strong signal to Google Search algorithms to show this image in Knowledge
 * Graph displays.
 *
 * ```jsx
 * import React from 'react';
 * import { LogoJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <h1>Logo JSON-LD</h1>
 *     <LogoJsonLd logo='http://www.your-site.com/images/logo.jpg' url='http://www.your-site.com' />
 *   </>
 * );
 * ```
 */
export const LogoJsonLd: FC<LogoJsonLdProps> = ({ url, logo, overrides = {}, defer = false }) => {
  const json: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url,
    logo,
    ...overrides,
  };

  return <BaseJsonLd defer={defer} {...json} />;
};
