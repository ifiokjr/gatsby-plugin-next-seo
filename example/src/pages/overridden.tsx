import { GatsbySeo } from 'gatsby-plugin-next-seo';
import React from 'react';

import { Links } from '../components/links';

const Overridden = () => (
  <>
    <GatsbySeo
      noindex={true}
      nofollow={true}
      title='Title B'
      description='Description B'
      canonical='https://www.canonical.ie/b'
      language='en'
      languageAlternates={[
        {
          hrefLang: 'de-AT',
          href: 'https://www.canonical.ie/de',
        },
      ]}
      mobileAlternate={{
        media: 'only screen and (max-width: 640px)',
        href: 'https://m.canonical.ie',
      }}
      openGraph={{
        url: 'https://www.url.ie/b',
        title: 'Open Graph Title B',
        description: 'Open Graph Description B',
        images: [
          {
            url: 'https://www.test.ie/og-image-b-01.jpg',
            width: 850,
            height: 650,
            alt: 'Og Image Alt B',
          },
          {
            url: 'https://www.test.ie/og-image-b-02.jpg',
            width: 950,
            height: 850,
            alt: 'Og Image Alt B Second',
          },
          { url: 'https://www.test.ie/og-image-b-03.jpg' },
          { url: 'https://www.test.ie/og-image-b-04.jpg' },
        ],
        videos: [
          {
            url: 'https://www.test.ie/og-video-b-01.jpg',
            width: 850,
            height: 650,
            alt: 'Og Video Alt B',
          },
          {
            url: 'https://www.test.ie/og-video-b-02.jpg',
            width: 950,
            height: 850,
            alt: 'Og Video Alt B Second',
          },
          { url: 'https://www.test.ie/og-video-b-03.jpg' },
          { url: 'https://www.test.ie/og-video-b-04.jpg' },
        ],
        site_name: 'SiteName B',
      }}
      twitter={{
        handle: '@handleb',
        site: '@siteb',
        cardType: 'summary_large_image',
      }}
      facebook={{
        appId: '987654321',
      }}
    />
    <h1>Overridden Seo</h1>
    <Links />
  </>
);

export default Overridden;
