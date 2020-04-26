import {
  assertTags,
  launch,
  TagAssertionBuilder,
  testIterator,
} from '../helpers';

test.each(testIterator)('Default SEO / - %s', async (_, disableJavascript) => {
  const $document = await launch({ disableJavascript });
  const tagAssertions = [
    { selector: 'h1', prop: 'innerText', result: 'Default SEO on this Page' },
    {
      selector: 'head title',
      prop: 'innerText',
      result: 'Title A | Gatsby SEO',
    },
    {
      selector: 'head meta[name="description"]',
      prop: 'content',
      result: 'Description A',
    },
    {
      selector: 'head link[rel="canonical"]',
      prop: 'href',
      result: 'https://www.canonical.ie/a',
    },
    {
      selector: 'head meta[name="robots"]',
      prop: 'content',
      result: 'index,follow',
    },
    {
      selector: 'head meta[name="googlebot"]',
      prop: 'content',
      result: 'index,follow',
    },
    {
      selector: 'head meta[property="og:type"]',
      prop: 'content',
      result: 'website',
    },
    {
      selector: 'head meta[property="og:locale"]',
      prop: 'content',
      result: 'en_IE',
    },
    {
      selector: 'head meta[property="og:url"]',
      prop: 'content',
      result: 'https://www.url.ie/a',
    },
    {
      selector: 'head meta[property="og:title"]',
      prop: 'content',
      result: 'Open Graph Title A',
    },
    {
      selector: 'head meta[property="og:description"]',
      prop: 'content',
      result: 'Open Graph Description A',
    },
    {
      selector: 'head meta[property="og:site_name"]',
      prop: 'content',
      result: 'SiteName A',
    },
    {
      selector: 'head meta[property="fb:app_id"]',
      prop: 'content',
      result: '1234567890',
    },
    {
      selector: 'head meta[name="twitter:site"]',
      prop: 'content',
      result: '@sitea',
    },
    {
      selector: 'head meta[name="twitter:creator"]',
      prop: 'content',
      result: '@handlea',
    },
    {
      selector: 'head meta[name="twitter:card"]',
      prop: 'content',
      result: 'summary_large_image',
    },
    {
      selector: 'head meta[property="og:image"]',
      prop: 'content',
      result: ['https://www.test.ie/og-image-a-01.jpg'],
    },
    {
      selector: 'head meta[property="og:image:alt"]',
      prop: 'content',
      result: ['Og Image Alt A'],
    },
    {
      selector: 'head meta[property="og:image:width"]',
      prop: 'content',
      result: ['800'],
    },
    {
      selector: 'head meta[property="og:image:height"]',
      prop: 'content',
      result: ['600'],
    },
  ];

  await assertTags(tagAssertions, $document);
});

test.each(testIterator)(
  'Overridden SEO /override - %s',
  async (_, disableJavascript) => {
    const $document = await launch({ disableJavascript, path: '/overridden' });

    const tagAssertions: TagAssertionBuilder[] = [
      { selector: 'h1', prop: 'innerText', result: 'Overridden Seo' },
      {
        selector: 'head title',
        prop: 'innerText',
        result: 'Title B | Gatsby SEO',
      },
      {
        selector: 'head meta[name="description"]',
        prop: 'content',
        result: 'Description B',
      },
      {
        selector: 'head link[rel="canonical"]',
        prop: 'href',
        result: 'https://www.canonical.ie/b',
      },
      {
        selector: 'head meta[name="robots"]',
        prop: 'content',
        result: 'noindex,nofollow',
      },
      {
        selector: 'head meta[name="googlebot"]',
        prop: 'content',
        result: 'noindex,nofollow',
      },
      {
        selector: 'head meta[property="og:type"]',
        prop: 'content',
        result: 'website',
      },
      {
        selector: 'head meta[property="og:locale"]',
        prop: 'content',
        result: 'en_IE',
      },
      {
        selector: 'head meta[property="og:url"]',
        prop: 'content',
        result: 'https://www.url.ie/b',
      },
      {
        selector: 'head meta[property="og:title"]',
        prop: 'content',
        result: 'Open Graph Title B',
      },
      {
        selector: 'head meta[property="og:description"]',
        prop: 'content',
        result: 'Open Graph Description B',
      },
      {
        selector: 'head meta[property="og:site_name"]',
        prop: 'content',
        result: 'SiteName B',
      },
      {
        selector: 'head meta[property="fb:app_id"]',
        prop: 'content',
        result: '987654321',
      },
      {
        selector: 'head meta[name="twitter:site"]',
        prop: 'content',
        result: '@siteb',
      },
      {
        selector: 'head meta[name="twitter:creator"]',
        prop: 'content',
        result: '@handleb',
      },
      {
        selector: 'head meta[name="twitter:card"]',
        prop: 'content',
        result: 'summary_large_image',
      },
      {
        selector: 'head link[rel="alternate"]',
        prop: 'href',
        result: ['https://m.canonical.ie/', 'https://www.canonical.ie/de'],
      },
      {
        selector: 'head link[rel="alternate"]',
        prop: 'media',
        result: ['only screen and (max-width: 640px)'],
        indexes: [0],
      },
      {
        selector: 'head link[rel="alternate"]',
        prop: 'hreflang',
        result: ['de-AT'],
        indexes: [1],
      },

      {
        selector: 'head meta[property="og:image"]',
        prop: 'content',
        result: [
          'https://www.test.ie/og-image-b-01.jpg',
          'https://www.test.ie/og-image-b-02.jpg',
          'https://www.test.ie/og-image-b-03.jpg',
          'https://www.test.ie/og-image-b-04.jpg',
        ],
      },
      {
        selector: 'head meta[property="og:image:alt"]',
        prop: 'content',
        result: ['Og Image Alt B', 'Og Image Alt B Second'],
      },
      {
        selector: 'head meta[property="og:image:width"]',
        prop: 'content',
        result: ['850', '950', '1200', '1200'],
      },
      {
        selector: 'head meta[property="og:image:height"]',
        prop: 'content',
        result: ['650', '850', '1200', '1200'],
      },
    ];

    await assertTags(tagAssertions, $document);
  },
);

test.each(testIterator)(
  'Profile SEO /profile - %s',
  async (_, disableJavascript) => {
    const $document = await launch({ disableJavascript, path: '/profile' });

    const tagAssertions: TagAssertionBuilder[] = [
      { selector: 'h1', prop: 'innerText', result: 'Profile Page SEO' },
      {
        selector: 'head title',
        prop: 'innerText',
        result: 'Profile Page Title | Gatsby SEO',
      },
      {
        selector: 'head meta[name="description"]',
        prop: 'content',
        result: 'Description of profile page',
      },
      {
        selector: 'head meta[property="og:type"]',
        prop: 'content',
        result: 'profile',
      },

      {
        selector: 'head meta[property="profile:first_name"]',
        prop: 'content',
        result: 'First',
      },
      {
        selector: 'head meta[property="profile:last_name"]',
        prop: 'content',
        result: 'Last',
      },
      {
        selector: 'head meta[property="profile:username"]',
        prop: 'content',
        result: 'firstlast123',
      },

      {
        selector: 'head meta[property="og:site_name"]',
        prop: 'content',
        result: 'SiteName',
      },
      {
        selector: 'head meta[name="twitter:site"]',
        prop: 'content',
        result: '@site',
      },
      {
        selector: 'head meta[name="twitter:creator"]',
        prop: 'content',
        result: '@handle',
      },
      {
        selector: 'head meta[name="twitter:card"]',
        prop: 'content',
        result: 'summary_large_image',
      },

      {
        selector: 'head meta[property="profile:gender"]',
        prop: 'content',
        result: 'male',
      },
      {
        selector: 'head meta[property="og:url"]',
        prop: 'content',
        result: 'https://www.example.com/@firstlast123',
      },
      {
        selector: 'head meta[property="og:title"]',
        prop: 'content',
        result: 'Open Graph Profile Title',
      },
      {
        selector: 'head meta[property="og:description"]',
        prop: 'content',
        result: 'Description of open graph profile',
      },

      {
        selector: 'head meta[property="og:image"]',
        prop: 'content',
        result: [
          'https://www.test.ie/og-image-firstlast123-01.jpg',
          'https://www.test.ie/og-image-firstlast123-02.jpg',
          'https://www.test.ie/og-image-firstlast123-03.jpg',
          'https://www.test.ie/og-image-firstlast123-04.jpg',
        ],
      },
      {
        selector: 'head meta[property="og:image:alt"]',
        prop: 'content',
        result: [
          'Og Image Alt firstlast123 A',
          'Og Image Alt firstlast123 B',
          'Og Image Alt firstlast123 C',
          'Og Image Alt firstlast123 D',
        ],
      },
      {
        selector: 'head meta[property="og:image:width"]',
        prop: 'content',
        result: ['850', '950', '600', '400'],
      },
      {
        selector: 'head meta[property="og:image:height"]',
        prop: 'content',
        result: ['650', '850', '400', '400'],
      },
    ];

    await assertTags(tagAssertions, $document);
  },
);

test.each(testIterator)(
  'Article SEO /article - %s',
  async (_, disableJavascript) => {
    const $document = await launch({ disableJavascript, path: '/article' });

    const tagAssertions: TagAssertionBuilder[] = [
      {
        selector: 'head meta[property="article:published_time"]',
        prop: 'content',
        result: '2017-06-21T23:04:13Z',
      },
      {
        selector: 'head meta[property="article:modified_time"]',
        prop: 'content',
        result: '2018-01-21T18:04:43Z',
      },
      {
        selector: 'head meta[property="article:expiration_time"]',
        prop: 'content',
        result: '2022-12-21T22:04:11Z',
      },
      {
        selector: 'head meta[property="article:section"]',
        prop: 'content',
        result: 'Section II',
      },
      {
        selector: 'head meta[property="article:author"]',
        prop: 'content',
        result: [
          'https://www.example.com/authors/@firstnameA-lastnameA',
          'https://www.example.com/authors/@firstnameB-lastnameB',
        ],
      },
      {
        selector: 'head meta[property="article:tag"]',
        prop: 'content',
        result: ['Tag A', 'Tag B', 'Tag C'],
      },
    ];

    await assertTags(tagAssertions, $document);
  },
);

test.each(testIterator)('Book SEO /book - %s', async (_, disableJavascript) => {
  const $document = await launch({ disableJavascript, path: '/book' });

  const tagAssertions: TagAssertionBuilder[] = [
    {
      selector: 'head meta[property="book:release_date"]',
      prop: 'content',
      result: '2018-09-17T11:08:13Z',
    },
    {
      selector: 'head meta[property="book:isbn"]',
      prop: 'content',
      result: '978-3-16-148410-0',
    },
    {
      selector: 'head meta[property="book:author"]',
      prop: 'content',
      result: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
    },
    {
      selector: 'head meta[property="book:tag"]',
      prop: 'content',
      result: ['Tag A', 'Tag B', 'Tag C'],
    },
  ];

  await assertTags(tagAssertions, $document);
});

test.each(testIterator)(
  'Video SEO /video - %s',
  async (_, disableJavascript) => {
    const $document = await launch({ disableJavascript, path: '/video' });

    const tagAssertions: TagAssertionBuilder[] = [
      {
        selector: 'head meta[property="video:duration"]',
        prop: 'content',
        result: '680000',
      },
      {
        selector: 'head meta[property="video:release_date"]',
        prop: 'content',
        result: '2022-12-21T22:04:11Z',
      },
      {
        selector: 'head meta[property="video:actor"]',
        prop: 'content',
        result: [
          'https://www.example.com/actors/@firstnameA-lastnameA',
          'https://www.example.com/actors/@firstnameB-lastnameB',
        ],
      },
      {
        selector: 'head meta[property="video:actor:role"]',
        prop: 'content',
        result: ['Protagonist', 'Antagonist'],
      },
      {
        selector: 'head meta[property="video:director"]',
        prop: 'content',
        result: [
          'https://www.example.com/directors/@firstnameA-lastnameA',
          'https://www.example.com/directors/@firstnameB-lastnameB',
        ],
      },
      {
        selector: 'head meta[property="video:writer"]',
        prop: 'content',
        result: [
          'https://www.example.com/writers/@firstnameA-lastnameA',
          'https://www.example.com/writers/@firstnameB-lastnameB',
        ],
      },
      {
        selector: 'head meta[property="video:tag"]',
        prop: 'content',
        result: ['Tag A', 'Tag B', 'Tag C'],
      },
    ];

    await assertTags(tagAssertions, $document);
  },
);
