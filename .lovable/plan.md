

# Plan: Increase "Featured In" Ticker Size

## Changes

### File: `src/components/HeroSection.tsx`

Make the ticker section more prominent:

- **Vertical padding**: `py-6` -> `py-8` for more breathing room
- **Gap between items**: `gap-16` -> `gap-20` for wider spacing
- **Icon size**: `text-2xl` -> `text-3xl` for larger icons
- **Text size**: `text-lg` -> `text-xl` for larger partner names
- **Title size**: `text-sm` -> `text-base` for a slightly bigger "Featured In" label

These are small CSS class changes on lines 115-134.

