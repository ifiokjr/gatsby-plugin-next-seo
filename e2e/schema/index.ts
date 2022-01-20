import { combineSchemas } from '@cypress/schema-tools';

import articleVersions from './article-schema';
import blogPostingVersions from './blog-posting-schema';
import blogVersions from './blog-schema';
import breadCrumbVersions from './breadcrumb-schema';
import corporateContactVersions from './corporate-contact-schema';
import courseVersions from './course-schema';
import localBusiness from './local-business-schema';
import logoVersions from './logo-schema';
import newsArticleVersions from './newsarticle-schema';
import productVersions from './product-schema';
import sitelinksSearchBox from './sitelinks-search-box-schema';
import socialProfileVersions from './social-profile-schema';

const schemas = combineSchemas(
  articleVersions,
  blogPostingVersions,
  breadCrumbVersions,
  blogVersions,
  courseVersions,
  localBusiness,
  logoVersions,
  productVersions,
  socialProfileVersions,
  corporateContactVersions,
  newsArticleVersions,
  sitelinksSearchBox,
);
export default schemas;
