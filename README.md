# PROJECT PORTE — Premium Birthday Edition

A responsive, six-moment birthday website for Netram Porte, made by Rahul.

## What's included

- Premium multi-colour jewel palette: pearl, rose, amethyst, teal and champagne.
- Frosted-glass cards, glossy gradients, pearlescent highlights and a light texture.
- Netram's three portraits in the hero, JNV throwback and interactive photo gallery.
- Local background music at `assets/porte-birthday-song.mp3` (autoplay is attempted; browsers may require a first tap).
- Synthesized UI, portal, candle, relight and celebration effects.
- Interactive six-candle cake.
- Two-step ending: make a wish, trigger a cinematic bass boom and light burst, then reveal the final birthday message from Rahul.
- Responsive layout for desktop and mobile.

## Run locally

1. Extract the ZIP and keep `index.html`, the CSS files, `app.js`, and the `assets` folder together inside `project-porte`.
2. Open `project-porte/index.html` in a modern browser. Do not move `index.html` out of this folder or separate `assets`.
3. For best audio behaviour, serve the folder from a local web server or hosting provider. Browsers can block audible autoplay until the visitor interacts with the page; opening the gift starts the song when autoplay is blocked.

## Hosting

Upload the complete `project-porte` folder, including `assets`, to any static website host. Do not rename or separate the files inside `assets`.

## Personalization

- The birthday greeting and final wish are in `index.html`.
- The birthday note text used by the copy button is in `app.js` (`birthdayLetter`).
- Friendship archive copy and multiverse lines are in `app.js`.
- Main styling is in `styles.css` and `birthday-redesign.css`; the premium colour/glass overrides are in `premium-jewel.css`.


## Portrait asset paths

The page uses these local relative paths (all included in the ZIP):
- `./assets/porte-formal.jpg`
- `./assets/porte-cultural-day.jpg`
- `./assets/porte-event-close.jpg`

The hero and JNV photo panel have explicit responsive image sizing. The profile image and thumbnails stay visible even if JavaScript initialization is delayed, and show an intentional fallback only if an image fails to load.
