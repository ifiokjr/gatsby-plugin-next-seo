import { ElementHandle } from 'puppeteer';

import { launch, props, testIterator } from '../helpers';

let $document: ElementHandle;

describe.each(testIterator)('JSON LD - %s', (_, disableJavascript) => {
  beforeAll(async () => {
    $document = await launch({ path: '/jsonld', disableJavascript });
  });

  it('holds multiple script tags', async () => {
    await props<string>(
      $document.$$('head script[type="application/ld+json"]'),
      'innerHTML',
    ).then((content) => {
      expect(content.length).toBe(10);
      content.forEach((json) => JSON.parse(json));
    });
  });
});
