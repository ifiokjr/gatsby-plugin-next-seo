import { getByText, render as testRender } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { __resetDefaults, BaseSeo } from '../base-seo';

const SEO = {
  title: 'This is a test title.',
  language: 'en-GB',
  description: 'This is a test description.',
  canonical: 'https://www.canonical.ie',
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
    {
      hrefLang: 'sk-SK',
      href: 'https://www.canonical.ie/sk',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie',
    title: 'Open graph title',
    description: 'This is testing og:description.',
    images: [
      {
        url: 'https://www.test.ie/image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Alt text right here',
      },
      { url: 'https://www.test.ie/image-02.jpg' },
      { url: 'https://www.test.ie/image-03.jpg' },
      { url: 'https://www.test.ie/image-04.jpg' },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: '1234567890',
  },
};

const render = (ui: ReactElement) =>
  testRender(ui, { wrapper: HelmetProvider });

beforeEach(__resetDefaults);

test('renders correctly', () => {
  render(<BaseSeo {...SEO} />);
  expect(document.documentElement).toMatchSnapshot();
});

test('returns full array for default seo object', () => {
  render(<BaseSeo {...SEO} />);

  expect(document.querySelector('html')?.getAttribute('lang')).toBe(
    SEO.language,
  );

  const title = getByText(
    document.documentElement,
    (content, element) =>
      element.tagName.toLowerCase() === 'title' &&
      content.startsWith(`${SEO.title}`),
  );
  const index = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const description = document.documentElement.querySelectorAll(
    `meta[content="${SEO.description}"]`,
  );
  const descriptionTag = document.documentElement.querySelectorAll(
    'meta[name="description"]',
  );
  const twitterCard = document.documentElement.querySelectorAll(
    'meta[content="summary_large_image"]',
  );
  const facebookAppId = document.documentElement.querySelectorAll(
    'meta[property="fb:app_id"]',
  );
  const twitterCardTag = document.documentElement.querySelectorAll(
    'meta[name="twitter:card"]',
  );
  const twitterHandle = document.documentElement.querySelectorAll(
    `meta[content="${SEO.twitter.handle}"]`,
  );
  const twitterHandleTag = document.documentElement.querySelectorAll(
    'meta[name="twitter:creator"]',
  );
  const twitterSite = document.documentElement.querySelectorAll(
    `meta[content="${SEO.twitter.site}"]`,
  );
  const twitterSiteTag = document.documentElement.querySelectorAll(
    'meta[name="twitter:site"]',
  );
  const ogUrl = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.url}"]`,
  );
  const ogUrlTag = document.documentElement.querySelectorAll(
    'meta[property="og:url"]',
  );
  const ogType = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.type}"]`,
  );
  const ogTypeTag = document.documentElement.querySelectorAll(
    'meta[property="og:type"]',
  );
  const ogTitle = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.title}"]`,
  );
  const ogTitleTag = document.documentElement.querySelectorAll(
    'meta[property="og:title"]',
  );
  const ogDescription = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.description}"]`,
  );
  const ogDescriptionTag = document.documentElement.querySelectorAll(
    'meta[property="og:description"]',
  );
  const ogImage00 = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].url}"]`,
  );
  const ogImage01 = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[1].url}"]`,
  );
  const ogImage02 = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[2].url}"]`,
  );
  const ogImage03 = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[3].url}"]`,
  );
  const ogDefaultImageWidthHeight = document.documentElement.querySelectorAll(
    `meta[content="${SEO.defaultOpenGraphImageHeight}"]`,
  );
  const ogSetImageHeight = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].height}"]`,
  );
  const ogSetImageWidth = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].width}"]`,
  );
  const ogSetImageAlt = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].alt}"]`,
  );
  const ogLocale = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.locale}"]`,
  );
  const ogSiteName = document.documentElement.querySelectorAll(
    `meta[content="${SEO.openGraph.site_name}"]`,
  );

  const mobileAlternateTag = document.documentElement.querySelectorAll(
    'link[rel="alternate"][media]',
  );
  const mobileAlternateHref = document.documentElement.querySelectorAll(
    `link[href="${SEO.mobileAlternate.href}"]`,
  );
  const mobileAlternateMedia = document.documentElement.querySelectorAll(
    `link[media="${SEO.mobileAlternate.media}"]`,
  );

  expect(Array.from(mobileAlternateTag).length).toBe(1);
  expect(Array.from(mobileAlternateHref).length).toBe(1);
  expect(Array.from(mobileAlternateMedia).length).toBe(1);

  const languageAlternatesTags = document.documentElement.querySelectorAll(
    'link[rel="alternate"][hrefLang]',
  );
  expect(Array.from(languageAlternatesTags).length).toBe(
    SEO.languageAlternates.length,
  );

  SEO.languageAlternates.forEach((_, idx) => {
    const languageAlternateHref = document.documentElement.querySelectorAll(
      `link[href="${SEO.languageAlternates[idx].href}"]`,
    );
    const languageAlternateHrefLang = document.documentElement.querySelectorAll(
      `link[hrefLang="${SEO.languageAlternates[idx].hrefLang}"]`,
    );

    expect(Array.from(languageAlternateHref).length).toBe(1);
    expect(Array.from(languageAlternateHrefLang).length).toBe(1);
  });

  expect(title).toBeDefined();
  expect(Array.from(index).length).toBe(2);
  expect(Array.from(description).length).toBe(1);
  expect(Array.from(descriptionTag).length).toBe(1);
  expect(Array.from(facebookAppId).length).toBe(1);
  expect(Array.from(twitterCard).length).toBe(1);
  expect(Array.from(twitterCardTag).length).toBe(1);
  expect(Array.from(twitterHandle).length).toBe(1);
  expect(Array.from(twitterHandleTag).length).toBe(1);
  expect(Array.from(twitterSite).length).toBe(1);
  expect(Array.from(twitterSiteTag).length).toBe(1);
  expect(Array.from(ogUrl).length).toBe(1);
  expect(Array.from(ogUrlTag).length).toBe(1);
  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogTitle).length).toBe(1);
  expect(Array.from(ogTitleTag).length).toBe(1);
  expect(Array.from(ogDescription).length).toBe(1);
  expect(Array.from(ogDescriptionTag).length).toBe(1);
  expect(Array.from(ogImage00).length).toBe(1);
  expect(Array.from(ogImage01).length).toBe(1);
  expect(Array.from(ogImage02).length).toBe(1);
  expect(Array.from(ogImage03).length).toBe(1);
  expect(Array.from(ogDefaultImageWidthHeight).length).toBe(6);
  expect(Array.from(ogSetImageHeight).length).toBe(1);
  expect(Array.from(ogSetImageWidth).length).toBe(1);
  expect(Array.from(ogSetImageAlt).length).toBe(1);
  expect(Array.from(ogLocale).length).toBe(1);
  expect(Array.from(ogSiteName).length).toBe(1);
});

test('correctly sets noindex', () => {
  const overrideProps = {
    ...SEO,
    noindex: true,
  };
  render(<BaseSeo {...overrideProps} />);
  const index = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const noindex = document.documentElement.querySelectorAll(
    'meta[content="noindex,follow"]',
  );

  expect(Array.from(index).length).toBe(0);
  expect(Array.from(noindex).length).toBe(2);
});

test('correctly sets nofollow', () => {
  const overrideProps = {
    ...SEO,
    nofollow: true,
  };
  render(<BaseSeo {...overrideProps} />);
  const indexfollow = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const indexnofollow = document.documentElement.querySelectorAll(
    'meta[content="index,nofollow"]',
  );

  expect(Array.from(indexfollow).length).toBe(0);
  expect(Array.from(indexnofollow).length).toBe(2);
});

test('correctly sets noindex, nofollow', () => {
  const overrideProps = {
    ...SEO,
    noindex: true,
    nofollow: true,
  };
  render(<BaseSeo {...overrideProps} />);
  const indexfollow = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const noindexnofollow = document.documentElement.querySelectorAll(
    'meta[content="noindex,nofollow"]',
  );

  expect(Array.from(indexfollow).length).toBe(0);
  expect(Array.from(noindexnofollow).length).toBe(2);
});

test('displays title with titleTemplate integrated', () => {
  const template = 'Gatsby SEO';
  const overrideProps = {
    ...SEO,
    titleTemplate: `${template} | %s`,
  };
  render(<BaseSeo {...overrideProps} />);
  const title = getByText(
    document.documentElement,
    (content, element) =>
      element.tagName.toLowerCase() === 'title' && content.startsWith(template),
  );
  expect(title.innerHTML).toMatch(`${template} | ${SEO.title}`);
});

test('og:title fallback uses titleTemplate', () => {
  const template = 'Gatsby SEO';
  const overrideProps = {
    ...SEO,
    titleTemplate: `${template} | %s`,
    openGraph: {},
  };
  render(<BaseSeo {...overrideProps} />);
  const ogTitleTag = document.documentElement.querySelector(
    'meta[property="og:title"]',
  );
  expect(ogTitleTag).toBeTruthy();
  expect(ogTitleTag?.getAttribute('content')).toMatch(
    `${template} | ${SEO.title}`,
  );
});

test('BaseSeo respects the nesting/overriding behaviour of React Helmet', () => {
  const template = 'Gatsby SEO';
  const title = 'Example Title';
  const exampleUrlBase = 'https://example.com';
  const exampleUrlOverride = 'https://examp2le.com';
  render(
    <>
      <BaseSeo
        title={title}
        titleTemplate={`${template} | %s`}
        openGraph={{ url: exampleUrlBase }}
      />
      <div>
        <div>
          <BaseSeo openGraph={{ url: exampleUrlOverride }} />
        </div>
      </div>
    </>,
  );

  // <title> tag is not overridden
  const titleElement = getByText(
    document.documentElement,
    (content, element) =>
      element.tagName.toLowerCase() === 'title' && content.startsWith(template),
  );
  expect(titleElement.innerHTML).toMatch(`${template} | ${title}`);

  // og:title is not overridden, uses fallback with titleTemplate
  const ogTitleTag = document.documentElement.querySelector(
    'meta[property="og:title"]',
  );
  expect(ogTitleTag).toBeTruthy();
  expect(ogTitleTag?.getAttribute('content')).toMatch(`${template} | ${title}`);

  // og:url is overriden
  const ogUrlTag = document.documentElement.querySelector(
    'meta[property="og:url"]',
  );
  expect(ogUrlTag).toBeTruthy();
  expect(ogUrlTag?.getAttribute('content')).toEqual(exampleUrlOverride);
});

const ArticleSEO = {
  title: 'Article Page Title',
  description: 'Description of article page',
  openGraph: {
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
      publishedTime: '2017-06-21T23:04:13Z',
      modifiedTime: '2018-01-21T18:04:43Z',
      expirationTime: '2022-12-21T22:04:11Z',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      section: 'Section II',
      tags: ['Tag A', 'Tag B'],
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-article-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Article Title A',
      },
      {
        url: 'https://www.test.ie/og-image-article-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Article Title B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

test('Article SEO renders correctly', () => {
  render(<BaseSeo {...ArticleSEO} />);
  expect(document.documentElement).toMatchSnapshot();
});

test('Check article og type meta', () => {
  render(<BaseSeo {...ArticleSEO} />);

  const ogType = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.type}"]`,
  );
  const ogTypeTag = document.documentElement.querySelectorAll(
    'meta[property="og:type"]',
  );
  const ogArticlePublishedTime = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.publishedTime}"]`,
  );
  const ogArticlePublishedTimeTag = document.documentElement.querySelectorAll(
    'meta[property="article:published_time"]',
  );
  const ogArticleModifiedTime = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.modifiedTime}"]`,
  );
  const ogArticleModifiedTimeTag = document.documentElement.querySelectorAll(
    'meta[property="article:modified_time"]',
  );
  const ogArticleExpirationTime = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.expirationTime}"]`,
  );
  const ogArticleExpirationTimeTag = document.documentElement.querySelectorAll(
    'meta[property="article:expiration_time"]',
  );
  const ogArticleAuthor00 = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.authors[0]}"]`,
  );
  const ogArticleAuthor01 = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.authors[1]}"]`,
  );
  const ogArticleSection = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.section}"]`,
  );
  const ogArticleSectionTag = document.documentElement.querySelectorAll(
    'meta[property="article:section"]',
  );
  const ogArticleTags00 = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.tags[0]}"]`,
  );
  const ogArticleTags01 = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.tags[1]}"]`,
  );

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogArticlePublishedTime).length).toBe(1);
  expect(Array.from(ogArticlePublishedTimeTag).length).toBe(1);
  expect(Array.from(ogArticleModifiedTime).length).toBe(1);
  expect(Array.from(ogArticleModifiedTimeTag).length).toBe(1);
  expect(Array.from(ogArticleExpirationTime).length).toBe(1);
  expect(Array.from(ogArticleExpirationTimeTag).length).toBe(1);
  expect(Array.from(ogArticleAuthor00).length).toBe(1);
  expect(Array.from(ogArticleAuthor01).length).toBe(1);
  expect(Array.from(ogArticleSection).length).toBe(1);
  expect(Array.from(ogArticleSectionTag).length).toBe(1);
  expect(Array.from(ogArticleTags00).length).toBe(1);
  expect(Array.from(ogArticleTags01).length).toBe(1);
});

const BookSEO = {
  title: 'Book Page Title',
  description: 'Description of book page',
  openGraph: {
    title: 'Open Graph Book Title',
    description: 'Description of open graph book',
    url: 'https://www.example.com/books/book-title',
    type: 'book',
    book: {
      releaseDate: '2018-09-17T11:08:13Z',
      isbn: '978-3-16-148410-0',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B'],
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-book-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Book Title A',
      },
      {
        url: 'https://www.test.ie/og-image-book-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Book Title B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

test('Book SEO renders correctly', () => {
  render(<BaseSeo {...BookSEO} />);
  expect(document.documentElement).toMatchSnapshot();
});

test('Check book og type meta', () => {
  render(<BaseSeo {...BookSEO} />);

  const ogType = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.type}"]`,
  );
  const ogTypeTag = document.documentElement.querySelectorAll(
    'meta[property="og:type"]',
  );
  const ogBookReleaseDate = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.releaseDate}"]`,
  );
  const ogBookReleaseDateTag = document.documentElement.querySelectorAll(
    'meta[property="book:release_date"]',
  );
  const ogBookAuthor00 = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.authors[0]}"]`,
  );
  const ogBookAuthor01 = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.authors[1]}"]`,
  );
  const ogBookIsbn = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.isbn}"]`,
  );
  const ogBookIsbnTag = document.documentElement.querySelectorAll(
    'meta[property="book:isbn"]',
  );
  const ogBookTags00 = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.tags[0]}"]`,
  );
  const ogBookTags01 = document.documentElement.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.tags[1]}"]`,
  );

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogBookReleaseDate).length).toBe(1);
  expect(Array.from(ogBookReleaseDateTag).length).toBe(1);
  expect(Array.from(ogBookAuthor00).length).toBe(1);
  expect(Array.from(ogBookAuthor01).length).toBe(1);
  expect(Array.from(ogBookIsbn).length).toBe(1);
  expect(Array.from(ogBookIsbnTag).length).toBe(1);
  expect(Array.from(ogBookTags00).length).toBe(1);
  expect(Array.from(ogBookTags01).length).toBe(1);
});

const ProfileSEO = {
  title: 'Profile Page Title',
  description: 'Description of profile page',
  openGraph: {
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'male',
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-firstlast123-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt firstlast123 A',
      },
      {
        url: 'https://www.test.ie/og-image-firstlast123-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt firstlast123 B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

test('Profile SEO renders correctly', () => {
  render(<BaseSeo {...ProfileSEO} />);
  expect(document.documentElement).toMatchSnapshot();
});

test('Check profile og type meta', () => {
  render(<BaseSeo {...ProfileSEO} />);

  const ogType = document.documentElement.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.type}"]`,
  );
  const ogTypeTag = document.documentElement.querySelectorAll(
    'meta[property="og:type"]',
  );
  const ogProfileFirstName = document.documentElement.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.firstName}"]`,
  );
  const ogProfileFirstNameTag = document.documentElement.querySelectorAll(
    'meta[property="profile:first_name"]',
  );
  const ogProfileLastName = document.documentElement.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.lastName}"]`,
  );
  const ogProfileLastNameTag = document.documentElement.querySelectorAll(
    'meta[property="profile:last_name"]',
  );
  const ogProfileUsername = document.documentElement.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.username}"]`,
  );
  const ogProfileUsernameTag = document.documentElement.querySelectorAll(
    'meta[property="profile:username"]',
  );
  const ogProfileGender = document.documentElement.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.gender}"]`,
  );
  const ogProfileGenderTag = document.documentElement.querySelectorAll(
    'meta[property="profile:gender"]',
  );

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogProfileFirstName).length).toBe(1);
  expect(Array.from(ogProfileFirstNameTag).length).toBe(1);
  expect(Array.from(ogProfileLastName).length).toBe(1);
  expect(Array.from(ogProfileLastNameTag).length).toBe(1);
  expect(Array.from(ogProfileUsername).length).toBe(1);
  expect(Array.from(ogProfileUsernameTag).length).toBe(1);
  expect(Array.from(ogProfileGender).length).toBe(1);
  expect(Array.from(ogProfileGenderTag).length).toBe(1);
});

const VideoSEO = {
  title: 'Video Page Title',
  description: 'Description of video page',
  openGraph: {
    title: 'Open Graph Video Title',
    description: 'Description of open graph video',
    url: 'https://www.example.com/videos/video-title',
    type: 'video.movie',
    video: {
      actors: [
        {
          profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
          role: 'Protagonist',
        },
        {
          profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
          role: 'Antagonist',
        },
      ],
      directors: [
        'https://www.example.com/directors/@firstnameA-lastnameA',
        'https://www.example.com/directors/@firstnameB-lastnameB',
      ],
      writers: [
        'https://www.example.com/writers/@firstnameA-lastnameA',
        'https://www.example.com/writers/@firstnameB-lastnameB',
      ],
      duration: 680000,
      releaseDate: '2022-12-21T22:04:11Z',
      tags: ['Tag A', 'Tag B'],
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-video-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Video Title A',
      },
      {
        url: 'https://www.test.ie/og-image-video-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Video Title B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

test('Video SEO renders correctly', () => {
  render(<BaseSeo {...VideoSEO} />);
  expect(document.documentElement).toMatchSnapshot();
});

test('Check video og type meta', () => {
  render(<BaseSeo {...VideoSEO} />);

  const ogType = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.type}"]`,
  );
  const ogTypeTag = document.documentElement.querySelectorAll(
    'meta[property="og:type"]',
  );
  const ogVideoReleaseDate = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.releaseDate}"]`,
  );
  const ogVideoReleaseDateTag = document.documentElement.querySelectorAll(
    'meta[property="video:release_date"]',
  );
  const ogVideoDuration = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.duration}"]`,
  );
  const ogVideoDurationTag = document.documentElement.querySelectorAll(
    'meta[property="video:duration"]',
  );
  const ogVideoActors00 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.actors[0].profile}"]`,
  );
  const ogVideoActors01 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.actors[1].profile}"]`,
  );
  const ogVideoActorsRoles00 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.actors[0].role}"]`,
  );
  const ogVideoActorsRoles01 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.actors[1].role}"]`,
  );
  const ogVideoDirectors00 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.directors[0]}"]`,
  );
  const ogVideoDirectors01 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.directors[1]}"]`,
  );
  const ogVideoWriters00 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.writers[0]}"]`,
  );
  const ogVideoWriters01 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.writers[1]}"]`,
  );
  const ogVideoTags00 = document.documentElement.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.tags[0]}"]`,
  );
  const ogVideoTags01 = document.documentElement.querySelectorAll(
    `meta[content="${VideoSEO.openGraph.video.tags[1]}"]`,
  );

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogVideoReleaseDate).length).toBe(1);
  expect(Array.from(ogVideoReleaseDateTag).length).toBe(1);
  expect(Array.from(ogVideoDuration).length).toBe(1);
  expect(Array.from(ogVideoDurationTag).length).toBe(1);
  expect(Array.from(ogVideoActors00).length).toBe(1);
  expect(Array.from(ogVideoActors01).length).toBe(1);
  expect(Array.from(ogVideoActorsRoles00).length).toBe(1);
  expect(Array.from(ogVideoActorsRoles01).length).toBe(1);
  expect(Array.from(ogVideoDirectors00).length).toBe(1);
  expect(Array.from(ogVideoDirectors01).length).toBe(1);
  expect(Array.from(ogVideoWriters00).length).toBe(1);
  expect(Array.from(ogVideoWriters01).length).toBe(1);
  expect(Array.from(ogVideoTags00).length).toBe(1);
  expect(Array.from(ogVideoTags01).length).toBe(1);
});

test('additional meta tags are set', () => {
  const overrideProps = {
    ...SEO,
    metaTags: [
      { property: 'random', content: 'something' },
      { name: 'foo', content: 'bar' },
    ],
  };
  render(<BaseSeo {...overrideProps} />);
  const propertyTag = document.documentElement.querySelectorAll(
    'meta[content="something"]',
  );
  const nameTag = document.documentElement.querySelectorAll(
    'meta[content="bar"]',
  );
  expect(Array.from(propertyTag).length).toBe(1);
  expect(Array.from(nameTag).length).toBe(1);
});

test('correctly sets noindex default', () => {
  const overrideProps = {
    dangerouslySetAllPagesToNoIndex: true,
  };
  render(<BaseSeo {...overrideProps} />);
  const indexfollow = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const noindexfollow = document.documentElement.querySelectorAll(
    'meta[content="noindex,follow"]',
  );

  expect(Array.from(indexfollow).length).toBe(0);
  expect(Array.from(noindexfollow).length).toBe(2);
});

test('correctly sets nofollow default', () => {
  const overrideProps = {
    dangerouslySetAllPagesToNoFollow: true,
  };
  render(<BaseSeo {...overrideProps} />);
  const indexfollow = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const indexnofollow = document.documentElement.querySelectorAll(
    'meta[content="index,nofollow"]',
  );

  expect(Array.from(indexfollow).length).toBe(0);
  expect(Array.from(indexnofollow).length).toBe(2);
});

test('correctly read noindex & nofollow false', () => {
  const overrideProps = {
    ...SEO,
    noindex: false,
    nofollow: false,
  };
  render(<BaseSeo {...overrideProps} />);
  const indexfollow = document.documentElement.querySelectorAll(
    'meta[content="index,follow"]',
  );
  const noindexnofollow = document.documentElement.querySelectorAll(
    'meta[content="noindex,nofollow"]',
  );

  expect(Array.from(indexfollow).length).toBe(2);
  expect(Array.from(noindexnofollow).length).toBe(0);
});
