import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface ArticleJsonLdProps extends DeferSeoProps {
  url: string;
  title: string;
  images: readonly string[];
  datePublished: string;
  dateModified?: string;
  authorName: string;
  description: string;
  publisherName: string;
  publisherLogo: string;
}

const ArticleJsonLd: FC<ArticleJsonLdProps> = ({
  url,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authorName,
  description,
  publisherName,
  publisherLogo,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${images.map(image => `"${image}"`).toString()}
     ],
    "datePublished": "${datePublished}",
    "dateModified": "${dateModified ?? datePublished}",
    "author": {
      "@type": "Person",
      "name": "${authorName}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${description}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default ArticleJsonLd;
