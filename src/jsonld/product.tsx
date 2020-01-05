import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';
import formatIfArray from '../utils/format-if-array';

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

interface Offers {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
}

interface AggregateRating {
  ratingValue: string;
  reviewCount: string;
}
export interface ProductJsonLdProps extends DeferSeoProps {
  productName: string;
  images?: string[];
  description?: string;
  brand?: string;
  reviews?: Review[];
  aggregateRating?: AggregateRating;
  offers: Offers;
  sku?: string;
  gtin8?: string;
  gtin13?: string;
  gtin14?: string;
  mpn?: string;
}

const buildBrand = (brand: string) => `
  "brand": {
      "@type": "Thing",
      "name": "${brand}"
    },
`;

const buildReviewRating = (rating: ReviewRating) =>
  rating
    ? `"reviewRating": {
          "@type": "Rating",
          ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
          ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
          "ratingValue": "${rating.ratingValue}"
        },`
    : '';

const buildReviews = (reviews: Review[]) => `
"review": [
  ${reviews
    .map(
      review => `{
      "@type": "Review",
      ${review.datePublished ? `"datePublished": "${review.datePublished}",` : ''}
      ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
      ${review.name ? `"name": "${review.name}",` : ''}
      ${buildReviewRating(review.reviewRating)}
      "author": "${review.author}"
  }`,
    )
    .toString()}],`;

const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "reviewCount": "${aggregateRating.reviewCount}"
    },
`;

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
const buildOffers = (offers: Offers) => `
  "offers": {
    "@type": "Offer",
    "priceCurrency": "${offers.priceCurrency}",
    ${offers.priceValidUntil ? `"priceValidUntil": "${offers.priceValidUntil}",` : ''}
    ${offers.itemCondition ? `"itemCondition": "${offers.itemCondition}",` : ''}
    ${offers.availability ? `"availability": "${offers.availability}",` : ''}
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${offers.seller.name}"
    },
    `
        : ''
    }
    "price": "${offers.price}"
  },
`;

const ProductJsonLd: FC<ProductJsonLdProps> = ({
  productName,
  images = [],
  description,
  sku,
  gtin8,
  gtin13,
  gtin14,
  mpn,
  brand,
  reviews = [],
  aggregateRating,
  offers,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org/",
    "@type": "Product",
    "image":${formatIfArray(images)},
    ${description ? `"description": "${description}",` : ''}
    ${mpn ? `"mpn": "${mpn}",` : ''}
    ${sku ? `"sku": "${sku}",` : ''}
    ${gtin8 ? `"gtin8": "${gtin8}",` : ''}
    ${gtin13 ? `"gtin13": "${gtin13}",` : ''}
    ${gtin14 ? `"gtin14": "${gtin14}",` : ''}
    ${brand ? buildBrand(brand) : ''}
    ${reviews.length ? buildReviews(reviews) : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${offers ? buildOffers(offers) : ''}
    "name": "${productName}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default ProductJsonLd;
