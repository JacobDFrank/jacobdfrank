import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import SEO from './Seo';
import CaseStudyNav from './CaseStudyNav';
import StatsCountUp from './StatsCountUp';
import OrangeGlobe from './OrangeGlobe';
import OrangeEffects from './OrangeEffects';
import { OrangeProvider } from '../contexts/OrangeContext';
import { graphql } from 'gatsby';

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 8.00004L2.64652 7.64648L5.64652 4.64648L6.35363 5.35359L4.20718 7.50004L12.5001 7.50004V8.50004L4.20718 8.50004L6.35363 10.6465L5.64652 11.3536L2.64652 8.35359L2.29297 8.00004Z" fill="currentColor" />
  </svg>
);

const MenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="cs-hn--pill__menu-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M1 3H15V4H1V3ZM1 7H15V8H1V7ZM15 11H1V12H15V11Z" fill="currentColor" />
  </svg>
);

/**
 * OrangePortal — renders the small case-study orange into document.body.
 *
 * Uses a portal to escape Gatsby's page-entrance container which applies
 * filter:blur() — a non-none filter creates a new fixed-positioning containing
 * block, trapping any position:fixed descendants inside it. The portal renders
 * directly under <body> so OrangeEffects can position it relative to the
 * true viewport.
 */
const OrangePortal = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top:      '-300px',
      left:     '-300px',
      width:    '107px',
      height:   '107px',
    }}>
      <OrangeGlobe cs />
    </div>,
    document.body
  );
};

const ProjectLayout = ({ data, location }) => {
  const { markdownRemark, allMarkdownRemark } = data;
  const { title, description, timePeriod, URLpath } = markdownRemark.frontmatter;

  const allProjects   = allMarkdownRemark.edges.map(e => e.node.frontmatter);
  const otherProjects = allProjects.filter(p => p.URLpath !== URLpath);

  const [menuOpen, setMenuOpen]     = useState(false);
  const [flyoutStyle, setFlyoutStyle] = useState({});
  const menuRef = useRef(null);
  const btnRef  = useRef(null);

  const handleToggle = () => {
    if (!menuOpen && btnRef.current) {
      const r        = btnRef.current.getBoundingClientRect();
      const itemH    = 47;
      const approxH  = Math.min(otherProjects.length * itemH + 16, 320);
      const spaceBelow = window.innerHeight - r.bottom - 8;
      const showBelow  = spaceBelow >= approxH;
      setFlyoutStyle({
        position: 'fixed',
        right:  `${window.innerWidth - r.right}px`,
        ...(showBelow
          ? { top:    `${r.bottom + 8}px` }
          : { bottom: `${window.innerHeight - r.top + 8}px` }),
      });
    }
    setMenuOpen(v => !v);
  };

  // Close flyout on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <OrangeProvider>
      <OrangeEffects variant="small" />
      <OrangePortal />

      <Layout location={location}>
        <div className="casestudy-container">
          <div className="markdown-body">
            <div id="cs-page-header">

              {/* Breadcrumb + Other Projects flyout on one line */}
              <div className="cs-page-header-nav">
                <nav className="cs-hn cs-hn--breadcrumb" aria-label="Breadcrumb">
                  <a href="/" className="cs-hn__crumb-home">Jacob Frank</a>
                  <span className="cs-hn__sep" aria-hidden="true">/</span>
                  <span className="cs-hn__crumb-current">{title}</span>
                </nav>

                {otherProjects.length > 0 && (
                  <div className="cs-projects-menu" ref={menuRef}>
                    <button
                      ref={btnRef}
                      className="cs-hn cs-hn--pill cs-hn--pill--icon-only"
                      onClick={handleToggle}
                      aria-expanded={menuOpen}
                      aria-haspopup="listbox"
                      aria-label="Other projects"
                      type="button"
                    >
                      <MenuIcon />
                    </button>

                    {menuOpen && (
                      <div
                        className="cs-projects-flyout"
                        role="listbox"
                        aria-label="Other projects"
                        style={flyoutStyle}
                      >
                        {otherProjects.map(p => (
                          <a
                            key={p.URLpath}
                            href={`/projects${p.URLpath}`}
                            className="cs-projects-flyout__item"
                            role="option"
                          >
                            {p.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Eyebrow: time period above the title */}
              {timePeriod && (
                <div className="cs-page-eyebrow">{timePeriod}</div>
              )}

              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <CaseStudyNav />
            <StatsCountUp />
            <div className="content" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </div>
          <a href="/" className="cs-home-btn">
            <ArrowLeft />
            Go to other projects
          </a>
        </div>
      </Layout>
    </OrangeProvider>
  );
};

export default ProjectLayout;

export const Head = ({ data }) => (
  <SEO
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.description}
  />
);

export const query = graphql`
  query PostQuery($URLpath: String!) {
    markdownRemark(frontmatter: { URLpath: { eq: $URLpath } }) {
      html
      frontmatter {
        title
        date
        URLpath
        timePeriod
        description
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            URLpath
          }
        }
      }
    }
  }
`;
