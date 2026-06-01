// WCAG Color Contrast Analyzer
// Formula: (L1 + 0.05) / (L2 + 0.05), where L is relative luminance

function getLuminance(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  
  const [rs, gs, bs] = [r, g, b].map(x => {
    x = x / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

function isAACompliant(ratio) {
  return parseFloat(ratio) >= 4.5;
}

function isAAACompliant(ratio) {
  return parseFloat(ratio) >= 7.0;
}

const colors = {
  // Primary colors
  yellow600: '#ca8a04',
  yellow700: '#b45309',
  yellow300: '#fcd34d',
  yellow100: '#fef3c7',
  
  // Text colors
  gray900: '#111827',
  gray700: '#374151',
  gray600: '#4b5563',
  gray300: '#d1d5db',
  gray200: '#e5e7eb',
  white: '#ffffff',
  
  // Backgrounds
  gray50: '#f9fafb',
  black: '#000000',
  
  // Dark overlays (approximate)
  darkOverlay60: '#000000'  // 60% opacity
};

const colorCombinations = [
  { name: 'CTA Button (Yellow 600 on White)', fg: colors.yellow600, bg: colors.white },
  { name: 'Hero Heading (Yellow Gradient on Dark Overlay)', fg: colors.yellow300, bg: colors.darkOverlay60 },
  { name: 'Hero Body (Gray 200 on Dark Overlay)', fg: colors.gray200, bg: colors.darkOverlay60 },
  { name: 'H1 (Gray 900 on White)', fg: colors.gray900, bg: colors.white },
  { name: 'H2 (Gray 900 on Gray 50)', fg: colors.gray900, bg: colors.gray50 },
  { name: 'Body Text (Gray 700 on White)', fg: colors.gray700, bg: colors.white },
  { name: 'Body Text (Gray 300 on Gray 900)', fg: colors.gray300, bg: '#111827' },
  { name: 'Small Text (Gray 600 on White)', fg: colors.gray600, bg: colors.white },
  { name: 'Focus Ring (Yellow 600 on White input)', fg: colors.yellow600, bg: colors.white },
  { name: 'Quote Text (Yellow 600 on Gray 50)', fg: colors.yellow600, bg: colors.gray50 },
];

console.log('=== WCAG Color Contrast Analysis ===\n');
console.log('WCAG AA: 4.5:1 (normal text), 3:1 (large text)');
console.log('WCAG AAA: 7:1 (normal text), 4.5:1 (large text)\n');

colorCombinations.forEach(combo => {
  const ratio = getContrast(combo.fg, combo.bg);
  const aa = isAACompliant(ratio) ? 'PASS' : 'FAIL';
  const aaa = isAAACompliant(ratio) ? 'PASS' : 'FAIL';
  
  console.log(`${combo.name}`);
  console.log(`  Ratio: ${ratio}:1 | AA: ${aa} | AAA: ${aaa}`);
  console.log(`  FG: ${combo.fg} | BG: ${combo.bg}`);
  console.log('');
});
