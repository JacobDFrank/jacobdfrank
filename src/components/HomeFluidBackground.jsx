import React, { useEffect, useRef } from 'react';
import { useOrangeMode } from '../contexts/OrangeContext';

/**
 * Full-viewport WebGL fluid layer (PavelDoGreat fluid sim, MIT).
 * Homepage only: splats follow the orange globe center instead of the cursor.
 *
 * @see https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 */
const HomeFluidBackground = () => {
  const { orangeRef } = useOrangeMode();
  const simRef = useRef(null);
  const followRafRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    document.body.classList.add('has-home-fluid');

    const canvas = document.createElement('canvas');
    canvas.className = 'home-fluid-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    let cancelled = false;

    (async () => {
      const { initHomeFluidSimulation } = await import('../lib/homeFluidSimulation');
      if (cancelled) return;
      const sim = initHomeFluidSimulation(canvas);
      simRef.current = sim;

      const followOrange = () => {
        const el = orangeRef.current;
        if (el && simRef.current) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          simRef.current.setOrangeClientPosition(cx, cy);
        }
        followRafRef.current = requestAnimationFrame(followOrange);
      };
      followRafRef.current = requestAnimationFrame(followOrange);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(followRafRef.current);
      followRafRef.current = 0;
      simRef.current?.destroy();
      simRef.current = null;
      canvas.remove();
      document.body.classList.remove('has-home-fluid');
    };
  }, [orangeRef]);

  return null;
};

export default HomeFluidBackground;
