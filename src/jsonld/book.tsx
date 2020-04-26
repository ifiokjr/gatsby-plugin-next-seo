import React, { FC } from 'react';
import {
  Book,
  BookFormatType as SchemaBookFormatType,
  Date,
  ReadAction,
  Text,
  URL,
  WithContext,
} from 'schema-dts';
import { Except } from 'type-fest';

import { DeferSeoProps } from '../types';
import { Overrides } from '../utils/shared-types';
import { JsonLd } from './jsonld';

export type BookFormatType =
  | 'AudiobookFormat'
  | 'EBook'
  | 'GraphicNovel'
  | 'Hardcover'
  | 'Paperback';
const getBookFormat = (
  type?: BookFormatType,
): SchemaBookFormatType | undefined =>
  type ? (`https://schema.org/${type}` as SchemaBookFormatType) : undefined;

interface Person {
  /**
   * The name of the person.
   */
  name: string;

  /**
   * A reference page that unambiguously indicates the item's identity; for example, the URL of the item's Wikipedia page, Freebase page, or official website.
   */
  sameAs?: string;
}

interface WorkExample {
  /**
   * The format of the book using one or more of the `BookFormatType`'s:
   */
  bookFormat: BookFormatType;

  /**
   * The ISBN of the tome. The ISBN can be either 10 or 13 digits, but we recommend 13 digits if available. Use the ISBN of the print book instead if there is no ISBN for the edition being described; for example, for the Kindle edition.
   */
  isbn: Text;

  /**
   * Read action(s) for the book.
   */
  potentialAction: Except<ReadAction, '@type'>;

  /**
   * Globally unique ID of the volume in the form of a URL. The ID should be stable and not change over time. It should also be distinct from the ID used for the book. The URL is treated as an opaque string and does not have to be a working link.
   */
  '@id'?: URL;

  /**
   * The author(s) of the tome. Only use this property if the author(s) of the tome differ from the related book. Provide one Person entity per author.
   */
  author?: Person[];

  /**
   * The edition of the book.
   */
  bookEdition?: Text;

  /**
   * Date of first publication of this tome.
   */
  datePublished?: Date;

  /**
   * The title of the tome. Only use this property for the title of the tome if it differs from the book.
   */
  name?: Text;

  /**
   * A reference page that unambiguously indicates the item's identity; for example, the URL of the item's Wikipedia page, Freebase page, or official website.
   */
  sameAs?: URL;

  /**
   * URL specific to this edition if one exists.
   */
  url?: URL;
}

/**
 * The Book JSON LD Component props.
 */
export interface BookJsonLdProps extends DeferSeoProps, Overrides<Book> {
  /**
   * The title of the book. If you provide multiple editions, use the title of the book edition.
   */
  name: string;

  /**
   * The author(s) of the book. For each author you list, you must provide a specific Person entity. See Person.
   */
  author: Person;

  /**
   * URL of the page on your site about the book. The page may list all available editions.
   */
  url: string;

  /**
   * The editions of this book. See sub-properties for workExample.
   */
  workExample: WorkExample[];

  /**
   * Globally unique ID of the work in the a URL format. The ID should be stable and not change over time. The URL is treated as an opaque string and does not have to resolve to an actual web page.
   */
  id?: URL;

  /**
   * A reference page that unambiguously indicates the book's identity; for example, the URL of the book's Wikipedia page, Freebase page, or official website.
   */
  sameAs?: URL;
}

/**
 * The `Book` component makes search engines an entry point for discovering your
 * books and authors. Users can then buy the books that they find directly from
 * Search results.
 *
 * @remarks
 *
 * An example feed is shown below.
 *
 * ```tsx
 * import React from 'react';
 * import { CourseJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 * <>
 *  <h1>Book JSON-LD</h1>
 *  <BookJsonLd
 *    author={{ name: 'Tolu B.' }}
 *    url='https://example.com/tolub'
 *    name='Rock your world - the final chapter'
 *    workExample={[
 *      {
 *        bookFormat: 'AudiobookFormat',
 *        isbn: '123123123',
 *        potentialAction: {
 *          expectsAcceptanceOf: {
 *            '@type': 'Offer',
 *            price: '6.99',
 *            priceCurrency: 'USD',
 *            eligibleRegion: {
 *              '@type': 'Country',
 *              name: 'US',
 *            },
 *            availability: 'http://schema.org/InStock',
 *          },
 *          target: {
 *            '@type': 'EntryPoint',
 *            urlTemplate: 'http://www.barnesandnoble.com/store/info/offer/0316769487?purchase=true',
 *            actionPlatform: [
 *              'http://schema.org/DesktopWebPlatform',
 *              'http://schema.org/IOSPlatform',
 *              'http://schema.org/AndroidPlatform',
 *            ],
 *          },
 *        },
 *      },
 *    ]}
 *  />
 * </>
 * );
 * ```
 *
 * @public
 */
export const BookJsonLd: FC<BookJsonLdProps> = ({
  name,
  author,
  url,
  workExample = [],
  id,
  sameAs,
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<Book> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name,
    url,
    '@id': id,
    sameAs,
    author: { '@type': 'Person', ...author },
    workExample: workExample.map(
      ({ bookFormat, potentialAction, author, ...rest }) => ({
        '@type': 'Book',
        bookFormat: getBookFormat(bookFormat),
        ...rest,
        person: {
          '@type': 'Person',
          ...author,
        },
        potentialAction: {
          '@type': 'ReadAction',
          ...potentialAction,
        },
      }),
    ),

    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
