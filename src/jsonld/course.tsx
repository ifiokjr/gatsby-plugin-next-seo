import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface CourseJsonLdProps extends DeferSeoProps {
  courseName: string;
  description: string;
  providerName: string;
  providerUrl?: string;
}

const CourseJsonLd: FC<CourseJsonLdProps> = ({
  courseName,
  description,
  providerName,
  providerUrl,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "http://schema.org",
    "@type": "Course",
    "name": "${courseName}",
    "description": "${description}",
    "provider": {
      "@type": "Organization",
      "name": "${providerName}"${
    providerUrl
      ? `,
      "sameAs": "${providerUrl}"`
      : ''
  }
    }
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};

export default CourseJsonLd;
