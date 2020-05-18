import React, { FC } from 'react';
import {
  Article,
  BlogPosting,
  NewsArticle,
  SpeakableSpecification,
  WithContext,
} from 'schema-dts';
import { Except } from 'type-fest';

import { DeferSeoProps } from '../types';
import { Overrides, Speakable } from '../utils/shared-types';
import { JsonLd } from './jsonld';

/**
 * The component props for a JSON LD Article.
 *
 * @public
 */
export interface ArticleJsonLdProps extends DeferSeoProps, Overrides<Article> {
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
  headline?: string | string[];

  /**
   * @deprecated
   *
   * Use headline instead.
   */
  title?: string;

  /**
   * Keywords or tags used to describe this content.
   *
   * @remarks
   *
   * Multiple entries in a keywords list are typically delimited by commas.
   */
  keywords?: string | string[];

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
  images: string[];

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
  datePublished: string;

  /**
   * The date on which the CreativeWork was created or the item was added to a
   * DataFeed.
   */
  dateCreated?: string;

  /**
   * The date and time the article was most recently modified, in ISO 8601
   * format.
   */
  dateModified?: string;

  /**
   * The name of the author.
   */
  authorName: string;

  /**
   * The type of author for this article.
   *
   * @defaultValue 'Person'
   */
  authorType?: 'Person' | 'Organization';

  /**
   * A short description of the article.
   */
  description: string;

  /**
   * The name of the publisher.
   */
  publisherName: string;

  /**
   * The url of the publisher logo.
   */
  publisherLogo: string;

  /**
   * The actual body of the article.
   */
  body?: string;

  /**
   * Provide
   */
  speakable?: Speakable[];
}

/**
 * An article, such as a news article or piece of investigative report.
 * Newspapers and magazines have articles of many different types and this is
 * intended to cover them all.
 *
 * See also
 * {@link http://blog.schema.org/2014/09/schemaorg-support-for-bibliographic_2.html | blog post}.
 */
export const ArticleJsonLd: FC<ArticleJsonLdProps> = ({
  url,
  headline,
  title,
  images = [],
  datePublished,
  dateCreated,
  dateModified = datePublished,
  authorType = 'Person',
  authorName,
  description,
  publisherName,
  publisherLogo,
  body,
  overrides,
  keywords,
  speakable,
  defer = false,
}) => {
  const json: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: headline ?? title,
    image: images,
    datePublished,
    dateModified,
    dateCreated,
    author: {
      '@type': authorType as any,
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    description: description,
    articleBody: body,
    speakable: speakable
      ? speakable.map<SpeakableSpecification>((item) => ({
          '@type': 'SpeakableSpecification',
          ...item,
        }))
      : undefined,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};

export interface BlogPostJsonLdProps
  extends Except<
      ArticleJsonLdProps,
      'publisherName' | 'publisherLogo' | 'overrides'
    >,
    Overrides<BlogPosting> {
  /**
   * The name of the publisher.
   */
  publisherName?: string;

  /**
   * The url of the publisher logo.
   */
  publisherLogo?: string;
}

/**
 * A utility component which wraps the `<ArticleJsonLd />` component but is
 * classified as a `BlogPosting`.
 *
 * @remarks
 *
 * ```jsx
 * import React from 'react';
 * import { BlogPostJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <h1>Blog Post JSON-LD</h1>
 *     <BlogPostJsonLd
 *       url='https://example.com/blog'
 *       title='Blog headline'
 *       images={[
 *         'https://example.com/photos/1x1/photo.jpg',
 *         'https://example.com/photos/4x3/photo.jpg',
 *         'https://example.com/photos/16x9/photo.jpg',
 *       ]}
 *       datePublished='2015-02-05T08:00:00+08:00'
 *       dateModified='2015-02-05T09:00:00+08:00'
 *       authorName='Jane Blogs'
 *       description='This is a mighty good description of this blog.'
 *     />
 *   </>
 * );
 * ```
 *
 * @public
 */
export const BlogPostJsonLd: FC<BlogPostJsonLdProps> = ({
  overrides,
  defer = false,
  publisherLogo = '',
  publisherName = '',
  ...props
}) => {
  return (
    <ArticleJsonLd
      defer={defer}
      publisherName={publisherName}
      publisherLogo={publisherLogo}
      {...props}
      overrides={{ ...overrides, '@type': 'BlogPosting' }}
    />
  );
};

export interface NewsArticleJsonLdProps
  extends Except<ArticleJsonLdProps, 'overrides'>,
    Overrides<NewsArticle> {
  /**
   * Articles may belong to one or more 'sections' in a magazine or newspaper,
   * such as Sports, Lifestyle, etc.
   */
  section?: string | string[];
}

/**
 * A utility component which wraps the `<ArticleJsonLd />` component but is
 * classified as a `NewsArticle`.
 *
 * @remarks
 *
 * ```tsx
 * import React from 'react';
 * import { NewsArticleJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <h1>News Article JSON-LD</h1>
 *     <NewsArticleJsonLd
 *       url='https://example.com/article'
 *       title='Article headline'
 *       images={[
 *         'https://example.com/photos/1x1/photo.jpg',
 *         'https://example.com/photos/4x3/photo.jpg',
 *         'https://example.com/photos/16x9/photo.jpg',
 *       ]}
 *       section='politic'
 *       keywords='prayuth,taksin'
 *       datePublished='2015-02-05T08:00:00+08:00'
 *       dateModified='2015-02-05T09:00:00+08:00'
 *       authorName='Jane Blogs'
 *       publisherName='Ifiok Jr.'
 *       publisherLogo='https://www.example.com/photos/logo.jpg'
 *       description='This is a mighty good description of this article.'
 *       body='This is all text for this news article'
 *     />
 *   </>
 * );
 * ```
 */
export const NewsArticleJsonLd: FC<NewsArticleJsonLdProps> = ({
  overrides,
  section,
  defer = false,
  ...props
}) => {
  return (
    <ArticleJsonLd
      defer={defer}
      {...props}
      overrides={{
        articleSection: section,
        ...overrides,
        '@type': 'NewsArticle',
      }}
    />
  );
};
