# Bullsy

A stock-market learning game with virtual money. Players pick a starting amount, a favourite sector, a risk level and a time horizon, then play 8 rounds of buying, selling and short-selling 15 Indian stocks across 5 sectors (Banking, IT, Automobiles, Pharma, Energy).

## Features

- **News rounds** read aloud, with replay, and a crash and recovery in every game
- **Charts**: 1D / 1W / 2W / 1M / 1Y, line or candles, zoom and pan, sector benchmark index
- **Company info**: click any stock (or the ⓘ Info button) to see what the company does, its sector, main business, what drives it and things that may affect the stock
- **Quit any time**: Quit ends the game early and goes straight to the AI Advisor, which reviews only the rounds played
- **Bullsy AI Advisor**: trading score, what you did well, where to improve, next-move strategy, and You vs Bullsy AI
- **Player guide** and **video guide** on the start screen

Bullsy is a plain static website: no server, no database, no API keys, no build step.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The page |
| `css/style.css` | All styles (light and dark theme) |
| `js/data.js` | Company logos, the Bullsy logo, daily stock history and NIFTY index data |
| `js/app.js` | Game logic, charts, voice news, quit flow and the AI Advisor |
| `js/company-info.js` | Company information panel for the 15 stocks |
| `guide.mp4`, `guide.webm` | The video guide |
| `render.yaml` | Render deploy settings |

## Run it on your computer

```
python -m http.server 8000
```

Then open http://localhost:8000 (opening `index.html` directly also works, but the video guide is more reliable through a local server).

## Upload to GitHub

Upload **the contents** of this folder, so `index.html` is at the top of the repository, not inside a sub-folder. Or with git:

```
git init
git add .
git commit -m "Bullsy"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy on Render

1. Render dashboard > **New > Static Site** > connect the repository.
2. Build Command: leave empty. Publish Directory: `.`
3. Click **Create Static Site**. Render gives you a public `onrender.com` link, and every push to `main` redeploys it.

Alternative: **New > Blueprint** and pick the repository; Render reads `render.yaml`.

## Data note

Stock prices up to 5 Oct 2026 and the NIFTY index series are real daily data. In-game news and the price moves during rounds are simulated for the game. Company names and logos belong to their owners and are used for identification only. Company information is educational and is not a recommendation to buy or sell. Bullsy is not investment advice.
