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
} from 'gatsby-plugin-next-seo';
import React from 'react';

import { Links } from '../components/links';

const JsonLd = () => (
  <>
    <h1>All JSON-LD</h1>
    <ArticleJsonLd
      url='https://example.com/article'
      title='Article headline'
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
    />

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
    />

    <CourseJsonLd
      courseName='Course Name'
      providerName='Course Provider'
      providerUrl='https//www.example.com/provider'
      description='Course description goes right here'
    />

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
    />

    <LogoJsonLd logo='http://www.your-site.com/images/logo.jpg' url='http://www.your-site.com' />

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
    />

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
    />

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
    />

    <Links />
  </>
);

export default JsonLd;
