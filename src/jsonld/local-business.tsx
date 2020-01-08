import React, { FC } from 'react';
import {
  DayOfWeek as RawDayOfWeek,
  LocalBusiness as RawLocalBusiness,
  OpeningHoursSpecification as RawOpeningHoursSpecification,
  WithContext,
} from 'schema-dts';

import { DeferSeoProps } from '../types';
import { AggregateRating, Overrides } from '../utils/shared-types';
import { JsonLd } from './jsonld';

interface LocalBusinessAddress {
  /** The country. For example, USA. You can also provide the two-letter
   * {@link http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code}.
   */
  addressCountry: string;
  /** The locality in which the street address is, and which is in the region.
   * For example, Mountain View.
   */
  addressLocality?: string;
  /**
   * The region in which the locality is, and which is in the country. For
   * example, California or another appropriate first-level
   * {@link https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country Administrative division}
   */
  addressRegion?: string;
  /**
   * The postal code. For example, 94043.
   */
  postalCode: string;
  /**
   * The post office box number for PO box addresses.
   */
  postOfficeBoxNumber?: string;
  /**
   * The street address. For example, 1600 Amphitheatre Pkwy.
   */
  streetAddress: string;
}

type LocalBusiness = Extract<RawLocalBusiness, object>;
export type LocalBusinessType = LocalBusiness['@type'];

/**
 * Geographic coordinates of the business.
 */
interface Geo {
  /**
   * The elevation of a location
   * ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}).
   * Values may be of the form 'NUMBER UNIT_OF_MEASUREMENT' (e.g., '1,000 m',
   * '3,200 ft') while numbers alone should be assumed to be a value in meters.
   */
  elevation?: string | number;
  /**
   * The latitude of a location.
   *
   * @remarks
   *
   * The precision should be at least 5 decimal places. For example `37.42242`
   * ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}).
   */
  latitude: string | number;

  /**
   * The longitude of a location.
   *
   * @remarks
   *
   * The precision should be at least 5 decimal places. For example `-122.08585`
   * ({@link https://en.wikipedia.org/wiki/World_Geodetic_System WGS 84}).
   * */
  longitude: string | number;
}

type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Mon'
  | 'Tues'
  | 'Wed'
  | 'Thurs'
  | 'Fri'
  | 'Sat'
  | 'Sun'
  | 'PublicHolidays';

interface OpeningHoursSpecification {
  /**
   * The closing hour of the place or service on the given day(s) of the week,
   * in hh:mm:ss format.
   */
  closes?: string;

  /**
   * The day of the week for which these opening hours are valid.
   */
  dayOfWeek?: DayOfWeek | DayOfWeek[];

  /**
   * The opening hour of the place or service on the given day(s) of the week,
   * in hh:mm:ss format.
   */
  opens?: string;

  /**
   * The date when the opening hours becomes valid, in YYYY-MM-DD format.
   */
  validFrom?: string;

  /**
   * The date after when the opening hours is not valid, in YYYY-MM-DD format.
   */
  validThrough?: string;
}

export interface LocalBusinessJsonLdProps extends DeferSeoProps, Overrides<LocalBusiness> {
  /**
   * @deprecated
   *
   * Use `overrides['@types']` instead.
   */
  type: LocalBusinessType;

  /**
   * Globally unique ID of the specific business location in the form of a URL.
   *
   * @remarks
   *
   * The ID should be stable and unchanging over time. Google Search treats the
   * URL as an opaque string and it does not have to be a working link. If the
   * business has multiple locations, make sure the `id` is unique for each
   * location.
   */
  id: string;

  /**
   * The name of the business.
   */
  name: string;

  /**
   * The description of the business.
   */
  description: string;

  /**
   * The fully-qualified URL of the specific business location. Unlike the `id`
   * property, this URL property should be a working link.
   */
  url: string;

  /**
   * A business phone number meant to be the primary contact method for
   * customers. Be sure to include the country code and area code in the phone
   * number.
   */
  telephone?: string;

  /**
   * The physical location of the business. Include as many properties as
   * possible. The more properties you provide, the higher quality the result is
   * to users.
   */
  address: LocalBusinessAddress;

  /**
   * Geographic coordinates of the business.
   */
  geo: Geo;

  /**
   * One or more images of the `LocalBusiness`.
   *
   * @remarks
   *
   * Additional image guidelines:
   *
   * Every page must contain at least one image (whether or not you include
   * markup). Google will pick the best image to display in Search results based
   * on the aspect ratio and resolution. Image URLs must be crawlable and
   * indexable. Images must represent the marked up content. Images must be in
   * .jpg, .png, or. gif format. For best results, provide multiple
   * high-resolution images (minimum of 50K pixels when multiplying width and
   * height) with the following aspect ratios: 16x9, 4x3, and 1x1. For example:
   *
   * ```js
   * const props = {
   *   ... //
   *     "image": [
   *     "https://example.com/photos/1x1/photo.jpg",
   *     "https://example.com/photos/4x3/photo.jpg",
   *     "https://example.com/photos/16x9/photo.jpg"
   *   ]
   * };
   * ```
   *
   */
  images: string[];

  /**
   * The opening hours of a certain place.
   *
   * @remarks
   *
   * Use both the validFrom and validThrough properties to define seasonal
   * hours. This example shows a business closed for winter holidays.
   *
   * #### Standard hours
   *
   * Excluding the validFrom and validThrough properties signify that the hours
   * are valid year-round.This example defines a business that is open weekdays
   * from 9am to 9pm, with weekend hours from 10am until 11pm.
   *
   * ```js
   * const props = {
   *   ...other,
   *   openingHoursSpecification: [
   *     {
   *       dayOfWeek: [
   *        "Monday",
   *        "Tuesday",
   *        "Wednesday",
   *        "Thursday",
   *        "Friday"
   *       ],
   *       opens: "09:00",
   *       closes: "21:00"
   *     },
   *     {
   *       dayOfWeek: ["Saturday", "Sunday"],
   *       opens: "10:00",
   *       closes: "23:00"
   *     }
   *   ]
   * }
   * ```
   *
   * #### Late night hours
   *
   * For hours past midnight, define opening and closing hours using a single
   * OpeningHoursSpecification property. This example defines hours from
   * Saturday at 6pm until Sunday at 3am.
   *
   * ```js
   * const props = {
   *   ...other,
   *   openingHoursSpecification: {
   *     opens: "18:00",
   *     closes: "03:00",
   *     dayOfWeek: "Saturday",
   *   }
   * }
   * ```
   *
   * #### All-day hours
   *
   * To show a business as open 24 hours a day, set the open property to "00:00"
   * and the closes property to "23:59".To show a business is closed all day,
   * set both opens and closes properties to "00:00". This example shows a
   * business open all day Saturday and closed all day Sunday.
   *
   *
   * ```js
   * const props = {
   *   ...other,
   *   openingHoursSpecification: [
   *     {
   *       dayOfWeek: "Saturday",
   *       opens: "00:00",
   *       closes: "23:59"
   *     },
   *     {
   *       dayOfWeek: "Sunday",
   *       opens: "00:00",
   *       closes: "00:00"
   *     }
   *   ]
   * }
   * ```
   *
   *
   * #### Seasonal hours
   * ```js
   * const props = {
   *   ...other,
   *   openingHoursSpecification: {
   *     opens: "00:00",
   *     closes: "00:00",
   *     validFrom: "2015-12-23",
   *     validThrough: "2016-01-05"
   *   }
   * }
   * ```
   */
  openingHours?: OpeningHoursSpecification | OpeningHoursSpecification[];

  /**
   * The average rating of the local business based on multiple ratings or
   * reviews.
   */
  rating?: AggregateRating;

  /**
   * The relative price range of a business, commonly specified by either a
   * numerical range.
   *
   * @remarks
   *
   * @example "$10-15" or a normalized number of currency signs (for example,
   * "$$$")
   */
  priceRange?: string;
}

const converter = {
  Mon: 'Monday',
  Tues: 'Tuesday',
  Wed: 'Wednesday',
  Thurs: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
} as const;

const validDay = (day: DayOfWeek): RawDayOfWeek =>
  `http://schema.org/${converter[day as keyof typeof converter] ?? day}` as RawDayOfWeek;

const getDayOfWeek = (
  dayOfWeek: undefined | DayOfWeek | DayOfWeek[],
): RawDayOfWeek | RawDayOfWeek[] | undefined =>
  !dayOfWeek ? undefined : Array.isArray(dayOfWeek) ? dayOfWeek.map(validDay) : validDay(dayOfWeek);

const getOpeningHoursSpecification = (
  openingHours: undefined | OpeningHoursSpecification | OpeningHoursSpecification[],
): RawOpeningHoursSpecification | RawOpeningHoursSpecification[] | undefined => {
  if (!openingHours) {
    return undefined;
  }

  if (Array.isArray(openingHours)) {
    return openingHours.map<RawOpeningHoursSpecification>(({ dayOfWeek, ...rest }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: getDayOfWeek(dayOfWeek),
      ...rest,
    }));
  }
  return {
    '@type': 'OpeningHoursSpecification',
    ...openingHours,
    dayOfWeek: getDayOfWeek(openingHours.dayOfWeek),
  };
};

/**
 * When users search for businesses on Google Search or Maps, Search results may
 * display a prominent Knowledge Graph card with details about a business that
 * matched the query.
 */
export const LocalBusinessJsonLd: FC<LocalBusinessJsonLdProps> = ({
  type,
  id,
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  openingHours,
  rating,
  priceRange,
  overrides = {},
  defer = false,
}) => {
  const json: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': type as any,
    '@id': id,
    name,
    description,
    url,
    telephone,
    priceRange,
    image: images,
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ...rating,
        }
      : undefined,
    openingHoursSpecification: getOpeningHoursSpecification(openingHours),
    ...overrides,
  };

  return <JsonLd defer={defer} json={json} />;
};
