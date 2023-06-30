import { LiteralUnion } from 'type-fest';

/**
 * @public
 */
export interface OpenGraphImages {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

/**
 * @public
 */
export interface OpenGraphVideos {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

/**
 * @public
 */
export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

/**
 * @public
 */
export interface OpenGraph {
  /**
   * The canonical URL of your object that will be used as its permanent ID in
   * the graph.
   */
  url?: string;

  /**
   * The type of your object. Depending on the type you specify, other
   * properties may also be required.
   */
  type?: string;

  /**
   * The open graph title, this can be different than your meta title.
   */
  title?: string;

  /**
   * The open graph description, this can be different than your meta
   * description.
   */
  description?: string;

  /**
   * An array of images (object) to be used by social media platforms, slack etc
   * as a preview. If multiple supplied you can choose one when sharing.
   */
  images?: OpenGraphImages[];

  /**
   * An array of videos.
   */
  videos?: OpenGraphVideos[];

  /**
   * The default height for the image used.
   */
  defaultImageHeight?: number;

  /**
   * The default width of the image used.
   */
  defaultImageWidth?: number;

  /**
   * The locale the open graph tags are marked up in. Of the format
   * language_TERRITORY.
   *
   * @defaultValue 'en_US'
   */
  locale?: string;

  /**
   * If your object is part of a larger web site, the name which should be
   * displayed for the overall site.
   */
  site_name?: string;

  /**
   * The open graph profile configuration object.
   */
  profile?: OpenGraphProfile;

  /**
   * The open graph book configuration object.
   */
  book?: OpenGraphBook;

  /**
   * The open graph article configuration object.
   */
  article?: OpenGraphArticle;

  /**
   * The open graph video configuration object.
   */
  video?: OpenGraphVideo;
}

/**
 * @public
 */
export interface OpenGraphProfile {
  /**
   * Person's first name.
   */
  firstName?: string;

  /**
   * Person's last name.
   */
  lastName?: string;

  /**
   * Person's username.
   */
  username?: string;

  /**
   * Person's gender.
   */
  gender?: string;
}

/**
 * @public
 */
export interface OpenGraphBook {
  /**
   * The list of author names for the book.
   */
  authors?: string[];

  /**
   * The International Standard Book Number which identifies the book.
   *
   * @remarks
   *
   * An ISBN is essentially a product identifier used by publishers, booksellers, libraries, internet retailers and other supply chain participants for ordering, listing, sales records and stock control purposes. The ISBN identifies the registrant as well as the specific title, edition and format.
   */
  isbn?: string;

  /**
   * The books release date.
   */
  releaseDate?: string;

  /**
   * Tags used to further describe the book.
   */
  tags?: string[];
}

/**
 * @public
 */
export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;

  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * @public
 */
export interface OpenGraphVideo {
  actors?: OpenGraphVideoActors[];
  directors?: string[];
  writers?: string[];
  duration?: number;
  releaseDate?: string;
  tags?: string[];
  series?: string;
}

export type TwitterCardType =
  | 'summary'
  | 'summary_large_image'
  | 'app'
  | 'player';

/**
 * @public
 */
export interface Twitter {
  /**
   * `@username` for the content creator / author (outputs as `twitter:creator`).
   */
  handle?: string;

  /**
   * `@username` for the website used in the card footer.
   */
  site?: string;

  /**
   * The card type, which will be one of `summary`, `summary_large_image`,
   * `app`, or `player`.
   */
  cardType?: LiteralUnion<TwitterCardType, string>;
}

interface MobileAlternate {
  /**
   * Set what screen size the mobile website should be served from.
   */
  media: string;

  /**
   * Set the mobile page alternate url.
   */
  href: string;
}

interface LanguageAlternate {
  hrefLang: string;
  href: string;
}

interface HTMLAttributes {
  language?: string;
  prefix?: string;
}

/**
 * @public
 */
export interface BaseSeoProps {
  /**
   * Specifies the base URL to use for all relative URLs in a document. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
   */
  base?: BaseProps;

  /**
   * The language being used for the current page.
   *
   * This adds the `lang` attribute to the  `<html />` e.g. tag https://web.dev/html-has-lang/.
   */
  language?: string;

  /**
   * Set the meta title of the page
   */
  title?: string;

  /**
   * Allows you to set default title template that will be added to your title.
   *
   * @remarks
   *
   * Replaces `%s` with your title string
   *
   * ```js
   * title = 'This is my title';
   * titleTemplate = 'Gatsby SEO | %s';
   * // outputs: Gatsby SEO | This is my title
   * ```
   *
   * ```js
   * title = 'This is my title';
   * titleTemplate = '%s | Gatsby SEO';
   * // outputs: This is my title | Gatsby SEO
   * ```
   */
  titleTemplate?: string;

  /**
   * Sets whether page should be indexed or not.
   *
   * @remarks
   *
   * Setting this to `true` will set `noindex,follow` (to set `nofollow`, please
   * refer to [`nofollow`](#noFollow)). This works on a page by page basis. This
   * property works in tandem with the `nofollow` property and together they
   * populate the `robots` and `googlebot` meta tags. **Note:** The `noindex`
   * and the [`nofollow`](#noFollow) properties are a little different than all
   * the others in the sense that setting them as a default does not work as
   * expected. This is due to the fact Gatsby SEO already has a default of
   * `index,follow` because `gatsby-plugin-next-seo` is a SEO plugin after all.
   * So if you want to globally these properties, please see
   * [dangerouslySetAllPagesToNoIndex](#dangerouslySetAllPagesToNoIndex) and
   * [dangerouslySetAllPagesToNoFollow](#dangerouslySetAllPagesToNoFollow).
   *
   * **Example No Index on a single page:**
   *
   * If you have a single page that you want no indexed you can achieve this by:
   *
   * ```tsx
   * import React from 'react';
   * import { GatsbySeo } from 'gatsby-plugin-next-seo';
   *
   * export default () => (
   *   <>
   *     <GatsbySeo noindex={true} />
   *     <p>This page is no indexed</p>
   *   </>
   * );
   * ```
   */
  noindex?: boolean;

  /**
   * Sets whether page should be followed or not.
   *
   * @remarks
   *
   * Setting this to `true` will set `index,nofollow` (to set `noindex`, please
   * refer to [`noindex`](#noIndex)). This works on a page by page basis. This
   * property works in tandem with the `noindex` property and together they
   * populate the `robots` and `googlebot` meta tags.
   *
   * **Note:** The `noindex` and the [`nofollow`](#noFollow) properties are a
   * little different than all the others in the sense that setting them as a
   * default does not work as expected. This is due to the fact Gatsby SEO
   * already has a default of `index,follow` because `gatsby-plugin-next-seo` is
   * a SEO plugin after all. So if you want to globally these properties, please
   * see [dangerouslySetAllPagesToNoIndex](#dangerouslySetAllPagesToNoIndex) and
   * [dangerouslySetAllPagesToNoFollow](#dangerouslySetAllPagesToNoFollow).
   *
   * **Example No Follow on a single page:**
   *
   * If you have a single page that you want no indexed you can achieve this by:
   *
   * ```jsx
   * import React from 'react';
   * import { GatsbySeo } from 'gatsby-plugin-next-seo';
   *
   * export default () => (
   *   <>
   *     <GatsbySeo nofollow={true} />
   *     <p>This page is not followed</p>
   *   </>
   * );
   * ```
   */
  nofollow?: boolean;

  /**
   * Set the page meta description.
   */
  description?: string;

  /**
   * Set the page canonical url.
   *
   * @remarks
   *
   * Add this on a page per page basis when you want to consolidate duplicate
   * URLs.
   *
   * ```js
   * canonical = 'https://www.canonical.ie/';
   * ```
   */
  canonical?: string;

  /**
   * Mobile configuration object.
   *
   * @remarks
   *
   * This link relation is used to indicate a relation between a desktop and a
   * mobile website to search engines.
   *
   * Example:
   *
   * ```jsx
   * mobileAlternate={{
   *   media: 'only screen and (max-width: 640px)',
   *   href: 'https://m.canonical.ie',
   * }}
   * ```
   *
   * ```jsx
   * languageAlternate={{
   *   hrefLang: 'de-AT',
   *   href: 'https://www.canonical.ie/de',
   * }}
   * ```
   */
  mobileAlternate?: MobileAlternate;

  /**
   * Set the language of the alternate urls.
   */
  languageAlternates?: LanguageAlternate[];

  /**
   * The open graph configuration object.
   */
  openGraph?: OpenGraph;

  /**
   * Used for Facebook Insights, you must add a facebook app ID to your page to
   * for it.
   *
   * @remarks
   *
   * ```tsx
   * facebook={{
   *   appId: 1234567890,
   * }}
   * ```
   *
   */
  facebook?: { appId: string };

  /**
   * The twitter configuration object.
   *
   * @remarks
   *
   * Twitter will read the `og:title`, `og:image` and `og:description` tags for
   * their card, this is why `gatsby-plugin-next-seo` omits `twitter:title`,
   * `twitter:image` and `twitter:description` so not to duplicate.
   *
   * Some tools may report this an error. See [Issue
   * #14](https://github.com/garmeeh/gatsby-plugin-next-seo/issues/14)
   */
  twitter?: Twitter;

  /**
   * Allows you to add a meta tag that is not documented here.
   *
   * @remarks
   *
   * This allows you to add any other meta tags that are not covered in the
   * `config`.
   *
   * `content` is required. Then either `name` or `property`. (Only one on each)
   *
   * Example:
   *
   * ```js
   * metaTags={[{
   *   property: 'dc:creator',
   *   content: 'Jane Doe'
   * }, {
   *   name: 'application-name',
   *   content: 'GatsbySeo'
   * }]}
   * ```
   *
   * Invalid Examples:
   *
   * These are invalid as they contain `property` and `name` on the same entry.
   *
   * ```js
   * metaTags={[{
   *   property: 'dc:creator',
   *   name: 'dc:creator',
   *   content: 'Jane Doe'
   * }, {
   *   property: 'application-name',
   *   name: 'application-name',
   *   content: 'GatsbySeo'
   * }]}
   * ```
   */
  metaTags?: MetaProps[];

  /**
   * Allows you to add a link tag that is not documented here.
   */
  linkTags?: LinkProps[];

  /**
   * Allows you to add additional attributes to html tag besides language.
   */
  htmlAttributes?: HTMLAttributes;
}

/**
 * @public
 */
export interface DeferSeoProps {
  /**
   * Whether or not to defer the addition of the head tag.
   *
   * @defaultValue false
   */
  defer?: boolean;
}

/**
 * @public
 */
export interface GatsbySeoProps extends BaseSeoProps, DeferSeoProps {}

/**
 * @public
 */
export interface DefaultSeoProps {
  /**
   * It has the prefix of `dangerously` because it will `noindex` all pages. As
   * this is an SEO plugin, that is kinda dangerous action. It is **not** bad to
   * use this, just please be sure you want to `noindex` **EVERY** page. You can
   * still override this at a page level if you have a use case to `index` a
   * page. This can be done by setting `noindex: false`.
   */
  dangerouslySetAllPagesToNoIndex?: boolean;

  /**
   * It has the prefix of `dangerously` because it will `nofollow` all pages. As
   * this is an SEO plugin, that is kinda dangerous action. It is **not** bad to
   * use this, just please be sure you want to `nofollow` **EVERY** page. You
   * can still override this at a page level if you have a use case to `follow`
   * a page. This can be done by setting `nofollow: false`.
   */
  dangerouslySetAllPagesToNoFollow?: boolean;

  /**
   * The default open graph image width.
   */
  defaultOpenGraphImageWidth?: number;

  /**
   * The default open graph image height.
   */
  defaultOpenGraphImageHeight?: number;

  /**
   * The default open graph video width.
   */
  defaultOpenGraphVideoWidth?: number;

  /**
   * The default open graph video height.
   */
  defaultOpenGraphVideoHeight?: number;
}

/**
 * @public
 */
export interface AllSeoProps extends DefaultSeoProps, GatsbySeoProps {}

/**
 * @public
 */
export interface GatsbySeoPluginOptions extends DefaultSeoProps, BaseSeoProps {}

/**
 * @internal
 */
export interface OtherElementAttributes {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * @internal
 */
export type HtmlProps = JSX.IntrinsicElements['html'] & OtherElementAttributes;
/**
 * @internal
 */
export type BodyProps = JSX.IntrinsicElements['body'] & OtherElementAttributes;
/**
 * @internal
 */
export type LinkProps = JSX.IntrinsicElements['link'];
/**
 * @internal
 */
export type MetaProps = JSX.IntrinsicElements['meta'];
/**
 * @internal
 */
export type NoscriptProps = JSX.IntrinsicElements['noscript'];
/**
 * @internal
 */
export type ScriptProps = JSX.IntrinsicElements['script'];
/**
 * @internal
 */
export type StyleProps = JSX.IntrinsicElements['style'];
/**
 * @internal
 */
export type TitleProps = JSX.IntrinsicElements['title'];
/**
 * @internal
 */
export type BaseProps = JSX.IntrinsicElements['base'];
