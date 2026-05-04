import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 5.59082V16H9.5V10.5H6.5V16H1V5.59082L8 0L15 5.59082ZM2 6.07129V15H5.5V9.5H10.5V15H14V6.07129L8 1.2793L2 6.07129Z" fill="currentColor" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.29297 8.00004L2.64652 7.64648L5.64652 4.64648L6.35363 5.35359L4.20718 7.50004L12.5001 7.50004V8.50004L4.20718 8.50004L6.35363 10.6465L5.64652 11.3536L2.64652 8.35359L2.29297 8.00004Z" fill="currentColor" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 8.00004L12.3536 7.64648L9.35355 4.64648L8.64645 5.35359L10.7929 7.50004L2.5 7.50004L2.5 8.50004L10.7929 8.50004L8.64645 10.6465L9.35355 11.3536L12.3536 8.35359L12.7071 8.00004Z" fill="currentColor" />
  </svg>
);

const CaseStudyNav = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [navVisible, setNavVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Start both true = no fade flash on initial render; updated after mount
  const [itemsAtStart, setItemsAtStart] = useState(true);
  const [itemsAtEnd, setItemsAtEnd] = useState(true);
  const itemsRef = useRef(null);

  // Reads actual scrollLeft of the items strip and updates which edges are
  // flush — only those edges get a fade. Stable ref: only uses itemsRef + setters.
  const updateItemsEdgeState = useCallback(() => {
    const el = itemsRef.current;
    if (!el) return;
    setItemsAtStart(el.scrollLeft <= 1);
    // 1px tolerance for sub-pixel rounding
    setItemsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  // Page scroll-spy + header visibility observer
  useEffect(() => {
    setMounted(true);

    const anchors = Array.from(document.querySelectorAll('.cs-nav-anchor'));
    if (anchors.length === 0) return;

    const sectionData = anchors.map(el => ({ id: el.id, label: el.dataset.label }));
    setSections(sectionData);
    setActiveId(sectionData[0].id);

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
    updateActive();

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

  // Attach scroll listener to the items strip once the portal mounts
  useEffect(() => {
    if (!mounted || !itemsRef.current) return;
    const el = itemsRef.current;
    el.addEventListener('scroll', updateItemsEdgeState, { passive: true });
    updateItemsEdgeState(); // initialise edge state
    return () => el.removeEventListener('scroll', updateItemsEdgeState);
  }, [mounted, updateItemsEdgeState]);

  const activeIndex = sections.findIndex(s => s.id === activeId);

  // Scroll the strip to center the active item, but never past the natural
  // scroll end — so the last item stays fully visible rather than drifting
  // left into empty space as the user reaches the end of the page.
  useEffect(() => {
    if (!itemsRef.current || activeIndex < 0) return;
    const container = itemsRef.current;
    const activeEl = container.querySelector('.cs-sticky-nav__item--active');
    if (!activeEl) return;
    const scrollTarget =
      activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: Math.min(Math.max(0, scrollTarget), Math.max(0, maxScroll)),
      behavior: 'smooth',
    });
    updateItemsEdgeState();
    const t = setTimeout(updateItemsEdgeState, 350);
    return () => clearTimeout(t);
  }, [activeIndex, updateItemsEdgeState]);

  // Use window.scrollTo instead of scrollIntoView — the page-entrance animation
  // leaves transform:translate3d(0,0,0) on the casestudy-container (fill-mode:both),
  // which creates a scroll port in Chrome/WebKit. scrollIntoView targets that
  // container, finds no overflow:scroll/auto, and silently does nothing.
  // window.scrollTo always scrolls the window, bypassing the transformed ancestor.
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeIndex <= 0) return;
    scrollToId(sections[activeIndex - 1].id);
  };

  const handleNext = () => {
    if (activeIndex >= sections.length - 1) return;
    scrollToId(sections[activeIndex + 1].id);
  };

  if (!mounted || sections.length === 0) return null;

  const itemsClass = [
    'cs-sticky-nav__items',
    itemsAtStart ? 'cs-sticky-nav__items--at-start' : '',
    itemsAtEnd   ? 'cs-sticky-nav__items--at-end'   : '',
  ].filter(Boolean).join(' ');

  const nav = (
    <nav
      className={`cs-sticky-nav${navVisible ? ' cs-sticky-nav--visible' : ''}`}
      aria-label="Case study sections"
    >
      <div className="cs-sticky-nav__row">

        {/* Home icon — circular pill outside and to the left of the section strip */}
        <a href="/" className="cs-sticky-nav__home" aria-label="Go to home">
          <HomeIcon />
        </a>

        {/* Section pill */}
        <div className="cs-sticky-nav__inner">

          <button
            className="cs-sticky-nav__arrow cs-sticky-nav__arrow--prev"
            onClick={handlePrev}
            disabled={activeIndex <= 0}
            aria-label="Previous section"
          >
            <ArrowLeft />
          </button>

          <div className={itemsClass} ref={itemsRef}>
            {sections.map((s, i) => {
              const isActive = s.id === activeId;
              return (
                <React.Fragment key={s.id}>
                  {i > 0 && (
                    <span className="cs-sticky-nav__dot" aria-hidden="true">·</span>
                  )}
                  <a
                    href={`#${s.id}`}
                    className={[
                      'cs-sticky-nav__item',
                      isActive ? 'cs-sticky-nav__item--active' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {s.label}
                  </a>
                </React.Fragment>
              );
            })}
            {/* "More projects" is always the last item in the strip, preceded by a dot */}
            <span className="cs-sticky-nav__dot" aria-hidden="true">·</span>
            <a href="/#projects" className="cs-sticky-nav__item">More projects</a>
          </div>

          <button
            className="cs-sticky-nav__arrow cs-sticky-nav__arrow--next"
            onClick={handleNext}
            disabled={activeIndex >= sections.length - 1}
            aria-label="Next section"
          >
            <ArrowRight />
          </button>

        </div>

      </div>
    </nav>
  );

  return ReactDOM.createPortal(nav, document.body);
};

export default CaseStudyNav;
