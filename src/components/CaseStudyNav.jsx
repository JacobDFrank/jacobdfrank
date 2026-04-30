import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const CaseStudyNav = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [navVisible, setNavVisible] = useState(false);
  // Defer portal creation until after hydration (document.body available)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const anchors = Array.from(document.querySelectorAll('.cs-nav-anchor'));
    if (anchors.length === 0) return;

    const sectionData = anchors.map(el => ({ id: el.id, label: el.dataset.label }));
    setSections(sectionData);
    setActiveId(sectionData[0].id);

    // Scroll-spy: active = last anchor whose top has crossed 30% down the viewport.
    // Using scroll events rather than IntersectionObserver for reliable zero-height
    // anchor detection.
    const updateActive = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.3;
      let currentId = sectionData[0].id;
      for (const anchor of anchors) {
        const elTop = anchor.getBoundingClientRect().top + window.scrollY;
        if (elTop <= triggerY) currentId = anchor.id;
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive(); // set initial state on mount

    // Show nav once the page header (title + description) scrolls out of view.
    // Portaled to document.body so position:fixed is relative to the viewport,
    // not the animated .casestudy-container ancestor.
    const pageHeader = document.getElementById('cs-page-header');
    let headerObserver;
    if (pageHeader) {
      headerObserver = new IntersectionObserver(entries => {
        setNavVisible(!entries[0].isIntersecting);
      }, { threshold: 0 });
      headerObserver.observe(pageHeader);
    }

    return () => {
      window.removeEventListener('scroll', updateActive);
      if (headerObserver) headerObserver.disconnect();
    };
  }, []);

  if (!mounted || sections.length === 0) return null;

  const activeIndex = sections.findIndex(s => s.id === activeId);

  const nav = (
    <nav
      className={`cs-sticky-nav${navVisible ? ' cs-sticky-nav--visible' : ''}`}
      aria-label="Case study sections"
    >
      <div className="cs-sticky-nav__inner">
        {sections.map((s, i) => {
          const isPast = i < activeIndex;
          const isActive = s.id === activeId;
          return (
            <React.Fragment key={s.id}>
              {i > 0 && (
                <span
                  className={`cs-sticky-nav__dot${isPast ? ' cs-sticky-nav__dot--past' : ''}`}
                  aria-hidden="true"
                >·</span>
              )}
              <a
                href={`#${s.id}`}
                className={[
                  'cs-sticky-nav__item',
                  isActive ? 'cs-sticky-nav__item--active' : '',
                  isPast ? 'cs-sticky-nav__item--past' : '',
                ].filter(Boolean).join(' ')}
              >
                {s.label}
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );

  return ReactDOM.createPortal(nav, document.body);
};

export default CaseStudyNav;
