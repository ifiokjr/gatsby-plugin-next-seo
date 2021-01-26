import React from 'react';

import { GatsbySeoProps } from '../types';
import { BaseSeo } from './base-seo';

/**
 * This component render the tags in the `<head>` for SEO on a per page basis.
 * As a bare minimum, you should add a title and description.
 *
 * @remarks
 *
 * ```tsx
 * import React from 'react';
 * import { GatsbySeo } from 'gatsby-plugin-next-seo';
 *
 * export default () => (
 *   <>
 *     <GatsbySeo title='Simple Usage Example' description='A short description goes here.' />
 *     <p>Simple Usage</p>
 *   </>
 * );
 * ```
 *
 * @public
 */
export const GatsbySeo = ({
  metaTags,
  linkTags,
  canonical,
  description,
  facebook,
  htmlAttributes,
  language,
  languageAlternates,
  mobileAlternate,
  nofollow,
  noindex,
  openGraph,
  title,
  titleTemplate,
  twitter,
}: GatsbySeoProps) => {
  return (
    <BaseSeo
      metaTags={metaTags}
      linkTags={linkTags}
      canonical={canonical}
      description={description}
      facebook={facebook}
      htmlAttributes={htmlAttributes}
      language={language}
      languageAlternates={languageAlternates}
      mobileAlternate={mobileAlternate}
      nofollow={nofollow}
      noindex={noindex}
      openGraph={openGraph}
      title={title}
      titleTemplate={titleTemplate}
      twitter={twitter}
    />
  );
};
