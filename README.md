# Leads Tracker

Leads Tracker is a small web app and Chrome extension popup for saving URLs you want to revisit. Saved entries are stored in Firebase Realtime Database, so the app loads them again when opened later.

**Live app:** [https://leads-tracker-app-vedant.netlify.app/](https://leads-tracker-app-vedant.netlify.app/)

## Features

- Save a URL from the input field with **Save Input**.
- See saved URLs as clickable links that open in a new tab.
- Keep saved entries in Firebase Realtime Database between visits.
- Remove all saved entries by double-clicking **Delete All**.
- Use the same interface as a Chrome extension popup or as a website.

## How it works

The interface is defined in `index.html` and styled in `index.css`. The Firebase client logic in `index.js` connects to the configured Realtime Database and uses the `leads` path:

- Saving an entry pushes the current input value to the database.
- A database value listener renders the saved entries in the list.
- Double-clicking **Delete All** removes the contents of the `leads` path.

The app currently saves the input as entered; it does not validate or normalize URLs. Entries in the database are shared by every installation using the same Firebase project and database path.

## Run locally

Serve the project directory over HTTP, then open the local address in a browser. For example, with Python installed:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Serving the files over HTTP is recommended because the app loads its JavaScript as an ES module.

The repository includes `firebase-bundle.js`, which is loaded by the page. `package.json` lists Firebase and esbuild dependencies, but does not define a build or development-server script.

## Run with Docker

Build a Docker image from the project root:

```bash
docker build -t leads-tracker .
```

Start a container and publish its HTTP port on `localhost:8080`:

```bash
docker run --rm -p 8080:80 leads-tracker
```

Then open [http://localhost:8080](http://localhost:8080). Press `Ctrl+C` to stop the container. The image uses Nginx to serve the static app files; `.dockerignore` keeps Git metadata and local `node_modules` out of the build context.

## Use as a Chrome extension

The root `manifest.json` describes a Manifest V3 extension whose popup is `index.html`.

1. Open `chrome://extensions` in Chrome and enable **Developer mode**.
2. Select **Load unpacked** and choose this project directory.
3. Open the extension from the browser toolbar to use the popup.

## Firebase configuration

The Firebase project configuration is in `index.js`. To use a different Firebase project, update that configuration and ensure the project's Realtime Database is available at the configured URL. The app expects permission to read and write the `leads` path; those permissions are controlled by Firebase Realtime Database Security Rules.

The Firebase client configuration is included in the browser app and should not be treated as a secret. Configure database rules in Firebase Console to control who can read or change the data. The current app does not implement user authentication, so do not store sensitive information in its database.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | App interface and module entry point |
| `index.css` | Page and control styles |
| `index.js` | Firebase setup, saving, rendering, and deletion |
| `firebase-bundle.js` | Browser bundle loaded by the page |
| `Dockerfile` | Nginx-based image for serving the static app |
| `.dockerignore` | Files omitted from the Docker build context |
| `manifest.json` | Chrome extension metadata and popup configuration |
| `site.webmanifest` | Web app name, icons, and display settings |
| `favicon*`, `apple-touch-icon.png`, `android-chrome-*`, `icon.png` | Browser, extension, and install icons |
