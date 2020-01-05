import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface BlogJsonLdProps extends DeferSeoProps {
  url: string;
  title: string;
  images: readonly string[];
  datePublished: string;
  dateModified: string;
  authorName: string;
  description: string;
}

const BlogJsonLd: FC<BlogJsonLdProps> = ({
  url,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authorName,
  description,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "Blog",
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
    "description": "${description}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default BlogJsonLd;
