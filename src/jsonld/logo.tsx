import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface LogoJsonLdProps extends DeferSeoProps {
  logo: string;
  url: string;
}

const LogoJsonLd: FC<LogoJsonLdProps> = ({ url, logo, defer = false }) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${logo}"
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default LogoJsonLd;
