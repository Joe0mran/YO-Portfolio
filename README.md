# YO Animations Portfolio

Portfolio website for YO Animations: cinematic product films for jewelry, accessories and fragrance. Plain HTML, CSS and JavaScript, with no build step.

## Run it

Open `index.html` in a browser. To serve it locally:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. The fonts (Italiana and Cinzel) load from Google Fonts, so an internet connection is needed for the intended look.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Page markup: hero, selected work, services, process, contact, footer |
| `style.css` | Styles, brand tokens, dark and light themes, decor, responsive rules |
| `script.js` | Video grid, lightbox, theme toggle, WhatsApp links, scroll reveal |
| `1.mp4` … `8.mp4` | Project videos, ranked 1 (highest) to 8 (lowest) |
| `posters/` | Still frame for each video, used as thumbnails |
| `*.pdf` | Brand guidelines and Phase 1 brand discovery report |

## Features

- Selected work grid ordered by video number. Hover previews a video on desktop; click opens a lightbox with sound, previous/next buttons and arrow-key navigation.
- Dark (Oxblood) theme by default, with a Cream light theme toggle that remembers the visitor's choice.
- Contact by WhatsApp (pre-filled message), phone call, email, Instagram and TikTok.
- Responsive for desktop, tablet and phone. Animations are turned off for visitors who prefer reduced motion.

## Editing

- **Add or reorder videos:** edit the `projects` array at the top of `script.js`. Each entry needs `n.mp4` and `posters/n.jpg`. Update the "projects" count in `index.html`.
- **Change contact details:** the WhatsApp number is `WHATSAPP_NUMBER` in `script.js`. The call, email, Instagram and TikTok links are in `index.html`.
- **Compress a new video** (keeps resolution, H.264 for browser support):

  ```sh
  ffmpeg -i in.mp4 -map 0:v:0 -map '0:a:0?' -c:v libx264 -preset medium -crf 28 \
    -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k out.mp4
  ```

- **Make a poster:** `ffmpeg -ss 2 -i n.mp4 -frames:v 1 -vf scale=720:-2 -q:v 4 posters/n.jpg`

## Brand

Palette (Burgundy Velvet): Oxblood `#4A0E1C`, Mulberry `#7A2540`, Rose Gold `#C98B7B`, Blush `#EBCFC4`, Cream `#F6EDE3`. Display font Italiana, UI font Cinzel. See `YO_Animations_Brand_Guidelines_Final.pdf` for the full system.
