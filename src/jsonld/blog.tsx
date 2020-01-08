import React, { FC } from 'react';
import { Blog, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { JsonLd } from './jsonld';

/**
 * The Blog JSON LD props.
 */
export interface BlogJsonLdProps extends DeferSeoProps {
  /**
   * The canonical URL of the article page.
   */
  url: string;

  /**
   * The headline of the article.
   *
   * @remarks
   *
   * Headlines should not exceed 110 characters. For AMP stories, the headline
   * should match the text in the first cover page in the AMP Story.
   */
  headline: string | string[];

  /**
   * @deprecated
   *
   * Use headline instead.
   */
  title?: string;

  /**
   * Keywords or tags used to describe this content. Multiple entries in a
   * keywords list are typically delimited by commas.
   */
  keywords?: string[];

  /**
   * The images URLs that is representative of the article or AMP story.
   *
   * @remarks
   *
   * Due to format differences in search results, the following image guidelines
   * only apply to general AMP pages, not AMP stories. AMP stories have
   * {@link https://www.ampproject.org/docs/reference/components/amp-story#new-metadata-requirements | different requirements}
   * for images.
   *
   * - Only a marked-up image that directly belongs to the article should be
   *   specified.
   * - Images should be at least 1200 pixels wide.
   * - Every page must contain at least one image (whether or not you include
   *   markup). Google will pick the best image to display in Search results
   *   based on the aspect ratio and resolution.
   * - Image URLs must be crawlable and indexable.
   * - Images must represent the marked up content. Images must be in .jpg,
   *   .png, or .gif format.
   * - For best results, provide multiple high-resolution images (minimum of
   *   800,000 pixels when multiplying width and height) with the following
   *   aspect ratios: 16x9, 4x3, and 1x1.
   */
  images?: string[];

  /**
   * The date and time the article was first published, in ISO 8601 format.
   *
   * @remarks
   *
   * Best practices:
   *
   * - The date shouldn't change over time.
   * - We recommend including the hour information in addition to the day in the
   *   timestamp.
   * - The value for dateModified should be more recent than the value for
   *   datePublished.
   */
  datePublished?: string;

  /**
   * The date and time the article was most recently modified, in ISO 8601
   * format.
   */
  dateModified?: string;

  /**
   * The name of the author.
   */
  authorName?: string;

  /**
   * The type of author for this article.
   *
   * @defaultValue 'Person'
   */
  authorType?: 'Person' | 'Organization';

  /**
   * A short description of the article.
   */
  description?: string;

  /**
   * The name of the publisher.
   */
  publisherName?: string;

  /**
   * The url of the publisher logo.
   */
  publisherLogo?: string;

  /**
   * A posting that is part of this blog.
   */
  posts?: BlogPost[];
  /**
   * The International Standard Serial Number (ISSN) that identifies this serial
   * publication. You can repeat this property to identify different formats of,
   * or the linking ISSN (ISSN-L) for, this serial publication.
   */
  issn?: string | string[];

  /**
   * An overrides object with custom properties for the provided blog schema
   * type type.
   */
  overrides?: Blog;
}

interface BlogPost {
  /**
   * Headline of the blog post.
   */
  headline: string;

  /**
   * The date and time the article was first published, in ISO 8601 format.
   *
   * @remarks
   *
   * Best practices:
   *
   * - The date shouldn't change over time.
   * - We recommend including the hour information in addition to the day in the
   *   timestamp.
   * - The value for dateModified should be more recent than the value for
   *   datePublished.
   */
  datePublished?: string;

  /**
   * An image URL that is representative of the blog post.
   */
  image?: string;
}

export const BlogJsonLd: FC<BlogJsonLdProps> = ({
  url,
  headline,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authorName,
  authorType = 'Person',
  keywords,
  description,
  publisherName,
  publisherLogo,
  posts = [],
  issn,
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    mainEntityOfPage: {
      '@type': 'Blog',
      '@id': url,
    },
    headline: headline ?? title,
    keywords,
    issn,
    image: images,
    datePublished: datePublished,
    dateModified: dateModified ?? datePublished,
    description: description,
    author: authorName
      ? {
          '@type': authorType as any,
          name: authorName,
        }
      : undefined,
    publisher: publisherName
      ? {
          '@type': 'Organization',
          name: publisherName,
          logo: publisherLogo
            ? {
                '@type': 'ImageObject',
                url: publisherLogo,
              }
            : undefined,
        }
      : undefined,
    blogPost: posts.map(post => ({ '@type': 'BlogPosting', ...post })),
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
