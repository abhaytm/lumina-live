# Lumina Live - Design System & Token Architecture

**Version:** 1.0.0  
**Target:** Flutter & React Native (Mobile MVP)  
**Style:** Premium, Vibrant, Clickable.

---

## 1. Design Tokens Table

### 1.1 Color Tokens

| Token Name | Value | Description |
| :--- | :--- | :--- |
| `color.brand.orange` | `#FF6B00` | Primary Brand Color. Used for main actions. |
| `color.brand.amber` | `#FF9E0B` | Secondary Brand Color. Used for gradients. |
| `color.brand.light` | `#FFF0E5` | Light tint for backgrounds behind orange text. |
| `color.bg.primary` | `#FFFFFF` | Main surface background. |
| `color.bg.secondary` | `#F8FAFC` | Page background (Slate 50). |
| `color.text.primary` | `#0F172A` | High emphasis text (Slate 900). |
| `color.text.secondary` | `#64748B` | Medium emphasis text (Slate 500). |
| `color.text.inverse` | `#FFFFFF` | Text on brand backgrounds. |
| `color.semantic.error` | `#EF4444` | Error states, "Live" badge start color. |

### 1.2 Gradients (Crucial for Identity)

| Token Name | CSS Value | Usage |
| :--- | :--- | :--- |
| `gradient.primary` | `linear-gradient(135deg, #FF6B00, #FF9E0B)` | Primary Buttons, Active States, Icons. |
| `gradient.surface` | `linear-gradient(180deg, #FFFFFF, #FFF6F0)` | Subtle page backgrounds to warm up the whitespace. |
| `gradient.live` | `linear-gradient(135deg, #EF4444, #EC4899)` | "LIVE" Badges, Notification dots. |

### 1.3 Typography

**Font Family:** Plus Jakarta Sans

| Token | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text.display` | 32px | 800 | 1.1 | Splash screens, Marketing banners. |
| `text.h1` | 24px | 700 | 1.2 | Screen Titles. |
| `text.h2` | 20px | 700 | 1.3 | Card Titles, Section Headers. |
| `text.h3` | 18px | 600 | 1.4 | Subsections. |
| `text.body` | 16px | 400 | 1.5 | Standard text. |
| `text.caption` | 12px | 500 | 1.5 | Metadata, timestamps, bottom nav labels. |

### 1.4 Spacing & Radius

| Token | Value |
| :--- | :--- |
| `radius.sm` | 8px |
| `radius.md` | 16px |
| `radius.lg` | 24px |
| `radius.full` | 9999px |

### 1.5 Shadows (Elevation)

| Token | Value | Description |
| :--- | :--- | :--- |
| `shadow.card` | `0 4px 6px -1px rgba(0,0,0,0.05)` | Standard Product Cards. |
| `shadow.glow` | `0 10px 25px -5px rgba(255, 107, 0, 0.4)` | **Primary CTAs**. Creates the "Lumina" glow. |

---

## 2. Flutter Theme Mapping

Use this configuration in `lib/theme/app_theme.dart`.

```dart
class AppTheme {
  static const Color brandOrange = Color(0xFFFF6B00);
  static const Color brandAmber = Color(0xFFFF9E0B);
  
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      colorScheme: ColorScheme.fromSeed(
        seedColor: brandOrange,
        primary: brandOrange,
        secondary: brandAmber,
        surface: Colors.white,
      ),
      textTheme: const TextTheme(
        headlineLarge: TextStyle(fontFamily: 'Plus Jakarta Sans', fontWeight: FontWeight.w800),
        bodyMedium: TextStyle(fontFamily: 'Plus Jakarta Sans'),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 8,
          shadowColor: brandOrange.withOpacity(0.4),
          shape: const StadiumBorder(),
        ),
      ),
    );
  }
  
  static LinearGradient get primaryGradient => const LinearGradient(
    colors: [brandOrange, brandAmber],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
```

---

## 3. React Native Theme Mapping

Use this configuration in `src/theme/index.ts`.

```typescript
export const theme = {
  colors: {
    brand: {
      orange: '#FF6B00',
      amber: '#FF9E0B',
    },
    bg: '#F8FAFC',
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    }
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  borderRadius: {
    card: 16,
    button: 999,
  },
  // Note: Gradients in RN require 'expo-linear-gradient'
};
```

---

## 4. Usage Guidelines

### DO:
*   **Do** use `shadow.glow` on Primary Buttons to make them pop against the white background.
*   **Do** use `gradient.surface` on the Splash Screen and Auth Screens for a premium feel.
*   **Do** keep text high contrast (`slate-900`) for accessibility.
*   **Do** use rounded corners (`radius.md` or `radius.lg`) on all cards.

### DON'T:
*   **Don't** use pure black (`#000000`). Use `slate-900` (`#0F172A`).
*   **Don't** use flat colors for Primary Buttons. Always use `gradient.primary`.
*   **Don't** use sharp corners. This is a friendly, B2C consumer app.

---

## 5. Animation Guidelines

*   **Page Transitions:** Slide Up (`500ms`, `cubic-bezier(0.16, 1, 0.3, 1)`).
*   **Button Press:** Scale down to `0.95` (`200ms`).
*   **Live Badge:** Pulse opacity `1.0` -> `0.6` infinite loop (`3s`).
