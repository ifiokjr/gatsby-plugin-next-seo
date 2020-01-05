module.exports = {
  siteMetadata: {
    title: 'gatsby-plugin-next-seo-example',
    description: 'An example project with gatsby-plugin-next-seo.',
    siteUrl: 'https://gatsby-plugin-next-seo.netlify.com',
    author: {
      name: 'Ifiok Jr.',
      url: 'https://twitter.com/ifiokjr',
      email: 'example@gmail.com',
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        title: 'Title A',
        titleTemplate: '%s | Gatsby SEO',
        description: 'Description A',
        canonical: 'https://www.canonical.ie/a',
        defaultOpenGraphImageHeight: 1200,
        defaultOpenGraphImageWidth: 1200,
        mobileAlternate: {
          media: 'only screen and (max-width: 640px)',
          href: 'https://m.canonical.ie',
        },
        languageAlternates: [
          {
            hrefLang: 'de-AT',
            href: 'https://www.canonical.ie/de',
          },
        ],
        openGraph: {
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title A',
          description: 'Open Graph Description A',
          images: [
            {
              url: 'https://www.test.ie/og-image-a-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt A',
            },
          ],
          site_name: 'SiteName A',
        },
        twitter: {
          handle: '@handlea',
          site: '@sitea',
          cardType: 'summary_large_image',
        },
        facebook: {
          appId: '1234567890',
        },
      },
    },
  ],
};
