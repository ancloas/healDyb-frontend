// theme.js
// Single source of truth for colors, spacing, and type.
// Keep this utility-first: no decorative palette, just clear states.

export const colors = {
  bg: '#F7F7F5',
  surface: '#FFFFFF',
  ink: '#16181C',
  inkSoft: '#6B7077',
  inkFaint: '#9CA0A6',
  line: '#E8E9EB',

  accent: '#2F6F4E',      // good / done / improving
  accentTint: '#E5F2EA',

  warn: '#B8860B',        // due / needs attention (never "failure red")
  warnTint: '#FBF0DA',

  pending: '#ECEDEF',
  black: '#111214',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 18,
};

export const type = {
  h1: { fontSize: 22, fontWeight: '800', color: colors.ink },
  h2: { fontSize: 18, fontWeight: '800', color: colors.ink },
  label: { fontSize: 10.5, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase', color: colors.inkFaint },
  body: { fontSize: 14.5, fontWeight: '500', color: colors.ink },
  bodySoft: { fontSize: 13, fontWeight: '500', color: colors.inkSoft },
  caption: { fontSize: 11.5, fontWeight: '600', color: colors.inkFaint },
};

export default { colors, spacing, radius, type };
