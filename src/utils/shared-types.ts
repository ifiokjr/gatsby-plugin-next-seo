import { Thing } from 'schema-dts';

export interface AggregateRating {
  /**
   * The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed.
   */
  bestRating?: number | string;

  /**
   * A short explanation (e.g. one to two sentences) providing background context and other information that led to the conclusion expressed in the rating. This is particularly applicable to ratings associated with "fact check" markup using {@link http://schema.org/ClaimReview ClaimReview}.
   */
  ratingExplanation?: string;

  /**
   * The rating for the content.
   *
   * Usage guidelines:
   *
   * - Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similiar Unicode symbols.
   * - Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator.
   */
  ratingValue?: number | string;

  /**
   * This Review or Rating is relevant to this part or facet of the itemReviewed.
   */
  reviewAspect?: string;

  /**
   * The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed.
   */
  worstRating?: number | string;

  /**
   * The count of total number of ratings.
   */
  ratingCount?: number;

  /**
   * The count of total number of reviews.
   */
  reviewCount?: number;
}

export interface Speakable {
  /**
   * Addresses content in the annotated pages (such as class attribute).
   *
   * @remarks
   *
   * Use either cssSelector or xPath; don't use both. For example:
   *
   * ```ts
   * cssSelector: ["headline", "summary"]
   * ```
   */
  cssSelector?: string[];

  /**
   * Addresses content using xPaths (assuming an XML view of the content).
   *
   * @remarks
   *
   * Use either
   * cssSelector or xPath; don't use both. For example:
   *
   * ```ts
   * xPath: '/html/head/title'
   * ```
   */
  xpath?: string[];
}
