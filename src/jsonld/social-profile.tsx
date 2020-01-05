import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface SocialProfileJsonLdProps extends DeferSeoProps {
  type: string;
  name: string;
  url: string;
  sameAs: string[];
}

const SocialProfileJsonLd: FC<SocialProfileJsonLdProps> = ({
  type,
  name,
  url,
  sameAs = [],
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "name": "${name}",
    "url": "${url}",
    "sameAs": [
      ${sameAs.map(socialUrl => `"${socialUrl}"`).toString()}
     ]
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default SocialProfileJsonLd;
