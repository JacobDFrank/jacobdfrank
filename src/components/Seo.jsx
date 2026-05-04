import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '../images/icon.png';
import socialImage from '../images/SocialImage.png';

function SEO({ description, lang, keywords, title }) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  const metaDescription = description || data.site.siteMetadata.description;
  const fullTitle = title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title;

  return (
    <>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

      <meta property="og:title" content="Jacob Frank; Developer, Designer, and Student" />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="https://jacobdfrank.com" />
      <meta property="og:url" content="https://jacobdfrank.com" />

      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta itemProp="name" content="Jacob Frank" />
      <meta itemProp="description" content={metaDescription} />
      <meta itemProp="image" content={socialImage} />

      <meta name="author" content="Jacob Frank" />

      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <link rel="icon" href={favicon} type="image/x-icon" />

      {/* Space Grotesk (sans), Space Mono (mono), Instrument Serif (display name) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </>
  );
}

SEO.defaultProps = {
  lang: 'en',
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
