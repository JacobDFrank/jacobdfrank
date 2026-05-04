import React, { useEffect, useRef, useState } from 'react';
import orangeImg from '../images/orange.png';
import { buildJuiceDroplets } from '../utils/juiceBurstShadows';

/** True if el is a link, button, or other primary click target (including Gatsby `<Link>` → `<a>`). */
function isInteractiveTarget(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  let node = el;
  while (node && node !== document.body) {
    const tag = node.tagName;
    if (tag === 'A' && node.getAttribute('href')) return true;
    if (tag === 'BUTTON') return true;
    if (tag === 'INPUT' && node.type !== 'hidden') return true;
    if (tag === 'SELECT' || tag === 'TEXTAREA') return true;
    if (tag === 'LABEL') return true;
    const role = node.getAttribute('role');
    if (role === 'button' || role === 'link' || role === 'menuitem' || role === 'tab') return true;
    if (node.getAttribute('contenteditable') === 'true') return true;
    node = node.parentElement;
  }
  return false;
}

/**
 * Custom orange cursor with flying juice-droplet burst on each click.
 * Droplets are real DOM elements that animate outward, rather than a static
 * box-shadow. Orange squeezes + twists while pressed.
 */
const OrangeJuiceCursor = () => {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [overInteractive, setOverInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstDroplets, setBurstDroplets] = useState([]);
  const burstTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    setActive(true);
    document.body.classList.add('has-juice-cursor');

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const next = isInteractiveTarget(under);
      setOverInteractive((prev) => (prev === next ? prev : next));
    };

    const onDown = (e) => {
      if (e.button !== 0) return;
      setPressed(true);
      setBurstDroplets(buildJuiceDroplets(10));
      setBurstKey((k) => k + 1);
      setBurst(true);
      if (burstTimer.current) window.clearTimeout(burstTimer.current);
      burstTimer.current = window.setTimeout(() => setBurst(false), 580);
    };

    const onUp = (e) => {
      if (e.type === 'blur') { setPressed(false); return; }
      if (e.button !== 0) return;
      setPressed(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);

    return () => {
      document.body.classList.remove('has-juice-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
      if (burstTimer.current) window.clearTimeout(burstTimer.current);
    };
  }, []);

  if (!active) return null;

  const cls = [
    'juice-cursor',
    overInteractive && 'juice-cursor--interactive',
    pressed && 'juice-cursor--pressed',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cls}
      style={{
        left: pos.x,
        top: pos.y,
        '--juice-cursor-img': `url(${orangeImg})`,
      }}
      aria-hidden="true"
    >
      {burst && burstDroplets.map((drop, i) => (
        <span
          key={`${burstKey}-${i}`}
          className="juice-cursor__droplet"
          style={{
            '--tx': `${drop.tx}px`,
            '--ty': `${drop.ty}px`,
            '--drop-color': drop.color,
            '--drop-size': `${drop.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default OrangeJuiceCursor;
