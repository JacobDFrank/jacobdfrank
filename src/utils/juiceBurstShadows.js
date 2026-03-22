/** Orange “juice” palette (matches former SCSS list). */
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
 * Random radial juice droplet positions (box-shadow string) for each click.
 * @param {number} count
 * @returns {string}
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
