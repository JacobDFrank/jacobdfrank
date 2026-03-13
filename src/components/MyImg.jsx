import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const MyImg = function (props) {
  const { images } = useStaticQuery(graphql`
    query {
      images: allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
        edges {
          node {
            extension
            relativePath
            childImageSharp {
              gatsbyImageData(width: 1000, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  const file = images.edges.find(image => image.node.relativePath === props.src);
  if (!file) return null;

  const image = getImage(file.node.childImageSharp);
  return <GatsbyImage image={image} alt={props.alt || ''} />;
};

export default MyImg;
