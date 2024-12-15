export default function adjustColor(color, amount) {
  let col = color.slice(1);
  let num = parseInt(col, 16);

  let r = Math.min(255, Math.max(0, (num >> 16) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  let b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
