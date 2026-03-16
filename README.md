# Myanmar Story Script Generator (U Paw Oo Style)

A web application that generates authentic 6-scene Myanmar palace comedy tales in the style of **U Paw Oo and the King**, following a structured script format with Dialogue, Narration, and Scene Descriptions.

Originally built with [Manus](https://manus.im) and hosted at [myanmarapp-7zbbzgmf.manus.space](https://myanmarapp-7zbbzgmf.manus.space/).

---

## Features

- **AI-Powered Generation** — Generate complete 6-scene scripts with dialogue, narration, and scene descriptions automatically.
- **Story Library** — Save, organize, and manage all your generated stories in one convenient library.
- **Export & Share** — Export scripts in plain text format compatible with video production tools.
- **Myanmar Language Support** — Full support for Myanmar text with palace terminology and royal court language.
- **PWA Ready** — Progressive Web App with offline support via service worker.

---

## Project Structure

```
myanmar-story-generator/
├── index.html                      # Main HTML entry point
├── manifest.json                   # PWA manifest
├── public/
│   ├── sw.js                       # Service Worker (PWA offline support)
│   └── manifest.json               # PWA manifest (copy)
├── assets/
│   ├── index-jdbT2kAo.js           # Bundled JavaScript (production)
│   ├── index-NKS3VPBl.css          # Bundled CSS (production)
│   ├── index-readable.js           # Beautified/readable JavaScript
│   └── style-readable.css          # Beautified/readable CSS
└── README.md
```

---

## Source Code Structure (Original React/TypeScript)

The application was built with the following technology stack:

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | TailwindCSS |
| UI Components | shadcn/ui (Radix UI) |
| State Management | React Query (TanStack Query) |
| API Layer | tRPC |
| Backend | Node.js + Express |
| Database | MySQL / TiDB |
| AI Generation | OpenAI API (GPT model) |
| Auth | Manus OAuth |

### Original Source Files

```
client/src/
├── App.tsx                         # Main app with routing
├── main.tsx                        # React entry point
├── pages/
│   ├── Home.tsx                    # Landing/home page
│   ├── StoryGenerator.tsx          # Story generation page
│   ├── StoryLibrary.tsx            # Saved stories library
│   └── NotFound.tsx                # 404 page
├── components/
│   ├── StoryDisplay.tsx            # Story rendering component
│   ├── ErrorBoundary.tsx           # Error boundary wrapper
│   └── ui/                         # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       ├── sonner.tsx
│       └── tooltip.tsx
└── contexts/
    └── ThemeContext.tsx             # Theme provider (light/dark)
```

---

## Hosting on GitHub Pages

Since this is a **Single Page Application (SPA)** with client-side routing, you need to handle 404 redirects. Follow these steps:

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Myanmar Story Script Generator"
git remote add origin https://github.com/YOUR_USERNAME/myanmar-story-generator.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose **main** branch and **/ (root)** folder.
5. Click **Save**.

### Step 3: Handle SPA Routing (Important)

For GitHub Pages to handle React Router routes (e.g., `/generate`, `/library`), add a `404.html` file that redirects to `index.html`:

```html
<!-- 404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Myanmar Story Script Generator</title>
    <script>
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?/' +
        l.pathname.slice(1).replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### Step 4: Backend API Note

> **Important:** This app requires a **backend server** for:
> - User authentication (Manus OAuth)
> - AI story generation (OpenAI API calls)
> - Story storage (database)
>
> The bundled JS still points to the original Manus backend at `/api/trpc`.
> For a fully self-hosted version, you would need to set up your own backend server
> with the tRPC API routes for `auth.me`, `auth.logout`, `story.generate`,
> `story.list`, `story.getById`, and `story.delete`.

---

## API Endpoints (tRPC)

The app uses the following tRPC API routes:

| Route | Type | Description |
|---|---|---|
| `auth.me` | Query | Get current authenticated user |
| `auth.logout` | Mutation | Log out the current user |
| `story.generate` | Mutation | Generate a new story from a theme |
| `story.list` | Query | List all saved stories |
| `story.getById` | Query | Get a specific story by ID |
| `story.delete` | Mutation | Delete a story by ID |

---

## Story Format

Each generated story follows a **6-scene palace tale** structure:

```
=== Story Title ===

Theme: [theme]
Moral Lesson: [lesson]
Character Dynamics: [dynamics]
Historical Context: [context]

Duration: ~1 minute 30 seconds
==================================================

SCENE 1: [Scene Title]
----------------------------------------
မြင်ကွင်း (Visual Description):
[scene description in Myanmar]

Narrator:
[narration text]

Dialogue:
King: "[dialogue]"
U Paw Oo: "[dialogue]"
...
==================================================
```

---

## License

This project was generated with [Manus AI](https://manus.im). You are free to use, modify, and host it yourself.
