import { assertSchema } from '@cypress/schema-tools';
import { render as testRender } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import {
  ArticleJsonLd,
  BlogJsonLd,
  BlogPostJsonLd,
  BreadcrumbJsonLd,
  CourseJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  ProductJsonLd,
} from '../..';
import schemas from '../../../e2e/schema';

const render = (ui: ReactElement) => testRender(ui, { wrapper: HelmetProvider });

test('ArticleJsonLd', () => {
  render(
    <>
      <ArticleJsonLd
        url='https://example.com/article'
        headline='Article headline'
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        datePublished='2015-02-05T08:00:00+08:00'
        dateModified='2015-02-05T09:00:00+08:00'
        authorName='Jane Blogs'
        publisherName='Gary Meehan'
        publisherLogo='https://www.example.com/photos/logo.jpg'
        description='This is a mighty good description of this article.'
      />
    </>,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Article', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('NewsArticleJsonLd', () => {
  render(
    <NewsArticleJsonLd
      url='https://example.com/newsarticle'
      title='News Article headline'
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      section='politics'
      keywords='prayuth, taksin, thai'
      dateCreated='2015-02-05T08:00:00+08:00'
      datePublished='2015-02-05T08:00:00+08:00'
      dateModified='2015-02-05T09:00:00+08:00'
      authorName='Jane Blogs'
      publisherName='Gary Meehan'
      publisherLogo='https://www.example.com/photos/logo.jpg'
      description='This is a mighty good description of this news article.'
      body='This is article body of news article'
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('NewsArticle', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('BlogPostJsonLd', () => {
  render(
    <BlogPostJsonLd
      url='https://example.com/blog'
      headline='Blog headline'
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished='2015-02-05T08:00:00+08:00'
      dateModified='2015-02-05T09:00:00+08:00'
      authorName='Jane Blogs'
      description='This is a mighty good description of this blog.'
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('BlogPosting', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('BlogJsonLd', () => {
  render(
    <BlogJsonLd
      url='https://example.com/blog'
      headline='Blog headline'
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      posts={[{ headline: 'Post 1' }, { headline: 'Post 2' }]}
      datePublished='2015-02-05T08:00:00+08:00'
      dateModified='2015-02-05T09:00:00+08:00'
      authorName='Jane Blogs'
      description='This is a mighty good description of this blog.'
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Blog', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('BreadcrumbJsonLd', () => {
  render(
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: 'Books',
          item: 'https://example.com/books',
        },
        {
          position: 2,
          name: 'Authors',
          item: 'https://example.com/books/authors',
        },
        {
          position: 3,
          name: 'Ann Leckie',
          item: 'https://example.com/books/authors/annleckie',
        },
        {
          position: 4,
          name: 'Ancillary Justice',
          item: 'https://example.com/books/authors/annleckie/ancillaryjustice',
        },
      ]}
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Breadcrumb', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('CourseJsonLd', () => {
  render(
    <CourseJsonLd
      name='Course Name'
      providerName='Course Provider'
      providerUrl='https//www.example.com/provider'
      description='Course description goes right here'
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Course', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('LocalBusinessJsonLd', () => {
  render(
    <LocalBusinessJsonLd
      type='Store'
      id='http://davesdeptstore.example.com'
      name="Dave's Department Store"
      description="Dave's latest department store in San Jose, now open"
      url='http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427'
      telephone='+14088717984'
      address={{
        streetAddress: '1600 Saratoga Ave',
        addressLocality: 'San Jose',
        addressRegion: 'CA',
        postalCode: '95129',
        addressCountry: 'US',
      }}
      geo={{
        latitude: '37.293058',
        longitude: '-121.988331',
      }}
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Local Business', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('LogoJsonLd', () => {
  render(<LogoJsonLd logo='http://www.your-site.com/images/logo.jpg' url='http://www.your-site.com' />);
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Logo', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});

test('ProductJsonLd', () => {
  render(
    <ProductJsonLd
      productName='Executive Anvil'
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
      brand='ACME'
      reviews={[
        {
          author: 'Jim',
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody: 'This is my favorite product yet! Thanks Nate for the example products and reviews.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '4.4',
        reviewCount: 89,
      }}
      offers={{
        price: '119.99',
        priceCurrency: 'USD',
        priceValidUntil: '2020-11-05',
        itemCondition: 'UsedCondition',
        availability: 'InStock',
        url: 'https://www.example.com/executive-anvil',
        seller: {
          name: 'Executive Objects',
        },
      }}
      mpn='925872'
    />,
  );
  const jsonLD = JSON.parse(document.querySelector('script')?.innerHTML ?? '{}');
  assertSchema(schemas)('Product', '1.0.0')(jsonLD);
  expect(document.documentElement).toMatchSnapshot();
});
