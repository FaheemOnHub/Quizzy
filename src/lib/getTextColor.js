// Convert hex color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

// Calculate relative luminance
function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [rl, gl, bl] = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl; // Weighted average for luminance
}

// Decide text color
export default function getTextColor(bgColor) {
  const luminance = getLuminance(bgColor);
  return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Black text for light bg, white for dark
}
