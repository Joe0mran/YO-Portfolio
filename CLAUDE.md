# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static portfolio site for YO Animations (cinematic product films). Plain HTML/CSS/JS: no build, lint or test tooling. Preview with `python3 -m http.server 8000` or open `index.html`. Remote: `git@github.com:Joe0mran/YO-Animations-Portfolio.git`, branch `main`.

## Architecture

- `index.html` is a single page. Section order: hero, ticker, work, services, process, contact, footer. `style.css` and `script.js` are loaded directly.
- **Work grid is data-driven.** `script.js` builds the tiles from the `projects` array (`n.mp4` + `posters/n.jpg`), in number order with 1 first. Adding a video means: add `n.mp4`, make `posters/n.jpg`, extend the array, and update the "NN projects" label in `index.html`. The grid and lightbox take their count from the array.
- **Theming** is CSS variables on `:root` (`--bg --fg --panel --line --accent --soft`), swapped by `data-theme="light"` on `<html>`. Dark Oxblood is the default. Later rules in `style.css` (the "clarity" block at the end) override light-theme colors, so check the end of the file before changing a color. A small inline script in `<head>` applies the saved theme before paint.
- **Decor** (ridge texture, ticker, corner brackets, outlined numerals) is plain CSS/SVG. SVG `<symbol>` definitions (`#fp`, `#ridges`, `#diamond`) live at the bottom of `index.html`. Oversized decor must stay clipped (`overflow:clip` on `.hero`/`.contact`), otherwise it adds blank scroll space below the footer.
- **Contact links:** WhatsApp number is `WHATSAPP_NUMBER` in `script.js`. It rewrites every `[data-wa]` link to a `wa.me` URL with the pre-filled brief message. Phone, email, Instagram and TikTok links are hard-coded in `index.html`.

## Conventions

- Brand rules come from `YO_Animations_Brand_Guidelines_Final.pdf`. Palette: Oxblood #4A0E1C, Mulberry #7A2540, Rose Gold #C98B7B, Blush #EBCFC4, Cream #F6EDE3. Fonts: Italiana (display, 28px and up only) and Cinzel (UI). Rose Gold is an accent only (no gradients or glow), and copy follows the brand voice (calm, no exclamation marks or emoji, avoid "cheap/fast/viral").
- Videos are all portrait (9:16). Compress with H.264 so browsers can play them (keep resolution, CRF 28, `-movflags +faststart`); the README has the exact ffmpeg command. Original uncompressed sources were deleted, so don't recompress already-compressed files.
- Project titles are still placeholders ("Project 01"). Real names/categories have not been supplied.
