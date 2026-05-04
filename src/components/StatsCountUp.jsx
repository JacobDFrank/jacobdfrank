import React, { useEffect } from 'react';

// Parses the numeric value, prefix, and suffix from a stat string.
// Returns null for formats it can't handle (e.g. "13.5% → 16.1%").
function parseStat(text) {
  const t = text.trim();
  if (t.includes('→')) return null;
  // Match: optional leading +, digits with optional commas/decimal, everything else as suffix
  const m = t.match(/^([+]?)(\d[\d,.]*)(.*)$/);
  if (!m) return null;
  const [, prefix, rawNum, suffix] = m;
  const cleaned = rawNum.replace(/,/g, '');
  const value = parseFloat(cleaned);
  if (isNaN(value)) return null;
  const decimalPlaces = cleaned.includes('.') ? cleaned.split('.')[1].length : 0;
  const hasComma = rawNum.includes(',');
  return { prefix, value, suffix, decimalPlaces, hasComma, original: t };
}

function formatStat(val, { prefix, suffix, decimalPlaces, hasComma }) {
  let numStr;
  if (decimalPlaces > 0) {
    numStr = val.toFixed(decimalPlaces);
  } else if (hasComma) {
    numStr = Math.round(val).toLocaleString('en-US');
  } else {
    numStr = String(Math.round(val));
  }
  return prefix + numStr + suffix;
}

// Renders nothing — purely a side-effect component that wires up
// GSAP ScrollTrigger count-up animations on .cs-stats__number elements.
const StatsCountUp = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    const triggers = [];

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll('.cs-stats__number').forEach(el => {
        const parsed = parseStat(el.textContent);
        if (!parsed) return;

        // Set initial display value (shows "0%" etc. before entering view)
        el.textContent = formatStat(0, parsed);

        const obj = { val: 0 };
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: parsed.value,
              duration: 1.6,
              ease: 'power2.out',
              snap: parsed.decimalPlaces === 0 ? { val: 1 } : undefined,
              onUpdate() {
                el.textContent = formatStat(obj.val, parsed);
              },
              onComplete() {
                el.textContent = parsed.original; // restore exact original
              },
            });
          },
        });
        triggers.push(st);
      });
    })();

    return () => {
      cancelled = true;
      triggers.forEach(st => st.kill());
    };
  }, []);

  return null;
};

export default StatsCountUp;
