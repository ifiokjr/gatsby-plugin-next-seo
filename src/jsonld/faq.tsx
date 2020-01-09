import React, { FC } from 'react';
import { FAQPage, Question as SchemaQuestion, WithContext } from 'schema-dts';

import { DeferSeoProps } from '../types';
import { Overrides } from '../utils/shared-types';
import { JsonLd } from './jsonld';

/**
 * The FAQPage JSON LD Component props.
 *
 * @public
 */
export interface FAQJsonLdProps extends DeferSeoProps, Overrides<FAQPage> {
  /**
   * An array of Question elements which comprise the list of answered questions
   * that this FAQPage is about.
   */
  questions: Question[];
}

/**
 * The questions and answers for an FAQ Page.
 *
 * @public
 */
export interface Question {
  /**
   * The full text of the question. For example, "How long does it take to
   * process a refund?".
   */
  question: string;

  /**
   * The answer to the question. There must be one answer per question.
   *
   * @remarks
   *
   * The answer may contain HTML content such as links and lists. Valid HTML
   * tags include: <h1> through <h6>, <br>, <ol>, <ul>, <li>, <a>, <p>, <div>,
   * <b>, <strong>, <i>, and <em>.
   */
  answer: string;
}

const transformMainEntity = (questions: Question[]): SchemaQuestion[] =>
  questions.map<SchemaQuestion>(({ question, answer }) => ({
    '@type': 'Question',
    acceptedAnswer: { '@type': 'Answer', text: answer },
    name: question,
  }));

/**
 * A Frequently Asked Question (FAQ) page contains a list of questions and
 * answers pertaining to a particular topic.
 *
 * @remarks
 *
 * Properly marked up FAQ pages may be eligible to have a rich result on Search
 * and voice assistants.
 *
 * ```tsx
 * import React from 'react';
 * import { FAQJsonLd } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <FAQJsonLd mainEntity={[{ question: 'What?', answer: 'Stand' }, { question:
 *       'How?', answer: 'Effort' }, { question: 'Why?', answer: 'Peace' },
 *       ]}
 *     />
 *
 *     <h1>What?</h1>
 *     <p>Stand</p>
 *
 *     <h1>How?</h1>
 *     <p>Effort</p>
 *
 *     <h1>Why?</h1>
 *     <p>Peace</p>
 *   </>
 * );
 * ```
 *
 * @public
 */
export const FAQJsonLd: FC<FAQJsonLdProps> = ({ questions: mainEntity, overrides = {}, defer = false }) => {
  const json: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: transformMainEntity(mainEntity),
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
