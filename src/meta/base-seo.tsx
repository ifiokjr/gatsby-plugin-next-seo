import React from 'react';
import { Helmet } from 'react-helmet-async';

import { AllSeoProps, LinkProps, MetaProps } from '../types';

const BASE_DEFAULTS = {
  templateTitle: '',
  noindex: false,
  nofollow: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0,
};

let DEFAULTS = { ...BASE_DEFAULTS };

/**
 * Reset all the defaults.
 *
 * @internal
 */
export const __resetDefaults = () => {
  DEFAULTS = { ...BASE_DEFAULTS };
};

/**
 * This is the BaseSeo component which also takes in the default seo props.
 *
 * @remarks
 *
 * It should be used for setting default props and is used internally as the
 * base for the `GatsbySeo` component.
 *
 * ```tsx
 * import { BaseSeo } from 'gatsby-plugin-next-seo';
 *
 * const Page = () => {
 *   return (
 *     <>
 *       <BaseSeo title='Fun times' defaultOpenGraphImageWidth={100} />
 *       <h1>Look at me!</h1>
 *     </>
 *   );
 * };
 * ```
 *
 * @public
 */
export const BaseSeo = ({
  defer = false,
  metaTags = [],
  linkTags = [],
  ...props
}: AllSeoProps) => {
  const meta: MetaProps[] = [];
  const link: LinkProps[] = [];

  if (props.titleTemplate) {
    DEFAULTS.templateTitle = props.titleTemplate;
  }

  const noindex =
    (props.noindex ?? DEFAULTS.noindex) ||
    props.dangerouslySetAllPagesToNoIndex;
  const nofollow =
    (props.nofollow ?? DEFAULTS.nofollow) ||
    props.dangerouslySetAllPagesToNoFollow;

  const indexTags = ['robots', 'googlebot'];
  if (noindex || nofollow) {
    if (props.dangerouslySetAllPagesToNoIndex) {
      DEFAULTS.noindex = true;
    }
    if (props.dangerouslySetAllPagesToNoFollow) {
      DEFAULTS.nofollow = true;
    }

    for (const name of indexTags) {
      meta.push({
        name,
        content: `${noindex ? 'noindex' : 'index'},${
          nofollow ? 'nofollow' : 'follow'
        }`,
      });
    }
  } else {
    for (const name of indexTags) {
      meta.push({ name, content: 'index,follow' });
    }
  }

  if (props.description) {
    meta.push({ name: 'description', content: props.description });
  }

  if (props.mobileAlternate) {
    link.push({
      rel: 'alternate',
      media: props.mobileAlternate.media,
      href: props.mobileAlternate.href,
    });
  }

  if (props.languageAlternates && props.languageAlternates.length > 0) {
    props.languageAlternates.forEach((languageAlternate) => {
      link.push({
        rel: 'alternate',
        key: `languageAlternate-${languageAlternate.hrefLang}`,
        hrefLang: languageAlternate.hrefLang,
        href: languageAlternate.href,
      });
    });
  }

  if (props.twitter) {
    if (props.twitter.cardType) {
      meta.push({ name: 'twitter:card', content: props.twitter.cardType });
    }

    if (props.twitter.site) {
      meta.push({ name: 'twitter:site', content: props.twitter.site });
    }

    if (props.twitter.handle) {
      meta.push({ name: 'twitter:creator', content: props.twitter.handle });
    }
  }

  if (props.facebook) {
    if (props.facebook.appId) {
      meta.push({ property: 'fb:app_id', content: props.facebook.appId });
    }
  }

  if (props.openGraph) {
    if (props.openGraph.url || props.canonical) {
      meta.push({
        property: 'og:url',
        content: props.openGraph.url ?? props.canonical,
      });
    }

    if (props.openGraph.type) {
      const type = props.openGraph.type.toLowerCase();

      meta.push({ property: 'og:type', content: type });

      if (type === 'profile' && props.openGraph.profile) {
        if (props.openGraph.profile.firstName) {
          meta.push({
            property: 'profile:first_name',
            content: props.openGraph.profile.firstName,
          });
        }

        if (props.openGraph.profile.lastName) {
          meta.push({
            property: 'profile:last_name',
            content: props.openGraph.profile.lastName,
          });
        }

        if (props.openGraph.profile.username) {
          meta.push({
            property: 'profile:username',
            content: props.openGraph.profile.username,
          });
        }

        if (props.openGraph.profile.gender) {
          meta.push({
            property: 'profile:gender',
            content: props.openGraph.profile.gender,
          });
        }
      } else if (type === 'book' && props.openGraph.book) {
        if (
          props.openGraph.book.authors &&
          props.openGraph.book.authors.length
        ) {
          props.openGraph.book.authors.forEach((author) => {
            meta.push({
              property: 'book:author',
              content: author,
            });
          });
        }

        if (props.openGraph.book.isbn) {
          meta.push({
            property: 'book:isbn',
            content: props.openGraph.book.isbn,
          });
        }

        if (props.openGraph.book.releaseDate) {
          meta.push({
            property: 'book:release_date',
            content: props.openGraph.book.releaseDate,
          });
        }

        if (props.openGraph.book.tags && props.openGraph.book.tags.length) {
          props.openGraph.book.tags.forEach((tag) => {
            meta.push({
              property: 'book:tag',
              content: tag,
            });
          });
        }
      } else if (type === 'article' && props.openGraph.article) {
        if (props.openGraph.article.publishedTime) {
          meta.push({
            property: 'article:published_time',
            content: props.openGraph.article.publishedTime,
          });
        }

        if (props.openGraph.article.modifiedTime) {
          meta.push({
            property: 'article:modified_time',
            content: props.openGraph.article.modifiedTime,
          });
        }

        if (props.openGraph.article.expirationTime) {
          meta.push({
            property: 'article:expiration_time',
            content: props.openGraph.article.expirationTime,
          });
        }

        if (
          props.openGraph.article.authors &&
          props.openGraph.article.authors.length
        ) {
          props.openGraph.article.authors.forEach((author) => {
            meta.push({
              property: 'article:author',
              content: author,
            });
          });
        }

        if (props.openGraph.article.section) {
          meta.push({
            property: 'article:section',
            content: props.openGraph.article.section,
          });
        }

        if (
          props.openGraph.article.tags &&
          props.openGraph.article.tags.length
        ) {
          props.openGraph.article.tags.forEach((tag) => {
            meta.push({
              property: 'article:tag',
              content: tag,
            });
          });
        }
      } else if (
        (type === 'video.movie' ||
          type === 'video.episode' ||
          type === 'video.tv_show' ||
          type === 'video.other') &&
        props.openGraph.video
      ) {
        if (
          props.openGraph.video.actors &&
          props.openGraph.video.actors.length
        ) {
          props.openGraph.video.actors.forEach((actor) => {
            if (actor.profile) {
              meta.push({
                property: 'video:actor',
                content: actor.profile,
              });
            }

            if (actor.role) {
              meta.push({
                property: 'video:actor:role',
                content: actor.role,
              });
            }
          });
        }

        if (
          props.openGraph.video.directors &&
          props.openGraph.video.directors.length
        ) {
          props.openGraph.video.directors.forEach((director) => {
            meta.push({
              property: 'video:director',
              content: director,
            });
          });
        }

        if (
          props.openGraph.video.writers &&
          props.openGraph.video.writers.length
        ) {
          props.openGraph.video.writers.forEach((writer) => {
            meta.push({
              property: 'video:writer',
              content: writer,
            });
          });
        }

        if (props.openGraph.video.duration) {
          meta.push({
            property: 'video:duration',
            content: props.openGraph.video.duration.toString(),
          });
        }

        if (props.openGraph.video.releaseDate) {
          meta.push({
            property: 'video:release_date',
            content: props.openGraph.video.releaseDate,
          });
        }

        if (props.openGraph.video.tags && props.openGraph.video.tags.length) {
          props.openGraph.video.tags.forEach((tag) => {
            meta.push({
              property: 'video:tag',
              content: tag,
            });
          });
        }

        if (props.openGraph.video.series) {
          meta.push({
            property: 'video:series',
            content: props.openGraph.video.series,
          });
        }
      }
    }

    if (props.openGraph.title || props.title) {
      meta.push({
        property: 'og:title',
        content: props.openGraph.title ?? props.title,
      }); // TODO fix titleTemplate fallback
    }

    if (props.openGraph.description || props.description) {
      meta.push({
        property: 'og:description',
        content: props.openGraph.description ?? props.description,
      });
    }

    // images
    if (props.defaultOpenGraphImageWidth) {
      DEFAULTS.defaultOpenGraphImageWidth = props.defaultOpenGraphImageWidth;
    }

    if (props.defaultOpenGraphImageHeight) {
      DEFAULTS.defaultOpenGraphImageHeight = props.defaultOpenGraphImageHeight;
    }

    if (props.openGraph.images && props.openGraph.images.length) {
      props.openGraph.images.forEach((image) => {
        meta.push({
          property: 'og:image',
          content: image.url,
        });

        if (image.alt) {
          meta.push({
            property: 'og:image:alt',
            content: image.alt,
          });
        }

        if (image.width) {
          meta.push({
            property: 'og:image:width',
            content: image.width.toString(),
          });
        } else if (DEFAULTS.defaultOpenGraphImageWidth) {
          meta.push({
            property: 'og:image:width',
            content: DEFAULTS.defaultOpenGraphImageWidth.toString(),
          });
        }

        if (image.height) {
          meta.push({
            property: 'og:image:height',
            content: image.height.toString(),
          });
        } else if (DEFAULTS.defaultOpenGraphImageHeight) {
          meta.push({
            property: 'og:image:height',
            content: DEFAULTS.defaultOpenGraphImageHeight.toString(),
          });
        }
      });
    }

    // videos
    if (props.defaultOpenGraphVideoWidth) {
      DEFAULTS.defaultOpenGraphVideoWidth = props.defaultOpenGraphVideoWidth;
    }

    if (props.defaultOpenGraphVideoHeight) {
      DEFAULTS.defaultOpenGraphVideoHeight = props.defaultOpenGraphVideoHeight;
    }

    if (props.openGraph.videos && props.openGraph.videos.length) {
      props.openGraph.videos.forEach((video) => {
        meta.push({
          property: 'og:video',
          content: video.url,
        });

        if (video.alt) {
          meta.push({
            property: 'og:video:alt',
            content: video.alt,
          });
        }

        if (video.width) {
          meta.push({
            property: 'og:video:width',
            content: video.width.toString(),
          });
        } else if (DEFAULTS.defaultOpenGraphVideoWidth) {
          meta.push({
            property: 'og:video:width',
            content: DEFAULTS.defaultOpenGraphVideoWidth.toString(),
          });
        }

        if (video.height) {
          meta.push({
            property: 'og:video:height',
            content: video.height.toString(),
          });
        } else if (DEFAULTS.defaultOpenGraphVideoHeight) {
          meta.push({
            property: 'og:video:height',
            content: DEFAULTS.defaultOpenGraphVideoHeight.toString(),
          });
        }
      });
    }

    if (props.openGraph.locale) {
      meta.push({ property: 'og:locale', content: props.openGraph.locale });
    }

    if (props.openGraph.site_name) {
      meta.push({
        property: 'og:site_name',
        content: props.openGraph.site_name,
      });
    }
  }

  if (props.canonical) {
    link.push({ rel: 'canonical', href: props.canonical, key: 'canonical' });
  }

  metaTags.forEach((tag) => {
    meta.push(tag);
  });

  linkTags.forEach((tag) => {
    link.push(tag);
  });

  const htmlAttributes = props.language ? { lang: props.language } : {};

  return (
    <>
      <Helmet
        meta={meta}
        link={link}
        title={props.title}
        titleTemplate={DEFAULTS.templateTitle}
        defer={defer}
        htmlAttributes={htmlAttributes}
      ></Helmet>
    </>
  );
};
