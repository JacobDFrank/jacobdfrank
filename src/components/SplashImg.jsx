import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useSpring, animated } from '@react-spring/web';

const SplashImg = (location) => {
  const data = useStaticQuery(graphql`
    query SplashImageAnimateExample {
      file(relativePath: { regex: "/bg/" }) {
        childImageSharp {
          gatsbyImageData(width: 1000, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `);

  const image = getImage(data.file);
  const styles = useSpring({
    from: { height: location.pathname === '/' ? 100 : 200 },
    to: { height: location.pathname === '/' ? 200 : 100 },
  });

  return (
    <animated.div style={{ overflow: 'hidden', ...styles }}>
      <GatsbyImage image={image} alt="Splash background" />
    </animated.div>
  );
};

export default SplashImg;
