import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const POST_ARCHIVE_QUERY = graphql`
  query ArchiveQuery {
    allMarkdownRemark(
      limit: 6,
      filter: { fileAbsolutePath: { regex: "/projects/" }, frontmatter: { published: { ne: false } } },
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            URLpath
            published
            date
            description
          }
        }
      }
    }
  }
`;

const Archive = () => {
  const data = useStaticQuery(POST_ARCHIVE_QUERY);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const section = sectionRef.current;
    if (!section) return;

    // ── Mouse tracking: update --mouse-x/y on each card for the spotlight glow ──
    const onMouseMove = (e) => {
      const cards = section.querySelectorAll('.project');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    section.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── GSAP staggered entrance ────────────────────────────────────────────────
    let cancelled = false;
    let batchTriggers = [];

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      (async () => {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const cols = Array.from(section.querySelectorAll('.grid__col'));
        if (!cols.length) return;

        // Pre-hide so cards animate in rather than flash
        gsap.set(cols, { opacity: 0, y: 20 });

        batchTriggers = ScrollTrigger.batch(cols, {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.52,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'all',
            });
          },
          once: true,
          start: 'top 90%',
        }) || [];
      })();
    }

    return () => {
      cancelled = true;
      section.removeEventListener('mousemove', onMouseMove);
      batchTriggers.forEach((t) => t.kill());
    };
  }, []);

  const { allMarkdownRemark } = data;

  return (
    <section className="projects grid" id="projects" ref={sectionRef}>
      <h2 className="projectListing--title">Past projects</h2>
      {allMarkdownRemark.edges.map((project) => {
        const { title, URLpath, description } = project.node.frontmatter;
        return (
          <div
            className="grid__col grid__col--1-of-3 grid__col--m-1-of-2"
            key={URLpath}
          >
            <div className="project">
              <Link to={`/projects${URLpath}`}>
                <h3 className="projectListing--project-title">{title}</h3>
                <span className="projectListing--project-text">{description}</span>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Archive;
