/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Wireframe v2 colors
    bg: '#F7F7F5',
    surface: '#FFFFFF',
    ink: '#16181C',
    inkSoft: '#6B7077',
    inkFaint: '#9CA0A6',
    line: '#E8E9EB',
    accent: '#2F6F4E',
    accentTint: '#E5F2EA',
    warn: '#B8860B',
    warnTint: '#FBF0DA',
    pending: '#ECEDEF',
    // Aliases for compatibility
    text: '#16181C',
    background: '#F7F7F5',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E8E9EB',
    textSecondary: '#6B7077',
    tint: '#2F6F4E',
  },
  dark: {
    bg: '#16181C',
    surface: '#1F2126',
    ink: '#F7F7F5',
    inkSoft: '#9CA0A6',
    inkFaint: '#6B7077',
    line: '#2F3238',
    accent: '#4AB973',
    accentTint: '#1F3D2A',
    warn: '#D4A500',
    warnTint: '#3D3200',
    pending: '#2F3238',
    text: '#F7F7F5',
    background: '#16181C',
    backgroundElement: '#1F2126',
    backgroundSelected: '#2F3238',
    textSecondary: '#9CA0A6',
    tint: '#4AB973',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
