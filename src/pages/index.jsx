import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Archive from '../components/Archive';
import Intro from '../components/Intro';
import MoreAboutMe from '../components/MoreAboutMe';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Intro />
    <Archive />
    <MoreAboutMe />
  </Layout>
);

export default IndexPage;

export const Head = () => (
  <SEO title="Home" keywords={['portfolio', 'designer', 'adobe']} />
);
