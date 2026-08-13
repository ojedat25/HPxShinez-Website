# HPxShinez web assets
Everything here is already sized and compressed for the web. Drop the folders in as-is.

## What's in the box
- `images/webp/` and `images/jpg/` — 13 photos, each at 1536, 1024 and 640 wide
- `videos/mp4/` — 5 clips, H.264, faststart enabled so they start playing before fully downloading
- `videos/posters/` — first-frame stills for each clip, JPG and WebP

## Photos
Use a `<picture>` element so browsers pick WebP and fall back to JPEG. Always set width and height so the page doesn't jump while images load.

```html
<picture>
  <source
    type="image/webp"
    srcset="/images/webp/09-orange-lancer-hero-640.webp 640w,
            /images/webp/09-orange-lancer-hero-1024.webp 1024w,
            /images/webp/09-orange-lancer-hero-1536.webp 1536w"
    sizes="(max-width: 700px) 100vw, 50vw">
  <img
    src="/images/jpg/09-orange-lancer-hero-1024.jpg"
    srcset="/images/jpg/09-orange-lancer-hero-640.jpg 640w,
            /images/jpg/09-orange-lancer-hero-1024.jpg 1024w,
            /images/jpg/09-orange-lancer-hero-1536.jpg 1536w"
    sizes="(max-width: 700px) 100vw, 50vw"
    width="1536" height="2048"
    alt="Orange Mitsubishi Lancer after a full exterior wash"
    loading="lazy" decoding="async">
</picture>
```

On the one image above the fold, swap `loading="lazy"` for `fetchpriority="high"`. Lazy-loading your hero delays it.

## Videos
For a looping background clip. `muted` is required or autoplay is blocked, and `playsinline` stops iOS from going fullscreen.

```html
<video
  src="/videos/mp4/01-charger-gt-walkaround.mp4"
  poster="/videos/posters/01-charger-gt-walkaround-poster.jpg"
  width="720" height="1280"
  autoplay muted loop playsinline preload="metadata"></video>
```

If you want sound on a click-to-play clip, drop `autoplay muted loop` and set `controls`. The audio track is still in every file.

## Dimensions

| file | full size |
|---|---|
| 01-lancer-interior-before | 1536x2048 |
| 02-lancer-interior-after | 1536x2048 |
| 03-lancer-rear-seat-before | 1536x2048 |
| 04-lancer-rear-seat-after | 1536x2048 |
| 05-charger-tire-before | 1536x2048 |
| 06-charger-tire-after | 1536x2048 |
| 07-subaru-mat-before | 1536x1152 |
| 08-subaru-mat-after | 1536x2048 |
| 09-orange-lancer-hero | 1536x2048 |
| 10-orange-lancer-foam | 1536x2048 |
| 11-orange-lancer-wheel | 1536x2048 |
| 12-kia-interior-finished | 1536x2048 |
| 13-mat-foam-process | 1536x2048 |

All videos are 720x1280 vertical.

## Notes
- No WebM. VP9 came out bigger than H.264 on this footage, so it would be two codecs for no gain.
- No AVIF either, for now. Worth revisiting if the source photos ever get reshot at higher resolution.
- Source photos were 1536x2048 out of Dropbox, so 1536 is the real ceiling. Nothing here is upscaled.
