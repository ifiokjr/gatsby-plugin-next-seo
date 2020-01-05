import { getDocument } from 'pptr-testing-library';
import { ElementHandle } from 'puppeteer';

const url = (path = '') => `http://localhost:9000${path}`;

export const prop = async <GReturn>(
  $element: ElementHandle | Promise<ElementHandle>,
  property: string,
): Promise<GReturn> => {
  try {
    const handle = await $element;
    const propertyHandle = await handle.getProperty(property);
    return propertyHandle.jsonValue() as any;
  } catch (e) {
    console.error(property, $element.toString());
    throw e;
  }
};

export const props = async <GReturn>(
  $elements: ElementHandle[] | Promise<ElementHandle[]>,
  property: string,
): Promise<GReturn[]> => {
  const handles = await $elements;
  return Promise.all(handles.map(handle => prop<GReturn>(handle, property)));
};

interface LaunchParams {
  path?: string;
  disableJavascript?: boolean;
}

export const launch = async ({ path = '', disableJavascript = false }: LaunchParams = {}) => {
  if (disableJavascript) {
    await page.setJavaScriptEnabled(false);
  }
  await page.goto(url(path));
  return getDocument(page);
};

export interface TagAssertionBuilder {
  selector: string;
  prop: string;
  result: string[] | string;
  indexes?: number[];
}

export const assertTags = async (assertions: TagAssertionBuilder[], $document: ElementHandle) => {
  for (const assertion of assertions) {
    const { prop: p, result, selector, indexes } = assertion;
    if (Array.isArray(result)) {
      await props($document.$$(selector), p).then(async content => {
        if (Array.isArray(indexes)) {
          expect(indexes.length).toBe(result.length); // Ensure the indexes match;
          indexes.forEach((ii, index) => {
            expect(content[ii]).toBe(result[index]);
          });
        } else {
          expect(content).toHaveLength(result.length);
          expect(content).toEqual(result);
        }
      });
    } else {
      await expect(prop($document.$(selector), p)).resolves.toBe(result);
    }
  }
};

export const testIterator = [
  ['SSR', true],
  ['Client', false],
] as const;
