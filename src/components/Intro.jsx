import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import OrangeGlobe from './OrangeGlobe';

const HOMEPAGE_QUERY = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            intro
            about1
          }
        }
      }
    }
  }
`;

const Intro = () => {
  const data = useStaticQuery(HOMEPAGE_QUERY);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      const SplittingMod = await import('splitting');
      if (cancelled) return;

      const Splitting = SplittingMod.default || SplittingMod;
      const results = Splitting({ target: '.about--intro', by: 'chars' });
      if (!results || !results[0]) return;

      gsap.from(results[0].chars, {
        y: 22,
        opacity: 0,
        stagger: 0.032,
        duration: 0.65,
        ease: 'power3.out',
        delay: 0.1,
        clearProps: 'transform,opacity',
      });
    })();

    return () => { cancelled = true; };
  }, []);

  const node = data.allMarkdownRemark.edges[0]?.node;
  if (!node) return null;

  return (
    <section className="intro-section">
      {/* Orange sits behind the text as a decorative background element */}
      <OrangeGlobe />
      <div className="about--intro">{node.frontmatter.intro}</div>
      <code
        className="about--text mono"
        dangerouslySetInnerHTML={{ __html: node.frontmatter.about1 }}
      />
    </section>
  );
};

export default Intro;
