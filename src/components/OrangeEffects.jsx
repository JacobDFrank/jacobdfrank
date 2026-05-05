/**
 * OrangeEffects
 *
 * Two always-on effects for any page that mounts an orange:
 *
 *   zest  — fast mouse movement sprays gold particles from the cursor
 *
 *   drift — 2D physics: gravity, wall bounces, drag-and-throw.
 *           While moving the orange physically touches DOM elements:
 *             • a real WebGL / GLSL fragment shader renders concentric
 *               gold ripple rings centred on the orange
 *           When settled the orange stops rotating.
 *
 * Props:
 *   variant  'home'   — orange drifts free after 3.8 s (reparented to body)
 *            'small'  — orange appears immediately at bottom-right, 107 px,
 *                       already settled (used on case study pages)
 */

import { useEffect } from 'react';
import { useOrangeMode } from '../contexts/OrangeContext';


// ─────────────────────────────────────────────────────────────────────────────
//  Zest — gold particles on fast cursor movement (always on)
// ─────────────────────────────────────────────────────────────────────────────

const startZest = () => {
  let lastX = 0, lastY = 0, lastTime = 0;

  const spawn = (x, y, vx, vy) => {
    const el = document.createElement('div');
    el.className = 'zest-particle';
    const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * Math.PI;
    const speed = 35 + Math.random() * 55;
    el.style.left = `${x}px`;
    el.style.top  = `${y}px`;
    el.style.setProperty('--vx', `${Math.cos(angle) * speed}px`);
    el.style.setProperty('--vy', `${Math.sin(angle) * speed}px`);
    const size = 3 + Math.random() * 4;
    el.style.width = el.style.height = `${size}px`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  };

  const onMove = (e) => {
    const now = performance.now();
    const dt  = now - lastTime || 16;
    const vx  = (e.clientX - lastX) / dt * 16;
    const vy  = (e.clientY - lastY) / dt * 16;
    const spd = Math.sqrt(vx * vx + vy * vy);
    if (spd > 5) {
      for (let i = 0; i < Math.min(Math.floor(spd / 8), 5); i++) spawn(e.clientX, e.clientY, vx, vy);
    }
    lastX = e.clientX; lastY = e.clientY; lastTime = now;
  };

  document.addEventListener('mousemove', onMove);
  return () => {
    document.removeEventListener('mousemove', onMove);
    document.querySelectorAll('.zest-particle').forEach(el => el.remove());
  };
};


// ─────────────────────────────────────────────────────────────────────────────
//  GLSL ripple canvas overlay
//
//  Full-screen WebGL canvas (position:fixed, pointer-events:none) sitting
//  just below the orange (z-index 999 vs orange's 1000).
//
//  The fragment shader draws concentric gold ripple rings expanding from
//  the orange's centre. Amplitude scales with velocity; an inner_fade
//  guard keeps the area directly under the orange clean.
// ─────────────────────────────────────────────────────────────────────────────

const initRippleGL = () => {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '999',
  });
  document.body.appendChild(canvas);

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) { canvas.remove(); return null; }

  const vert = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const frag = `
    precision mediump float;

    uniform vec2  u_res;
    uniform vec2  u_ctr;
    uniform float u_vel;
    uniform float u_time;

    void main() {
      vec2  fc   = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
      float dist = distance(fc, u_ctr);

      float vel   = clamp(u_vel * 0.055, 0.0, 1.0);
      float amp   = vel * 0.22;

      float inner = smoothstep(0.0, 64.0, dist);

      float wave  = sin(dist * 0.11 - u_time * 14.0)
                    * amp
                    * exp(-dist * 0.004)
                    * inner;

      float alpha = max(wave, 0.0) * 0.55;

      // $color-primary gold  (#d89f01 → 0.847, 0.624, 0.004)
      gl_FragColor = vec4(0.847, 0.624, 0.004, alpha);
    }
  `;

  const mkSh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, mkSh(gl.VERTEX_SHADER,   vert));
  gl.attachShader(prog, mkSh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1,  1,-1,  -1, 1,
    -1, 1,  1,-1,   1, 1,
  ]), gl.STATIC_DRAW);
  const ap = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(ap);
  gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'u_res');
  const uCtr  = gl.getUniformLocation(prog, 'u_ctr');
  const uVel  = gl.getUniformLocation(prog, 'u_vel');
  const uTime = gl.getUniformLocation(prog, 'u_time');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener('resize', resize);

  return {
    draw(cx, cy, velocity, time) {
      gl.uniform2f(uRes,  canvas.width, canvas.height);
      gl.uniform2f(uCtr,  cx, cy);
      gl.uniform1f(uVel,  velocity);
      gl.uniform1f(uTime, time);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    clear() { gl.clear(gl.COLOR_BUFFER_BIT); },
    destroy() {
      window.removeEventListener('resize', resize);
      canvas.remove();
    },
  };
};


// ─────────────────────────────────────────────────────────────────────────────
//  Drift — 2D physics engine (shared by home and small variants)
//
//  opts:
//    delay        ms before physics activates
//    size         px — override element size (null = keep natural size)
//    startAtFloor true = place at bottom-right immediately, already settled
//    reparent     true = move element to <body> (avoids filter containing-block)
// ─────────────────────────────────────────────────────────────────────────────

const GRAVITY        = 0.38;
const BOUNCE_WALLS   = 0.60;
const BOUNCE_FLOOR   = 0.50;
const AIR_DRAG       = 0.992;
const FLOOR_FRICTION = 0.88;
const STOP_VEL       = 0.6;
const MAX_THROW      = 28;

const startDrift = (orangeRef, isSettledRef, opts = {}) => {
  const {
    delay        = 3800,
    size         = null,
    startAtFloor = false,
    reparent     = true,
  } = opts;

  let posX = 0, posY = 0;
  let velX = 0, velY = 0;
  let orangeW = 400, orangeH = 400;
  let isDragging    = false;
  let dragOffsetX   = 0, dragOffsetY = 0;
  let throwSamples  = [];
  let dragSpeed     = 0;
  let animId;
  let hasDrifted    = false;
  let originalParent = null;
  let glTime        = 0;

  const glRipple = initRippleGL();

  // ── Physics loop ──────────────────────────────────────────────────────────
  const physicsLoop = () => {
    animId = requestAnimationFrame(physicsLoop);
    if (!hasDrifted) return;

    const el = orangeRef.current;
    if (!el) return;

    if (!isDragging) {
      velY += GRAVITY;
      velX *= AIR_DRAG;
      velY *= AIR_DRAG;

      posX += velX;
      posY += velY;

      const maxX = window.innerWidth  - orangeW;
      const maxY = window.innerHeight - orangeH;
      let onFloor = false;

      if (posY >= maxY) {
        posY = maxY; velY = -Math.abs(velY) * BOUNCE_FLOOR;
        if (Math.abs(velY) < STOP_VEL) velY = 0;
        onFloor = true;
      }
      if (posY <= 0)    { posY = 0;    velY =  Math.abs(velY) * BOUNCE_WALLS; }
      if (posX >= maxX) { posX = maxX; velX = -Math.abs(velX) * BOUNCE_WALLS; }
      if (posX <= 0)    { posX = 0;    velX =  Math.abs(velX) * BOUNCE_WALLS; }
      if (onFloor) velX *= FLOOR_FRICTION;

      el.style.left = `${posX}px`;
      el.style.top  = `${posY}px`;

      const atRest = onFloor && velY === 0 && Math.abs(velX) < 0.3;
      if (isSettledRef) isSettledRef.current = atRest;
    }

    const speed = isDragging
      ? dragSpeed
      : Math.sqrt(velX ** 2 + velY ** 2);

    glTime += 0.016;

    if (glRipple) {
      if (speed > 0.5) {
        const r = el.getBoundingClientRect();
        glRipple.draw(
          r.left + r.width  / 2,
          r.top  + r.height / 2,
          speed,
          glTime,
        );
      } else {
        glRipple.clear();
      }
    }
  };

  // ── Settle timer ──────────────────────────────────────────────────────────
  const settleTimer = setTimeout(() => {
    const el = orangeRef.current;
    if (!el) return;

    if (startAtFloor) {
      const SIZE = size || 107;
      orangeW = SIZE;
      orangeH = SIZE;
      posX    = window.innerWidth  - SIZE - 24;
      posY    = window.innerHeight - SIZE - 24;
    } else {
      const r = el.getBoundingClientRect();
      posX    = r.left;
      posY    = r.top;
      orangeW = size || r.width;
      orangeH = size || r.height;
    }

    if (reparent) {
      originalParent = el.parentNode;
      document.body.appendChild(el);
    }

    Object.assign(el.style, {
      position:      'fixed',
      width:         `${orangeW}px`,
      height:        `${orangeH}px`,
      top:           `${posY}px`,
      left:          `${posX}px`,
      right:         'auto',
      transform:     'none',
      pointerEvents: 'auto',
      cursor:        'grab',
      zIndex:        '1000',
      transition:    'none',
    });

    hasDrifted = true;
    if (startAtFloor && isSettledRef) isSettledRef.current = true;

    el.addEventListener('mousedown',  onDragStart);
    el.addEventListener('touchstart', onDragStart, { passive: true });
  }, delay);

  animId = requestAnimationFrame(physicsLoop);

  // ── Drag / throw ──────────────────────────────────────────────────────────
  const getClient = (e) => ({
    x: e.touches ? e.touches[0].clientX : e.clientX,
    y: e.touches ? e.touches[0].clientY : e.clientY,
  });

  const onDragStart = (e) => {
    isDragging = true;
    dragSpeed  = 0;
    if (isSettledRef) isSettledRef.current = false;
    const { x, y } = getClient(e);
    dragOffsetX  = x - posX;
    dragOffsetY  = y - posY;
    throwSamples = [{ x, y, t: performance.now() }];
    velX = 0; velY = 0;
    const el = orangeRef.current;
    if (el) el.style.cursor = 'grabbing';
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const now    = performance.now();
    const { x, y } = getClient(e);
    posX = x - dragOffsetX;
    posY = y - dragOffsetY;
    throwSamples.push({ x, y, t: now });
    if (throwSamples.length > 6) throwSamples.shift();

    if (throwSamples.length >= 2) {
      const a  = throwSamples[throwSamples.length - 2];
      const b  = throwSamples[throwSamples.length - 1];
      const dt = (b.t - a.t) || 16;
      const dvx = (b.x - a.x) / dt * 16;
      const dvy = (b.y - a.y) / dt * 16;
      dragSpeed = Math.sqrt(dvx * dvx + dvy * dvy);
    }

    const el = orangeRef.current;
    if (el) { el.style.left = `${posX}px`; el.style.top = `${posY}px`; }
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    dragSpeed  = 0;
    const el = orangeRef.current;
    if (el) el.style.cursor = 'grab';
    if (throwSamples.length >= 2) {
      const a  = throwSamples[throwSamples.length - 2];
      const b  = throwSamples[throwSamples.length - 1];
      const dt = (b.t - a.t) || 16;
      velX = (b.x - a.x) / dt * 16;
      velY = (b.y - a.y) / dt * 16;
      const spd = Math.sqrt(velX ** 2 + velY ** 2);
      if (spd > MAX_THROW) { velX = velX / spd * MAX_THROW; velY = velY / spd * MAX_THROW; }
    }
    throwSamples = [];
  };

  window.addEventListener('mousemove',  onDragMove);
  window.addEventListener('mouseup',    onDragEnd);
  window.addEventListener('touchmove',  onDragMove, { passive: true });
  window.addEventListener('touchend',   onDragEnd);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  return () => {
    clearTimeout(settleTimer);
    cancelAnimationFrame(animId);
    if (glRipple) glRipple.clear();
    if (glRipple) glRipple.destroy();
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup',   onDragEnd);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend',  onDragEnd);

    const el = orangeRef.current;
    if (el) {
      el.removeEventListener('mousedown',  onDragStart);
      el.removeEventListener('touchstart', onDragStart);
      if (reparent && hasDrifted && originalParent) originalParent.appendChild(el);
      ['position','width','height','top','left','right','transform',
       'pointerEvents','cursor','zIndex','transition'].forEach(p => { el.style[p] = ''; });
    }
  };
};


// ─────────────────────────────────────────────────────────────────────────────
//  OrangeEffects component
// ─────────────────────────────────────────────────────────────────────────────

const OrangeEffects = ({ variant = 'home' }) => {
  const { orangeRef, isSettledRef } = useOrangeMode();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stopZest  = startZest();
    const stopDrift = variant === 'small'
      ? startDrift(orangeRef, isSettledRef, { delay: 100, size: 107, startAtFloor: true, reparent: false })
      : startDrift(orangeRef, isSettledRef, { delay: 3800, reparent: true });

    return () => { stopZest(); stopDrift(); };
  }, []);

  return null;
};

export default OrangeEffects;
