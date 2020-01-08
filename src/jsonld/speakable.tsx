import React, { FC } from 'react';
import { SpeakableSpecification, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { Speakable } from '../utils/shared-types';
import { JsonLd } from './jsonld';

/**
 * The Speakable JSON LD Component props.
 */
export interface SpeakableJsonLdProps extends DeferSeoProps, Speakable {
  /**
   * An overrides object with custom properties for the provided schema type
   * type.
   */
  overrides?: SpeakableSpecification;
}

/**
 * The speakable schema.org property identifies sections within an article or
 * webpage that are best suited for audio playback using text-to-speech (TTS).
 *
 * @remarks
 *
 * Adding markup allows search engines and other applications to identify
 * content to read aloud on Google Assistant-enabled devices using TTS. Webpages
 * with speakable structured data can use the Google Assistant to distribute the
 * content through new channels and reach a wider base of users.
 *
 * ``` tsx
 * const Component = () => <SpeakableJsonLd cssSelector={['#abc', '#root']} />;
 * ```
 *
 * @beta
 */
export const SpeakableJsonLd: FC<SpeakableJsonLdProps> = ({
  xpath,
  cssSelector,
  overrides = {},
  defer = false,
}) => {
  if (xpath && cssSelector) {
    throw new Error('Speakable should use either xpath or the cssSelector, not both.');
  }

  const json: WithContext<SpeakableSpecification> = {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector,
    xpath,
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
