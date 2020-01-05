import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface BreadCrumbJsonLdProps extends DeferSeoProps {
  itemListElements: ItemListElements[];
}

const BreadCrumbJsonLd: FC<BreadCrumbJsonLdProps> = ({ itemListElements = [], defer = false }) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements
        .map(
          itemListElement => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "item": {
          "@id": "${itemListElement.item}",
          "name": "${itemListElement.name}"
        }
      }`,
        )
        .toString()}
     ]
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default BreadCrumbJsonLd;
