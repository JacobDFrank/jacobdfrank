/** Orange "juice" palette. */
const JUICE_HEX = [
  '#ff6f00',
  '#ff8c42',
  '#ffb04a',
  '#ff9500',
  '#f5a524',
  '#e67e22',
  '#ffd08a',
  '#d35400',
  '#ff9f1c',
  '#c45c12',
  '#ffa366',
  '#e85d04',
  '#ff7f11',
  '#fb923c',
];

/**
 * Builds an array of droplet descriptors for the click animation.
 * Each droplet flies outward from the cursor to a random position.
 * @param {number} count
 * @returns {{ tx: number, ty: number, color: string, size: number }[]}
 */
export function buildJuiceDroplets(count = 10) {
  return Array.from({ length: count }, (_, i) => {
    // Evenly space base angles around the full circle, then add some jitter
    const baseAngle = (i / count) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * ((Math.PI * 2) / count) * 0.75;
    const angle = baseAngle + jitter;
    const radius = 20 + Math.random() * 34;
    return {
      tx: Math.round(Math.cos(angle) * radius),
      ty: Math.round(Math.sin(angle) * radius),
      color: JUICE_HEX[Math.floor(Math.random() * JUICE_HEX.length)],
      size: 3 + Math.floor(Math.random() * 4), // 3–6 px
    };
  });
}

/**
 * @deprecated Use buildJuiceDroplets instead.
 * Kept for reference; no longer called.
 */
export function buildRandomJuiceBurstShadows(count = 14) {
  const parts = [];
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radiusPx = 26 + Math.random() * 58;
    const jitterX = (Math.random() - 0.5) * 28;
    const jitterY = (Math.random() - 0.5) * 28;
    const x = Math.round(Math.cos(angle) * radiusPx + jitterX);
    const y = Math.round(Math.sin(angle) * radiusPx + jitterY);
    const blur = 3 + Math.random() * 5;
    const col = JUICE_HEX[i % JUICE_HEX.length];
    parts.push(`${x}px ${y}px ${blur}px 0 ${col}`);
  }
  return parts.join(', ');
}
