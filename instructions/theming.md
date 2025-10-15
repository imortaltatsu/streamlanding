# Theming

## Configuration

Theming and styling are handled through CSS design tokens in `src/styles/global.css`. The `website.config.ts` focuses on metadata and feature flags only.

## Design Tokens

Use semantic tokens in components:
- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-accent`, `text-accent-foreground`
- `border-input`, `ring-offset`

**Avoid**: Hard-coded colors and `dark:` variants.

## Files

- `src/styles/global.css` - CSS variables and Tailwind mapping (primary theming file)
- `src/components/ThemeProvider.tsx` - Theme state management
- `src/components/ThemeToggle.tsx` - Theme switcher
- `website.config.ts` - Site metadata only (no styling)

## Customization

1. **Update CSS variables** in `src/styles/global.css` (primary method)
2. **Modify Tailwind mappings** in the `@theme inline` section
3. **Use ThemeToggle** or `setTheme()` hook for runtime switching

## Best Practices

- Use semantic tokens over specific colors
- Apply opacity with `/` (e.g., `bg-accent/50`)
- Configure colors in CSS, not config files
- Test contrast and accessibility

## Available Tokens

**Colors**: background, foreground, card, primary, secondary, muted, accent, destructive, border, input, ring
**Extras**: sidebar-*, chart-1..5
**Radii**: radius, radius-sm, radius-md, radius-lg, radius-xl

## CSS Variable Structure

```css
:root {
  --background: oklch(0.98 0.002 106);
  --foreground: oklch(0.15 0.015 250);
  --primary: oklch(0.55 0.18 240);
  /* ... other tokens */
}

:root[data-theme="dark"] {
  --background: oklch(0.08 0.01 240);
  --foreground: oklch(0.92 0.01 240);
  /* ... dark theme tokens */
}
```

## Feature Flags

Wrap theme components if needed:

```tsx
<Feature name="THEMING">
  <ThemeToggle />
</Feature>
```

## Notes

- Default theme is a starting point - customize in `global.css`
- All tokens available as CSS custom properties
- Theme switching uses `data-theme` attribute
- Website config handles metadata, CSS handles styling