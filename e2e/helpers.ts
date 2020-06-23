import { getDocument } from 'pptr-testing-library';
import { ElementHandle, Page } from 'puppeteer';

export const url = (path = '') => `http://localhost:9000${path}`;

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
  return Promise.all(handles.map((handle) => prop<GReturn>(handle, property)));
};

export interface TagAssertionBuilder {
  selector: string;
  prop: string;
  result: string[] | string;
  indexes?: number[];
}

export const assertTags = async (
  assertions: TagAssertionBuilder[],
  $document: ElementHandle,
) => {
  for (const assertion of assertions) {
    const { prop: p, result, selector, indexes } = assertion;
    if (Array.isArray(result)) {
      await props($document.$$(selector), p).then(async (content) => {
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

const { EXAMPLE_COMMAND = 'serve' } = process.env;

export const clientOnly = EXAMPLE_COMMAND !== 'serve';

const defaultIterator = [
  ['SSR', true],
  ['Client', false],
] as const;
const clientIterator = [['Client', false]] as const;

export const testIterator = clientOnly ? clientIterator : defaultIterator;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXAMPLE_COMMAND?: 'serve' | 'develop';
    }
  }
}

interface LaunchParams {
  path?: string;
  disableJavascript?: boolean;
}

export const launch = async ({
  path = '/',
  disableJavascript = false,
}: LaunchParams = {}): Promise<ElementHandle> => {
  if (disableJavascript) {
    await page.setJavaScriptEnabled(false);
  }

  await page.goto(
    url(path),
    disableJavascript ? {} : { waitUntil: 'domcontentloaded' },
  );

  if (clientOnly) {
    await page.waitFor(500); // gatsby develop takes a moment to warm up on first load
  }

  return getDocument(page as Page);
};
