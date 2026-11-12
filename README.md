# PROJECT PORTE — Premium Birthday Edition (GitHub Pages root layout)

This edition is arranged for the exact GitHub repository layout shown in the screenshot: **all files are at the same level in the repository root**. There is no `assets/` subfolder.

## Files to keep together

- `index.html`
- `styles.css`
- `birthday-redesign.css`
- `premium-jewel.css`
- `app.js`
- `porte-birthday-song.mp3`
- `porte-formal.jpg`
- `porte-cultural-day.jpg`
- `porte-event-close.jpg`

## Publish on GitHub Pages

1. Extract this ZIP. The files listed above will appear directly in the extracted folder (there is no nested project folder).
2. In your repository, upload/replace these files **at the root**, beside one another. Do not place the media inside an `assets` folder.
3. Commit the changes to the branch configured in **Settings → Pages** (currently `main`, `/ (root)`).
4. Wait for the Pages deployment in the **Actions** tab to finish.
5. Open `https://rck1205.github.io/porte_birthday_26/`.

All media URLs use `./filename`, so they resolve relative to `index.html` under the GitHub Pages project path. Filenames are case-sensitive on GitHub Pages; keep the spelling exactly as shown above.

## Audio note

The MP3 is included locally. The page attempts autoplay, but browsers may block audible autoplay until a visitor interacts with the invitation or enables music using the page's sound control.

## Personalization

- Birthday greeting and final wish: `index.html`.
- Birthday note copied by the button and the friendship archive / Porte-verse lines: `app.js`.
- Visual styling: `styles.css`, `birthday-redesign.css`, and `premium-jewel.css`.


### Portrait display note
The supplied portrait photos preserve their original aspect ratios. Keep all JPG files next to `index.html`; do not move them into a subfolder. The hero portrait uses a circular crop intentionally, while the JNV and main gallery portraits display the complete source image without cutting off the subject.
