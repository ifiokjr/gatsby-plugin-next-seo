import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Thing, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';

export interface JsonLdProps<GThing extends Thing> extends DeferSeoProps {
  /**
   * The props which conform to the JSON-LD Specification.
   */
  json: WithContext<GThing>;
}

/**
 * Component that inline-includes a JSON-LD script where specified.
 *
 * @remarks
 *
 * ```tsx
 * import { Person } from 'schema-dts';
 *
 * <JsonLd<Person>
 *   item={{
 *     "@context": "https://schema.org",
 *     "@type": "Person",
 *     name: "Grace Hopper",
 *     alternateName: "Grace Brewster Murray Hopper",
 *     alumniOf: {
 *       "@type": "CollegeOrUniversity",
 *       name: ["Yale University", "Vassar College"]
 *     },
 *     knowsAbout: ["Compilers", "Computer Science"]
 *   }}
 * />
 * ```
 */
export const JsonLd = <GThing extends Thing>({ defer, json }: JsonLdProps<GThing>) => (
  <Helmet defer={defer}>
    <script type='application/ld+json'>{JSON.stringify(json, null, 2)}</script>
  </Helmet>
);
