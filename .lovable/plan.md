

# Plan: Restructure Layout to Match Figma Design

The Figma design shows a significantly different layout from the current implementation. Here are the major changes needed:

## Overview of Changes

The current site has the presale card in the hero section with left-aligned text. The Figma design splits this into multiple distinct sections with a centered hero layout.

## 1. Hero Section (`src/components/HeroSection.tsx`) - Major Restructure

**Current**: Two-column layout (text left, presale card right)
**Figma**: Centered layout, no presale card

Changes:
- Remove the PresaleCard from the hero section entirely
- Center-align all hero content (heading, badge, description)
- Remove the 3 feature cards (Options Trading, Secure, Fast) from hero
- Add a centered "Connect Wallet to buy" button below the description
- Remove the stats from the hero (they move to their own section below)

## 2. New Stats Section - Extract from Hero

**Figma**: Stats ($2M+, 10K+, 50x) appear in their own full-width section with a dark/gradient background, centered horizontally, between the hero and the marquee ticker.

- Move the AnimatedCounter stats block out of the hero into its own dedicated section
- Center the 3 stats horizontally with adequate spacing
- Add a subtle dark gradient background behind this section

## 3. Marquee Ticker - Change Content

**Current**: "Featured In" with partner names (CoinTelegraph, Bitcoin.com, etc.)
**Figma**: Repeating "Sequoia Protocol" text in varying opacities

Changes:
- Remove the "Featured In" title
- Replace partner names with repeated "Sequoia Protocol" text
- Remove border-top/border-bottom styling
- Use varying text opacities/styles matching the Figma

## 4. About Section (`src/components/AboutSection.tsx`) - Add Presale Card

**Current**: Section header centered, then features grid + stats grid, then roadmap
**Figma**: Two-column layout with "Building the Future of Options Trading" + 6 feature checkmarks on the left, PresaleCard on the right

Changes:
- Remove the centered section header badge ("About Sequoia")
- Move the heading ("Building the Future of Options Trading") to left-align
- Place the 6 checkmark highlights in a 2x3 grid on the left side
- Add the PresaleCard component to the right side of this section
- Keep the stats grid and roadmap below unchanged

## 5. Index Page (`src/pages/Index.tsx`) - Add Stats Section

- Insert the new Stats section component between HeroSection and AboutSection

---

## Technical Details

### Files to modify:
- `src/components/HeroSection.tsx` - Remove presale card, center layout, remove stats and features
- `src/components/AboutSection.tsx` - Add PresaleCard import, restructure top section to two-column with features left and presale card right
- `src/pages/Index.tsx` - Add new StatsSection component
- `src/index.css` - Minor style adjustments if needed

### New file:
- `src/components/StatsSection.tsx` - Extracted stats with AnimatedCounter in a full-width dark section

### Key layout structure (top to bottom):
1. Header (unchanged)
2. Hero - centered text + "Connect Wallet to buy" button
3. Stats strip - $2M+, 10K+, 50x centered
4. Marquee - "Sequoia Protocol" repeated
5. About section - features left + presale card right
6. Tokenomics (unchanged)
7. Footer (unchanged)

