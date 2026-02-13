
# Plan: Wider Card + "Featured In" Section + Fix Width Bug

## 1. Fix the card width "bug" (screenshots 3 vs 4)

The problem: on narrower desktop (below 1024px), the layout switches to column mode and the card stretches to full container width. On wider desktop, it shrinks to its natural size. This creates inconsistent card widths at different window sizes.

**Fix**: Set a consistent width on PresaleCard itself (not just max-width) so it looks the same in both modes.

### PresaleCard.tsx
Change `max-w-lg` (512px) to `max-w-xl` (576px) to make the card wider (closer to reference 1), applied in all 3 states (idle, success, error).

### HeroSection.tsx (card wrapper, line 107)
Change to: `w-full max-w-xl mx-auto lg:mx-0 lg:flex-shrink-0`
- `max-w-xl` constrains the card to 576px in both column and row modes
- Removes `lg:w-auto` which was causing the size inconsistency

## 2. Add "Featured In" section (from reference 2)

Replace the current plain-text partner ticker with a styled "Featured In" section featuring logos and names like in the Dribbble reference:

Partners to display: CoinTelegraph, Bitcoin.com, Yahoo Finance, Techopedia, CryptoNews, Bitcoinist

### HeroSection.tsx (lines 113-124)
Replace the current partner ticker with:
- "Featured In" heading centered above
- A row of partner names with decorative icon placeholders (using styled text logos since we don't have actual logo files)
- Styled similarly to the reference: horizontal row, spaced evenly, muted colors

## Technical Details

### File: `src/components/PresaleCard.tsx`
- Line 137: `max-w-lg` -> `max-w-xl`
- Line 170: `max-w-lg` -> `max-w-xl`
- Line 189: `max-w-lg` -> `max-w-xl`

### File: `src/components/HeroSection.tsx`
- Line 107: `w-full max-w-lg mx-auto lg:mx-0 lg:w-auto lg:flex-shrink-0` -> `w-full max-w-xl mx-auto lg:mx-0 lg:flex-shrink-0`
- Lines 113-124: Replace partner ticker with "Featured In" section containing styled partner logos/names in a static centered row (no scrolling marquee), matching the reference design

## Result
- Card is consistently 576px wide on all screen sizes (no more "bug")
- Card is visually wider, closer to reference 1
- "Featured In" section adds credibility with media partner names
