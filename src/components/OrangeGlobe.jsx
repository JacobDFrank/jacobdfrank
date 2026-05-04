/**
 * OrangeGlobe
 *
 * Renders a real-time 3-D orange using Three.js (dynamically imported).
 * Model file: static/orange.glb
 *
 * Props:
 *   cs  (bool) — case-study variant; uses .orange-globe-cs class instead of
 *                .orange-globe, so the element starts at 140×140 px with no
 *                absolute positioning (the portal wrapper handles placement).
 *
 * Behaviour:
 *   - Constant slow auto-rotation (stops when isSettledRef is true)
 *   - Drag on the orange to spin it manually with inertia
 *   - OrangeEffects takes over the element's position for drift physics
 */

import React, { useEffect, useRef } from 'react';
import { useOrangeMode } from '../contexts/OrangeContext';

const OrangeGlobe = ({ cs = false }) => {
  const mountRef                    = useRef(null);
  const { orangeRef, isSettledRef } = useOrangeMode();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mount = mountRef.current;
    if (!mount) return;

    // Share the mount element so OrangeEffects can read/manipulate its position.
    orangeRef.current = mount;

    let cleanup = null;

    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ]).then(([THREE, { GLTFLoader }, { DRACOLoader }]) => {
      if (!mountRef.current) return;

      // ── Renderer ────────────────────────────────────────────────────────────
      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
      camera.position.z = 3.3;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace    = THREE.SRGBColorSpace;
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mount.appendChild(renderer.domElement);

      // ── Lighting ─────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xfff0e0, 1.4));

      const key = new THREE.DirectionalLight(0xfff8e8, 2.8);
      key.position.set(2.5, 3, 2.0);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xffe0a0, 0.7);
      fill.position.set(-2, 0.5, 1.5);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0x3355dd, 0.6);
      rim.position.set(-1.5, -1, -3);
      scene.add(rim);

      // ── Model ────────────────────────────────────────────────────────────────
      const group = new THREE.Group();
      scene.add(group);

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        '/orange.glb',
        (gltf) => {
          const model = gltf.scene;
          const box    = new THREE.Box3().setFromObject(model);
          const size   = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const scale  = 2.0 / Math.max(size.x, size.y, size.z);
          model.scale.setScalar(scale);
          model.position.copy(center.multiplyScalar(-scale));

          model.traverse((child) => {
            if (!child.isMesh) return;
            child.castShadow = child.receiveShadow = false;
            (Array.isArray(child.material) ? child.material : [child.material]).forEach(mat => {
              if (!mat) return;
              mat.color.set(0xffffff);
              mat.transparent = false;
              mat.opacity     = 1;
              mat.alphaTest   = 0;
              mat.depthWrite  = true;
              mat.side        = THREE.FrontSide;
              mat.needsUpdate = true;
            });
          });

          group.add(model);
        },
        undefined,
        (err) => {
          console.warn('OrangeGlobe: /orange.glb not found — using fallback sphere.', err.message);
          group.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 64, 64),
            new THREE.MeshStandardMaterial({ color: '#ff8c42', roughness: 0.80 })
          ));
        }
      );

      // ── Rotation state ────────────────────────────────────────────────────────
      let autoY  = 0;
      let isDragging = false;
      let prevMX = 0, prevMY = 0;
      let spinVX = 0, spinVY = 0;
      let extraX = 0, extraY = 0;

      // ── Drag to spin ─────────────────────────────────────────────────────────
      const onDown = (e) => {
        isDragging = true;
        prevMX = e.clientX; prevMY = e.clientY;
        spinVX = 0; spinVY = 0;
        mount.style.cursor = 'grabbing';
      };
      const onMoveDrag = (e) => {
        if (!isDragging) return;
        spinVX = (e.clientX - prevMX) * 0.007;
        spinVY = (e.clientY - prevMY) * 0.007;
        extraX += spinVX; extraY += spinVY;
        prevMX = e.clientX; prevMY = e.clientY;
      };
      const onUp = () => { isDragging = false; mount.style.cursor = 'grab'; };

      mount.addEventListener('mousedown',  onDown);
      window.addEventListener('mousemove', onMoveDrag);
      window.addEventListener('mouseup',   onUp);

      // ── Touch drag ───────────────────────────────────────────────────────────
      let prevTX = 0, prevTY = 0;
      const onTouchStart = (e) => {
        isDragging = true;
        prevTX = e.touches[0].clientX; prevTY = e.touches[0].clientY;
        spinVX = 0; spinVY = 0;
      };
      const onTouchMove = (e) => {
        if (!isDragging || !e.touches[0]) return;
        spinVX = (e.touches[0].clientX - prevTX) * 0.007;
        spinVY = (e.touches[0].clientY - prevTY) * 0.007;
        extraX += spinVX; extraY += spinVY;
        prevTX = e.touches[0].clientX; prevTY = e.touches[0].clientY;
      };
      const onTouchEnd = () => { isDragging = false; };

      mount.addEventListener('touchstart', onTouchStart, { passive: true });
      mount.addEventListener('touchmove',  onTouchMove,  { passive: true });
      mount.addEventListener('touchend',   onTouchEnd);

      // ── Render loop ──────────────────────────────────────────────────────────
      let animId;
      const animate = () => {
        animId = requestAnimationFrame(animate);

        const settled = isSettledRef?.current && !isDragging;

        if (!isDragging) {
          // Stop auto-rotation when resting on the floor; let any spin coast to a stop.
          if (!settled) autoY += 0.0028;
          // Faster spin decay when settled so it comes to rest cleanly.
          const decay = settled ? 0.82 : 0.90;
          spinVX *= decay;
          spinVY *= decay;
          extraX += spinVX;
          extraY += spinVY;
        }

        group.rotation.y = autoY + extraX;
        group.rotation.x = extraY;

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize ───────────────────────────────────────────────────────────────
      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // ── Cleanup ──────────────────────────────────────────────────────────────
      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize',    onResize);
        window.removeEventListener('mousemove', onMoveDrag);
        window.removeEventListener('mouseup',   onUp);
        mount.removeEventListener('mousedown',  onDown);
        mount.removeEventListener('touchstart', onTouchStart);
        mount.removeEventListener('touchmove',  onTouchMove);
        mount.removeEventListener('touchend',   onTouchEnd);
        dracoLoader.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div
      ref={mountRef}
      className={cs ? 'orange-globe-cs' : 'orange-globe'}
      aria-hidden="true"
      style={{ cursor: 'grab' }}
    />
  );
};

export default OrangeGlobe;
