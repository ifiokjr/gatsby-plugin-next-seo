<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [gatsby-plugin-next-seo](./gatsby-plugin-next-seo.md) &gt; [DefaultSeoProps](./gatsby-plugin-next-seo.defaultseoprops.md) &gt; [dangerouslySetAllPagesToNoIndex](./gatsby-plugin-next-seo.defaultseoprops.dangerouslysetallpagestonoindex.md)

## DefaultSeoProps.dangerouslySetAllPagesToNoIndex property

It has the prefix of `dangerously` because it will `noindex` all pages. As this is an SEO plugin, that is kinda dangerous action. It is \*\*not\*\* bad to use this, just please be sure you want to `noindex` \*\*EVERY\*\* page. You can still override this at a page level if you have a use case to `index` a page. This can be done by setting `noindex: false`<!-- -->.

<b>Signature:</b>

```typescript
dangerouslySetAllPagesToNoIndex?: boolean;
```