import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';
import formatIfArray from '../utils/format-if-array';

interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
}

interface Geo {
  latitude: string;
  longitude: string;
}

interface Rating {
  ratingValue: string;
  ratingCount: string;
}
export interface LocalBusinessJsonLdProps extends DeferSeoProps {
  type: string;
  id: string;
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address: Address;
  geo: Geo;
  images: string[];
  rating?: Rating;
  priceRange?: string;
}

const buildGeo = (geo: Geo) => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildAddress = (address: Address) => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${address.streetAddress}",
    "addressLocality": "${address.addressLocality}",
    ${address.addressRegion ? `"addressRegion": "${address.addressRegion}",` : ''}
    "postalCode": "${address.postalCode}",
    "addressCountry": "${address.addressCountry}"
  },
`;

const buildRating = (rating: Rating) => `
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${rating.ratingValue}",
    "ratingCount": "${rating.ratingCount}"
  },
`;

const LocalBusinessJsonLd: FC<LocalBusinessJsonLdProps> = ({
  type,
  id,
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  rating,
  priceRange,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "@id": "${id}",
    ${description ? `"description": "${description}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${telephone ? `"telephone": "${telephone}",` : ''}
    ${buildAddress(address)}
    ${geo ? `${buildGeo(geo)}` : ''}
    ${rating ? `${buildRating(rating)}` : ''}
    ${priceRange ? `"priceRange": "${priceRange}",` : ''}
    "image":${formatIfArray(images)},
    "name": "${name}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default LocalBusinessJsonLd;
