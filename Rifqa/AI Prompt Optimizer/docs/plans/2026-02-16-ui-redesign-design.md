# UI/UX Redesign - AI Prompt Optimizer

**Date:** 2026-02-16
**Status:** Approved
**Author:** Claude Sonnet 4.5

## Overview

Complete UI/UX redesign of the AI Prompt Optimizer from vibrant gradient design to clean, minimalist Notion-inspired interface. Focus on simplicity, readability, and mobile-first responsive design.

## Design Requirements

### User Preferences (Validated)

1. **Style Philosophy**
   - Minimalist, Notion-like aesthetic
   - Clean, uncluttered interface
   - Progressive disclosure of complexity
   - Focus on content over chrome

2. **Color Scheme**
   - Theme: Notion Light (warm off-white backgrounds)
   - Background Primary: `#FFFFFF` (pure white)
   - Background Secondary: `#F7F6F3` (warm off-white, Notion-style)
   - Background Tertiary: `#EFEEEB` (slightly darker warm off-white)
   - Text Primary: `#37352F` (dark gray, Notion's signature text color)
   - Text Secondary: `#787774` (medium gray)
   - Text Tertiary: `#9B9A97` (light gray for placeholders)
   - Accent Primary: `#2383E2` (soft blue, Notion's blue)
   - Accent Secondary: `#529CCA` (lighter blue)
   - Borders: `#E3E2E0` (very subtle, warm gray)

3. **Layout Structure**
   - Single column, centered (max-width: 680px)
   - Mobile-first responsive design
   - Natural vertical flow
   - No sidebars or complex multi-column layouts

4. **Spacing & Density**
   - Balanced Notion-style spacing
   - XS: 8px, SM: 12px, MD: 16px, LG: 24px, XL: 32px
   - Breathable but not wasteful
   - Comfortable reading experience

5. **Components**
   - Soft rounded corners (8-12px border-radius)
   - Subtle shadows for depth
   - Smaller, more refined buttons (not oversized)
   - Clean input fields with focus states

6. **Typography**
   - System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
   - Header: 20px, weight 600
   - Body: 14-15px
   - Small text: 13px

## Approved Design: Progressive Disclosure Approach

### Core Concept

Start with minimal UI, progressively reveal features as user interacts. Clean first impression, focus on the primary task (entering an idea), then smoothly introduce additional features.

### Layout Structure

#### 1. Header (Minimal)
- **Left:** Title "AI Prompt Optimizer" (20px, weight 600)
- **Right:** Language toggle (English/Indonesia)
- No theme toggle, no additional chrome
- Bottom padding for separation

#### 2. Main Input Area
- Large, clean textarea
- Placeholder text with examples
- No visible label (uses placeholder)
- Soft rounded corners (12px)
- Subtle border (`#E3E2E0`)
- Focus state: blue border + subtle shadow
- Background: `#F7F6F3` (warm off-white)
- Min-height: 180px (desktop), 150px (mobile)

#### 3. Detection Badge (Progressive)
- Appears inline after user types (>10 characters)
- Small badge above textarea
- Shows detected content type (e.g., "🎨 Image generation detected")
- Subtle background, soft rounded corners
- Not intrusive, just informative

#### 4. Optimize Button
- Small, centered button
- Text: "Optimize"
- Soft blue background (`#2383E2`)
- Padding: 10px 24px (compact, not oversized)
- Hover: darker blue + subtle lift
- Positioned below textarea

#### 5. Output Section (Progressive)
- Hidden by default
- Slides in smoothly after optimize clicked
- Contains:
  - Small header: "Your Optimized Prompt" (uppercase, 13px)
  - Output text box (monospace, dark background for code-like feel)
  - Three action buttons: Copy, Download, New (equal width, horizontal layout)
- Card style: white background, subtle shadow, rounded corners

#### 6. Examples Section (Collapsible)
- Positioned at bottom
- Collapsed by default
- Toggle button: "💡 Show examples" / "✨ Hide examples"
- When expanded, shows 4-5 example prompts
- Each example: clickable card with icon + text
- Hover effect: slight background change + horizontal shift

### Visual Hierarchy

```
┌─────────────────────────────────────────┐
│  AI Prompt Optimizer    [EN | ID]       │  <- Header (minimal)
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  [Large textarea]                │  │  <- Primary focus
│  │  Type your idea...               │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  🎨 Image generation detected           │  <- Inline badge (progressive)
│                                         │
│           [ Optimize ]                  │  <- Small button
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ YOUR OPTIMIZED PROMPT             │  │
│  ├───────────────────────────────────┤  │
│  │ [Output content in monospace]    │  │  <- Output (slides in)
│  │                                   │  │
│  ├───────────────────────────────────┤  │
│  │ [Copy] [Download] [New]          │  │
│  └───────────────────────────────────┘  │
│                                         │
│  💡 Show examples ↓                     │  <- Collapsible
│                                         │
└─────────────────────────────────────────┘
```

### Component Specifications

#### Language Toggle
- Segmented control style
- Two options: "English" | "Indonesia"
- Background: `#F7F6F3`
- Active state: white background + blue text + subtle shadow
- Border-radius: 10px (outer), 6px (inner buttons)
- Padding: 4px (container), 6px 14px (buttons)
- Font-size: 13px

#### Input Textarea
- Width: 100%
- Min-height: 180px (desktop), 150px (mobile)
- Padding: 16px
- Background: `#F7F6F3`
- Border: 1px solid `#E3E2E0`
- Border-radius: 12px
- Font-size: 15px
- Line-height: 1.6
- Resize: vertical
- Focus: border-color `#2383E2`, box-shadow `0 0 0 3px rgba(35, 131, 226, 0.1)`

#### Detection Badge
- Display: inline-flex
- Padding: 6px 12px
- Background: `#EFEEEB`
- Border: 1px solid `#E3E2E0`
- Border-radius: 6px
- Font-size: 13px
- Gap: 6px (between icon and text)

#### Optimize Button
- Padding: 10px 24px
- Background: `#2383E2`
- Color: white
- Border: none
- Border-radius: 10px
- Font-size: 14px
- Font-weight: 500
- Shadow: `0 2px 4px 0 rgba(0, 0, 0, 0.08)`
- Hover: background `#1966B8`, transform `translateY(-1px)`, shadow `0 4px 8px 0 rgba(0, 0, 0, 0.12)`

#### Output Section
- Background: `#F7F6F3`
- Border: 1px solid `#E3E2E0`
- Border-radius: 12px
- Padding: 24px
- Shadow: `0 2px 4px 0 rgba(0, 0, 0, 0.08)`
- Animation: slide-in from top (0.3s ease)

#### Action Buttons (Copy/Download/New)
- Flex: 1 (equal width)
- Padding: 8px 16px
- Background: `#EFEEEB`
- Border: 1px solid `#E3E2E0`
- Border-radius: 10px
- Font-size: 13px
- Font-weight: 500
- Gap: 12px between buttons
- Hover: background `#FFFFFF`, border-color `#529CCA`

### Interaction Patterns

1. **Initial Load**
   - Show: Header + Input textarea + Optimize button
   - Hide: Detection badge, Output section, Examples (collapsed)
   - Focus: Textarea (auto-focus on load)

2. **User Types**
   - When input length > 10 characters: Show detection badge
   - Badge updates based on detected type
   - Smooth fade-in animation

3. **User Clicks Optimize**
   - Button state: Disabled + loading state
   - Process: Run detection + platform selection (if needed) + generate optimized prompt
   - Output section: Slide in from top (0.3s ease animation)
   - Scroll: Auto-scroll to output section (smooth)

4. **Language Toggle**
   - User clicks EN or ID
   - Update active state (visual feedback)
   - Store preference (localStorage)
   - Affect output language for next optimization

5. **Examples Toggle**
   - Click "Show examples": Expand with slide-in animation
   - Click "Hide examples": Collapse
   - Click example item: Fill textarea + show detection badge + focus textarea

6. **Action Buttons**
   - Copy: Copy output to clipboard + show notification
   - Download: Download as `.txt` file with timestamp
   - New: Clear input + hide output section + reset state

### Mobile Responsiveness

#### Breakpoint: 768px

**Mobile (<768px):**
- Container padding: 16px (reduced from 24px)
- Header title: 18px (reduced from 20px)
- Textarea min-height: 150px (reduced from 180px)
- Action buttons: Stack vertically (flex-direction: column)
- Language toggle: Stays horizontal (compact enough)

**Desktop (≥768px):**
- Container: max-width 680px, centered
- Action buttons: Horizontal layout
- All spacing as specified in design system

### Accessibility

- Focus states: Clear blue outline for keyboard navigation
- Color contrast: All text meets WCAG AA standards
- Touch targets: Minimum 44px height for mobile
- Semantic HTML: Proper heading hierarchy, labels
- Keyboard navigation: Tab order follows visual flow
- Screen readers: Proper ARIA labels for dynamic content

## New Features

### Language Selection (English/Indonesia)

**Requirement:** User can choose output language for optimized prompts.

**Implementation:**
- Language toggle in header (EN/ID segmented control)
- Default: English
- Stored in localStorage for persistence
- Affects:
  - Output prompt language
  - UI text (if multilingual UI is desired in future)
  - Platform-specific instructions

**Behavior:**
- When user selects language, update active state
- Next optimization uses selected language
- For English: Keep current prompt templates
- For Indonesia: Translate prompt structure and instructions to Bahasa Indonesia

## Technical Specifications

### CSS Architecture

**Variables (CSS Custom Properties):**
- All colors, spacing, shadows defined as CSS variables
- Easy theming and maintenance
- Consistent across components

**Naming Convention:**
- BEM-inspired: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Semantic naming for clarity

**Responsive Strategy:**
- Mobile-first approach
- Single breakpoint at 768px
- Flexible layouts with flexbox/grid

### JavaScript Functionality

**Preserve from Original:**
- Content type detection logic
- Platform-specific optimization functions
- All optimization templates (image, video, social, article, recipe, code, general)

**Modify:**
- UI interaction logic (adapt to new progressive disclosure pattern)
- Animation triggers
- Language selection logic (new)

**Remove:**
- Old theme toggle (dark/light) - keep light only
- Heavy gradient backgrounds
- Large button styles
- Current color scheme variables

### Performance

- No external dependencies (keep vanilla JS)
- Minimal animations (only slide-in, fade-in)
- CSS transforms for smooth 60fps animations
- Debounced detection (avoid excessive checks)

## Migration Strategy

### Phase 1: Visual Update
1. Replace color scheme variables
2. Update component styles (buttons, inputs, cards)
3. Adjust spacing and typography
4. Remove theme toggle

### Phase 2: Layout Restructure
1. Implement new header with language toggle
2. Restructure main input area
3. Create progressive disclosure for detection badge
4. Update output section styling

### Phase 3: Interaction Updates
1. Add language selection logic
2. Update animation triggers
3. Implement collapsible examples
4. Adjust mobile responsive behaviors

### Phase 4: Testing & Refinement
1. Test all content types (image, video, social, etc.)
2. Verify platform selections work
3. Test language switching
4. Mobile testing across devices
5. Accessibility audit

## Success Metrics

**User Experience:**
- Cleaner first impression (minimal UI on load)
- Faster time to first interaction (less visual clutter)
- Clear visual hierarchy (progressive disclosure guides user)

**Functionality:**
- All original features preserved
- New language selection feature
- Improved mobile experience

**Aesthetics:**
- Professional, modern appearance
- Consistent with Notion design language
- Suitable for brand alignment

## Mockup Reference

Visual mockup created at: `mockup-approach1.html`

This mockup demonstrates:
- Notion Light color scheme
- Language toggle functionality
- Progressive UI elements
- Component styling and spacing
- Responsive behavior

## Next Steps

1. Create detailed implementation plan (writing-plans skill)
2. Implement changes to `index.html`
3. Test across browsers and devices
4. Get user feedback
5. Iterate if needed

---

**Design Approved:** 2026-02-16
**Ready for Implementation:** Yes
