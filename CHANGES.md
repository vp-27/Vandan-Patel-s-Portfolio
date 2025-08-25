# Portfolio Update - Dot Grid & System Theme Fixes

## Issues Fixed

### 1. Dot Grid Coverage
**Problem**: The dot grid didn't cover the full background behind the phone on the initial screen, and transitions weren't smooth.

**Solution**:
- Moved DotGrid to a fixed background layer that always covers 100vw x 100vh
- Positioned with z-index: -2 to stay behind all content
- Added smooth overlay transitions during phone expansion
- Updated DotGrid to use viewport dimensions instead of container dimensions for full coverage

### 2. System Theme Detection
**Problem**: App didn't default to system dark/light mode preference.

**Solution**:
- Added system theme detection using `window.matchMedia('(prefers-color-scheme: dark)')`
- Listen for system theme changes and update accordingly
- Updated CSS variables to be more transparent/blended with the background
- WebsiteContent now observes theme changes from parent instead of managing its own theme

## Key Changes Made

### AppleStyleWebsite.jsx
- Added `systemTheme` state and system preference detection
- Created smooth background overlay system during transitions
- DotGrid now renders as a persistent background layer
- Colors adapt to system theme (blue variants for light/dark)

### WebsiteContent.jsx
- Removed localStorage theme management
- Added MutationObserver to listen for theme changes from parent
- Syncs internal dark mode state with system preferences

### CSS Updates
- Made background colors more transparent for better blending
- Added backdrop-filter blur for glass effect
- Updated DotGrid to ensure full viewport coverage
- Fixed Safari compatibility with -webkit-backdrop-filter

### Global Styles
- Added index.css with proper reset and color-scheme support
- Ensured body background is transparent to let parent handle theming

## Result
- Dot grid now provides consistent interactive background throughout the experience
- App automatically respects user's system theme preference
- Smooth transitions between phone and website modes
- Better visual consistency and modern iOS-style theming
