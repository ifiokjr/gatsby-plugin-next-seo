import { Link } from 'gatsby';
import React from 'react';

export const Links = () => (
  <ul>
    <li>
      <Link to='/'>Default SEO</Link>
    </li>
    <li>
      <Link to='/article'>Article SEO</Link>
    </li>
    <li>
      <Link to='/book'>Book SEO</Link>
    </li>
    <li>
      <Link to='/profile'>Profile SEO</Link>
    </li>
    <li>
      <Link to='/overridden'>Overridden Seo</Link>
    </li>
    <li>
      <Link to='/jsonld'>All JSON-LD</Link>
    </li>
  </ul>
);
