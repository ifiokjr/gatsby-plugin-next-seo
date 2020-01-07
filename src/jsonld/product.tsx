import React, { FC } from 'react';
import { Offer as RawOffer, Product, Review as RawReview, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { BaseJsonLd } from './base';
import { AggregateRating } from './shared-internal-types';

interface ReviewRating {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
}

interface Review {
  author: string;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  reviewRating: ReviewRating;
}

type RawOfferAvailability = Extract<RawOffer['availability'], string>;
type OfferAvailability =
  | 'Discontinued'
  | 'InStock'
  | 'InStoreOnly'
  | 'LimitedAvailability'
  | 'OnlineOnly'
  | 'OutOfStock'
  | 'PreOrder'
  | 'PreSale'
  | 'SoldOut';
type RawItemCondition = Extract<RawOffer['itemCondition'], string>;
type ItemCondition = 'DamagedCondition' | 'NewCondition' | 'RefurbishedCondition' | 'UsedCondition';

const availabilityConverter = {
  Discontinued: 'http://schema.org/Discontinued',
  InStock: 'http://schema.org/InStock',
  InStoreOnly: 'http://schema.org/InStoreOnly',
  LimitedAvailability: 'http://schema.org/LimitedAvailability',
  OnlineOnly: 'http://schema.org/OnlineOnly',
  OutOfStock: 'http://schema.org/OutOfStock',
  PreOrder: 'http://schema.org/PreOrder',
  PreSale: 'http://schema.org/PreSale',
  SoldOut: 'http://schema.org/SoldOut',
} as const;

const itemConditionConverter = {
  DamagedCondition: 'http://schema.org/DamagedCondition',
  NewCondition: 'http://schema.org/NewCondition',
  RefurbishedCondition: 'http://schema.org/RefurbishedCondition',
  UsedCondition: 'http://schema.org/UsedCondition',
} as const;

const getAvailability = (availability: OfferAvailability | undefined): RawOfferAvailability | undefined =>
  availability ? availabilityConverter[availability] : undefined;
const getItemCondition = (itemCondition: ItemCondition | undefined): RawItemCondition | undefined =>
  itemCondition ? itemConditionConverter[itemCondition] : undefined;

interface Offers {
  /**
   * The price of the product.
   */
  price: string;

  /**
   * The currency used to describe the product price, in three-letter ISO 4217
   * format.
   */
  priceCurrency: string;

  /**
   * The date (in ISO 8601 date format) after which the price will no longer be
   * available.
   *
   * @remarks
   *
   * Your product snippet may not display if the priceValidUtil property
   * indicates a past date.
   */
  priceValidUntil?: string;
  itemCondition?: ItemCondition;

  /**
   * Value is taken from a constrained list of options, expressed in markup
   * using URL links.
   *
   * @remarks
   *
   * Google also understands their short names (for example InStock or
   * OutOfStock, without the full URL scope.) This property is required for the
   * Related Items feature in Google Images and is recommended for Google
   * Search.
   */
  availability?: OfferAvailability;

  /**
   * A URL to the product web page (that includes the Offer).
   */
  url?: string;

  /**
   * The person or organization selling the good.
   */
  seller?: {
    type?: 'Person' | 'Organization';
    name: string;
  };
}

/**
 * Component props for the Product JSON LD.
 */
export interface ProductJsonLdProps extends DeferSeoProps {
  /**
   * @deprecated
   *
   * Use `name` instead.
   */
  productName?: string;

  /**
   * The name of the product.
   */
  name?: string;

  /**
   * The URL(s) of a product photo. Pictures clearly showing the product (for
   * example, against a white background) are preferred.
   *
   * @remarks
   *
   * This property is required for Google Images and recommended for Google
   * Search.
   *
   * Additional image guidelines:
   *
   * - Every page must contain at least one image (whether or not you include
   *   markup). Google will pick the best image to display in Search results
   *   based on the aspect ratio and resolution.
   * - Image URLs must be crawlable and indexable.
   * - Images must represent the marked up content.
   * - Images must be in .jpg, .png, or. gif format.
   * - For best results, provide multiple high-resolution images (minimum of 50K
   *   pixels when multiplying width and height) with the following aspect
   *   ratios: 16x9, 4x3, and 1x1.
   *
   * For example:
   *
   * ```js
   * const props = {
   *     "image": ["https://example.com/photos/1x1/photo.jpg",
   *     "https://example.com/photos/4x3/photo.jpg",
   *     "https://example.com/photos/16x9/photo.jpg"
   *   ]
   * }
   * ```
   */
  images?: string | string[];

  /**
   * Product description.
   */
  description?: string;

  /**
   * The brand of the product.
   */
  brand?: string;

  /**
   * A nested Review of the product.
   *
   * @remarks
   *
   * Follow the
   * {@link https://developers.google.com/search/docs/data-types/review-snippet#guidelines | Review snippet guidelines}
   * and the list of required and recommended
   * {@link https://developers.google.com/search/docs/data-types/review-snippet#review-properties | review properties}.
   */
  reviews?: Review[];

  /**
   * A nested aggregateRating of the product.
   */
  aggregateRating?: AggregateRating;

  /**
   * An offer to sell the product. Includes a nested Offer or AggregateOffer.
   */
  offers?: Offers;

  offersType?: 'Offer' | 'AggregateOffer';

  /**
   * A Global Trade Item Number
   * ({@link https://www.gs1.org/standards/id-keys/gtin GTIN}).
   *
   * @remarks
   *
   * GTINs identify trade items, including products and services, using numeric
   * identification codes. The {@link http://schema.org/gtin gtin} property
   * generalizes the earlier {@link http://schema.org/gtin8 gtin8},
   * {@link http://schema.org/gtin12 gtin12},
   * {@link http://schema.org/gtin13 gtin13}, and
   * {@link http://schema.org/gtin14 gtin14} properties. The GS1
   * {@link https://www.gs1.org/standards/Digital-Link/ digital link specifications}
   * express GTINs as URLs. A correct {@link http://schema.org/gtin gtin} value
   * should be a valid GTIN, which means that it should be an all-numeric string
   * of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such
   * a string. The numeric component should also have a
   * {@link https://www.gs1.org/services/check-digit-calculator valid GS1 check digit}
   * and meet the other rules for valid GTINs. See also
   * {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1's GTIN Summary}
   * and
   * {@link https://en.wikipedia.org/wiki/Global_Trade_Item_Number Wikipedia}
   * for more details. Left-padding of the gtin values is not required or
   * encouraged.
   */
  gtin?: string | string[];

  /**
   * The GTIN-12 code of the product, or the product to which the offer refers.
   *
   * @remarks
   *
   * The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C.
   * Company Prefix, Item Reference, and Check Digit used to identify trade
   * items. See
   * {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary}
   * for more details.
   */
  gtin12?: string | string[];

  /**
   * The GTIN-13 code of the product, or the product to which the offer refers.
   *
   * @remarks
   *
   * This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit
   * UPC codes can be converted into a GTIN-13 code by simply adding a
   * preceeding zero. See
   * {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary}
   * for more details.
   */
  gtin13?: string | string[];
  /**
   * The GTIN-14 code of the product, or the product to which the offer refers.
   *
   * @remarks
   *
   * See
   * {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary}
   * for more details.
   */
  gtin14?: string | string[];

  /**
   * The {@link http://apps.gs1.org/GDD/glossary/Pages/GTIN-8.aspx GTIN-8} code
   * of the product, or the product to which the offer refers.
   *
   * @remarks
   *
   * This code is also known as EAN/UCC-8 or 8-digit EAN. See
   * {@link http://www.gs1.org/barcodes/technical/idkeys/gtin GS1 GTIN Summary}
   * for more details.
   *
   */
  gtin8?: string | string[];

  /**
   * The Manufacturer Part Number (MPN) of the product, or the product to which
   * the offer refers.
   */
  mpn?: string | string[];

  /**
   * The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a
   * product or service, or the product to which the offer refers.
   */
  sku?: string | string[];

  /**
   * An overrides object with custom properties for the provided schema type
   * type.
   */
  overrides?: Product;
}

/**
 * Add markup to your product pages so Google can provide detailed product
 * information in rich Search results — including Google Images.
 *
 * @remarks
 *
 * Users can see price, availability, and review ratings right on Search
 * results.
 */
export const ProductJsonLd: FC<ProductJsonLdProps> = ({
  name,
  productName,
  images = [],
  description,
  sku,
  gtin12,
  gtin,
  gtin8,
  gtin13,
  gtin14,
  mpn,
  brand,
  reviews = [],
  aggregateRating,
  offers,
  offersType = 'Offer',
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name ?? productName,
    image: images,
    sku,
    gtin,
    gtin8,
    gtin12,
    gtin13,
    gtin14,
    mpn,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    description,
    review: reviews.map<RawReview>(({ reviewRating, ...review }) => ({
      '@type': 'Review',
      ...review,
      reviewRating: { '@type': 'Rating', ...reviewRating },
    })),
    aggregateRating: aggregateRating ? { '@type': 'AggregateRating', ...aggregateRating } : undefined,
    offers: offers
      ? {
          '@type': offersType as any,
          ...offers,
          availability: getAvailability(offers.availability),
          itemCondition: getItemCondition(offers.itemCondition),
          seller: offers.seller
            ? {
                '@type': (offers.seller.type as any) ?? 'Organization',
                name: offers.seller.name,
              }
            : undefined,
        }
      : undefined,
    ...overrides,
  };

  return <BaseJsonLd defer={defer} {...json} />;
};
