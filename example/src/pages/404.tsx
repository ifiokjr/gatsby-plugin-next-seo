import { Link } from 'gatsby';
import React from 'react';

const NotFoundPage = () => (
  <>
    <h1>404: Page not found.</h1>
    <p>
      You&apos;ve hit the void. <Link to='/'>Go back.</Link>
    </p>
  </>
);

export default NotFoundPage;
