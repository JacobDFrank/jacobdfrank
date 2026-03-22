import React, { useEffect, useRef, useState } from 'react';
import orangeImg from '../images/orange.png';
import { buildRandomJuiceBurstShadows } from '../utils/juiceBurstShadows';

/**
 * Custom orange cursor with randomized juice droplet burst on each click.
 * Orange stays scaled down while primary button is held.
 */
const OrangeJuiceCursor = () => {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstShadow, setBurstShadow] = useState('');
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
    };

    const onDown = (e) => {
      if (e.button !== 0) return;
      setPressed(true);
      setBurstShadow(buildRandomJuiceBurstShadows(14));
      setBurstKey((k) => k + 1);
      setBurst(true);
      if (burstTimer.current) window.clearTimeout(burstTimer.current);
      burstTimer.current = window.setTimeout(() => setBurst(false), 720);
    };

    const onUp = (e) => {
      if (e.type === 'blur') {
        setPressed(false);
        return;
      }
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

  const cls = ['juice-cursor', pressed && 'juice-cursor--pressed'].filter(Boolean).join(' ');

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
      {burst && (
        <span
          key={burstKey}
          className="juice-cursor__burst"
          style={{ boxShadow: burstShadow }}
        />
      )}
    </div>
  );
};

export default OrangeJuiceCursor;
