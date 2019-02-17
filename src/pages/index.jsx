import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Archive from '../components/Archive';
import Listing from '../components/Listing';

const IndexPage = ({location}) => (
  <Layout location={location}>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Archive/>
    <Listing />
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
