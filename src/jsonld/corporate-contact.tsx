import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export interface ContactPoint {
  contactType: string;
  telephone: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}
export interface CorporateContactJsonLdProps extends DeferSeoProps {
  url: string;
  contactPoint: ContactPoint[];
  logo?: string;
}

const formatIfArray = (value: string[] | string) =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`).toString()}]` : `"${value}"`;

const buildContactPoint = (contactPoint: ContactPoint[]) =>
  contactPoint.map(
    contact => `{
    "@type": "ContactPoint",
    "telephone": "${contact.telephone}",
    "contactType": "${contact.contactType}"${
      contact.areaServed
        ? `,
    "areaServed": ${formatIfArray(contact.areaServed)}`
        : ''
    }${
      contact.availableLanguage
        ? `,
    "availableLanguage": ${formatIfArray(contact.availableLanguage)}`
        : ''
    }${
      contact.contactOption
        ? `,
    "contactOption": "${contact.contactOption.toString()}"`
        : ''
    }
    }`,
  );

/**
 * @deprecated
 *
 * See the
 * {@link https://developers.google.com/search/docs/data-types/corporate-contact | documentation}
 * with the reason for deprecation.
 */
export const CorporateContactJsonLd: FC<CorporateContactJsonLdProps> = ({
  url,
  logo,
  contactPoint,
  defer = false,
}) => {
  const jsonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    ${logo ? `"logo": "${logo}",` : ''}
    "contactPoint": [${buildContactPoint(contactPoint).toString()}]
  }`;

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{jsonld}</script>
    </Helmet>
  );
};
