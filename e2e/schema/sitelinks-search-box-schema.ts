import { ObjectSchema, versionSchemas } from '@cypress/schema-tools';

const sitelinksSearchBox100: ObjectSchema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Sitelinks search box',
    description:
      'An example schema describing JSON-LD for type: Sitelinks search box',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'WebSite',
      },
      url: {
        type: 'string',
        description:
          'The URL of the canonical homepage of the website associated with the sitelinks search box.',
      },
      potentialAction: {
        type: 'object',
        description: 'Array containing SearchAction',
        properties: {
          '@type': {
            type: 'string',
            description: 'SearchAction',
          },
          target: {
            type: 'object',
            description: 'EntryPoint object',
            properties: {
              '@type': {
                type: 'string',
                description: 'EntryPoint',
              },
              urlTemplate: {
                type: 'string',
                description:
                  "The website's search engine query string template.",
              },
            },
          },
          queryInput: {
            type: 'string',
            description:
              'Literal string containing required name and search term string',
          },
        },
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://example.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://example.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
};

const sitelinksSearchBox = versionSchemas(sitelinksSearchBox100);
export default sitelinksSearchBox;
