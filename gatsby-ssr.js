import React from 'react';

/**
 * Inject Google Fonts on every page at the SSR/build level.
 * This guarantees Space Grotesk, Space Mono, and Instrument Serif load
 * before paint regardless of which page component is rendered.
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="gf-preconnect-1"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="gf-preconnect-2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="gf-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Instrument+Serif:ital@0;1&display=swap"
    />,
  ]);
};
