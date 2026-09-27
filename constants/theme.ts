/**
 * AURA Design System Constants
 * 
 * Philosophy:
 * - Clean light aesthetic (white, off-white, subtle green accent, charcoal text)
 * - Apple-level simplicity, Linear-level crispness, Notion-level organization
 * - Moderate corner radius (8-14px)
 * - Thin 1px borders
 * - Minimal, tight shadows (no glow, no gradients, no dark mode default)
 */

export const THEME = {
  colors: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceAlt: "#F9FAFB",
    border: "#E5E7EB",
    borderSubtle: "#F3F4F6",
    
    // Charcoal scale
    textPrimary: "#111827",
    textSecondary: "#4B5563",
    textMuted: "#9CA3AF",
    textInverse: "#FFFFFF",
    
    // Subtle green accent
    accent: "#10B981",
    accentDark: "#059669",
    accentLight: "#ECFDF5",
    accentSubtle: "#D1FAE5",
    
    // Functional colors
    danger: "#EF4444",
    dangerLight: "#FEF2F2",
    dangerBorder: "#FCA5A5",
    success: "#10B981",
    warning: "#F59E0B",
  },
  
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 14,
    full: 9999,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  
  typography: {
    sizes: {
      xs: 12,
      sm: 13,
      base: 15,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      display: 28,
    },
    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    }
  }
} as const;

export type AuraTheme = typeof THEME;
