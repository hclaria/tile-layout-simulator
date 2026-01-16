# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-01-16

### Added
- 🌍 Multi-language support (FR/EN/DE/RU) with automatic OS language detection
- 💾 Auto-save: all settings persist in localStorage (room size, tiles, layout, laying order)
- 🔗 Live demo badge in README linking to GitHub Pages

### Changed
- 📁 Refactored codebase into separate files (icons, translations, hooks, app)
- 📐 2D view now aligned to top instead of vertically centered
- 🎨 Improved language selector styling
- 🇬🇧 English as default fallback language

### Fixed
- Better readability of dropdown chevron icon

## [1.0.0] - 2026-01-16

### Added
- Initial release
- 4 layout patterns: Straight, 1/2 Offset, 1/3 Offset, Random Stagger (Lost Cut)
- 3 alignment modes: Corner, Center Tile, Center Joint
- Tile rotation (0°/90°)
- Manual laying order sequence
- Problematic cuts detection
- Interactive 2D SVG visualization with tooltips
- Responsive design (desktop/mobile)
