/**
 * LUMINA LIVE - DESIGN SYSTEM TOKENS
 * Single Source of Truth for Web, Flutter, and React Native
 */

export const DesignTokens = {
  colors: {
    base: {
      white: '#FFFFFF',
      black: '#0F172A',
      transparent: 'transparent',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC', // Slate 50
      tertiary: '#F1F5F9', // Slate 100
      glass: 'rgba(255, 255, 255, 0.7)',
      glassDark: 'rgba(15, 23, 42, 0.6)',
    },
    brand: {
      orange: {
        DEFAULT: '#FF6B00',
        light: '#FF8533',
        dark: '#CC5500',
        bg: '#FFF0E5',
      },
      amber: {
        DEFAULT: '#FF9E0B',
        light: '#FFB340',
        dark: '#CC7E09',
      }
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FF6B00 0%, #FF9E0B 100%)', // Orange -> Amber
      surface: 'linear-gradient(180deg, #FFFFFF 0%, #FFF6F0 100%)', // White -> Soft Orange
      live: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)', // Red -> Pink
      dark: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)', // Slate 900 -> Slate 700
    },
    semantic: {
      success: '#10B981', // Emerald 500
      warning: '#F59E0B', // Amber 500
      error: '#EF4444',   // Red 500
      info: '#3B82F6',    // Blue 500
    },
    text: {
      primary: '#0F172A', // Slate 900
      secondary: '#64748B', // Slate 500
      tertiary: '#94A3B8', // Slate 400
      disabled: '#CBD5E1', // Slate 300
      inverse: '#FFFFFF',
    }
  },
  typography: {
    family: {
      sans: '"Plus Jakarta Sans", sans-serif',
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '2.5rem',  // 40px
    },
    heights: {
      tight: '1.1',
      normal: '1.5',
      relaxed: '1.625',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },
  borderRadius: {
    sm: '8px',    // Inputs, small tags
    md: '16px',   // Cards, standard containers
    lg: '24px',   // Modals, large cards
    full: '9999px', // Buttons, pills
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(255, 107, 0, 0.5)', // Brand glow
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  animation: {
    durations: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easings: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  }
};