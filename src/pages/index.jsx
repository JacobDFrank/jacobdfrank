import React from 'react';
import Layout from '../components/Layout';
// import MyImg from '../components/MyImg';
import SEO from '../components/Seo';
import Archive from '../components/Archive';
// import Listing from '../components/Listing';
import Intro from '../components/Intro';
import MoreAboutMe from '../components/MoreAboutMe';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Home" keywords={['portfolio', 'designer', 'adobe']} />
    {/* <MyImg src="bg.jpg" /> */}
    <Intro />
    {/* <Listing /> */}
    <Archive />
    <MoreAboutMe />
  </Layout>
);

export default IndexPage;
