import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Archive from '../components/Archive';
import Intro from '../components/Intro';
import MoreAboutMe from '../components/MoreAboutMe';
import { OrangeProvider } from '../contexts/OrangeContext';
import OrangeEffects from '../components/OrangeEffects';

/**
 * Homepage
 *
 * OrangeProvider shares a ref to the orange globe element so OrangeEffects
 * can read its screen position for the drift + ripple behaviours.
 */
const IndexPage = () => (
  <OrangeProvider>
    <OrangeEffects />
    <Layout>
      <Intro />
      <Archive />
      <MoreAboutMe />
    </Layout>
  </OrangeProvider>
);

export default IndexPage;

export const Head = () => (
  <SEO title="Home" keywords={['portfolio', 'designer', 'adobe']} />
);
