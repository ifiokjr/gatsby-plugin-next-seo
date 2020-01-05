import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface NewsArticleJsonLdProps extends DeferSeoProps {
  url: string;
  title: string;
  images: readonly string[];
  section: string;
  keywords: string;
  dateCreated: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  description: string;
  body: string;
  publisherName: string;
  publisherLogo: string;
}

const NewsArticleJsonLd: FC<NewsArticleJsonLdProps> = ({
  url,
  title,
  images = [],
  section,
  keywords,
  datePublished,
  dateCreated = null,
  dateModified = null,
  authorName,
  description,
  body,
  publisherName,
  publisherLogo,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${images.map(image => `"${image}"`).toString()}
     ],
    "articleSection":"${section}",
    "keywords": "${keywords}",
    "datePublished": "${datePublished}",
    "dateCreated": "${dateCreated ?? datePublished}",
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
    "description": "${description}",
    "articleBody": "${body}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default NewsArticleJsonLd;
