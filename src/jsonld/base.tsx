import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { DeferSeoProps } from '../types';

export const BaseJsonLd: FC<object & DeferSeoProps> = ({ defer, ...props }) => {
  const json = {
    '@context': 'https://schema.org',
    ...props,
  };

  return (
    <Helmet defer={defer}>
      <script type='application/ld+json'>{JSON.stringify(json, null, 2)}</script>
    </Helmet>
  );
};
