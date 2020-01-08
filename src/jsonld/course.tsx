import React, { FC } from 'react';
import { Course, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { JsonLd } from './jsonld';

/**
 * The Course JSON LD Component props.
 */
export interface CourseJsonLdProps extends DeferSeoProps {
  /**
   * @deprecated
   *
   * Use `name` instead.
   */
  courseName?: string;

  /**
   * The title of the course.
   */
  name?: string;

  /**
   * A description of the course. Display limit of 60 characters.
   */
  description: string;

  /**
   * The name of the provider.
   */
  providerName: string;

  /**
   * URL of a reference Web page that unambiguously indicates the item's
   * identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or
   * official website.
   */
  providerUrl?: string;

  /**
   * An overrides object with custom properties for the provided schema type
   * type.
   */
  overrides?: Course;
}

export const CourseJsonLd: FC<CourseJsonLdProps> = ({
  name,
  courseName,
  description,
  providerName,
  providerUrl,
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<Course> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: name ?? courseName,
    description: description,
    provider: providerName
      ? {
          '@type': 'Organization',
          name: providerName,
          sameAs: providerUrl,
        }
      : undefined,
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
