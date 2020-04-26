import React, { FC } from 'react';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { Overrides } from '../utils/shared-types';
import { JsonLd } from './jsonld';

export interface ItemListElements {
  /**
   * The URL to the webpage that represents the breadcrumb.
   *
   * @remarks
   *
   * There are two ways to specify item:
   *
   * URL: Specify the URL of the page. For example:
   *
   * @example
   * "https://example.com/books"
   */
  item: string;

  /**
   * The title of the breadcrumb displayed for the user.
   */
  name: string;

  /**
   * The position of the breadcrumb in the breadcrumb trail. Position 1
   * signifies the beginning of the trail.
   */
  position: number;
}

export interface BreadcrumbJsonLdProps
  extends DeferSeoProps,
    Overrides<BreadcrumbList> {
  /**
   * An array of breadcrumbs listed in a specific order. Specify each breadcrumb
   * with a ListItem For example:
   */
  itemListElements: ItemListElements[];
}

/**
 * A breadcrumb trail on a page indicates the page's position in the site
 * hierarchy. A user can navigate all the way up in the site hierarchy, one
 * level at a time, by starting from the last breadcrumb in the breadcrumb
 * trail.
 *
 * @remarks
 *
 * BreadCrumbJsonLd creates a
 * {@link https://schema.org/BreadcrumbList | BreadcrumbList} container item
 * that holds all elements in the list.
 *
 * ```jsx
 * import React from 'react';
 * import { BreadcrumbJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *    <h1>Breadcrumb JSON-LD</h1>
 *    <BreadcrumbJsonLd
 *      itemListElements={[
 *        {
 *          position: 1,
 *          name: 'Books',
 *          item: 'https://example.com/books',
 *        },
 *        {
 *          position: 2,
 *          name: 'Authors',
 *          item: 'https://example.com/books/authors',
 *        },
 *        {
 *          position: 3,
 *          name: 'Ann Leckie',
 *          item: 'https://example.com/books/authors/annleckie',
 *        },
 *        {
 *          position: 4,
 *          name: 'Ancillary Justice',
 *          item: 'https://example.com/books/authors/ancillaryjustice',
 *        },
 *      ]}
 *     />
 *   </>
 * );
 * ```
 * *
 */
export const BreadcrumbJsonLd: FC<BreadcrumbJsonLdProps> = ({
  itemListElements = [],
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',

    itemListElement: itemListElements.map<ListItem>(
      ({ position, item, name }) => ({
        '@type': 'ListItem',
        position,
        item: { '@id': item, name, '@type': 'Thing' },
      }),
    ),
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
