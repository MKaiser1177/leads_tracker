const { readFileSync } = require("fs")
const esbuild = require("esbuild")

const ENV_KEYS = [
    "FIREBASE_API_KEY",
    "FIREBASE_AUTH_DOMAIN",
    "FIREBASE_DATABASE_URL",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_STORAGE_BUCKET",
    "FIREBASE_MESSAGING_SENDER_ID",
    "FIREBASE_APP_ID"
]

function loadEnv(file) {
    const env = {}
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) continue
        const eq = trimmed.indexOf("=")
        if (eq === -1) continue
        env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
    }
    return env
}

const env = loadEnv(".env")
const define = {}
for (const key of ENV_KEYS) {
    if (!env[key]) {
        throw new Error(`Missing ${key} in .env`)
    }
    define[`process.env.${key}`] = JSON.stringify(env[key])
}

esbuild.buildSync({
    entryPoints: ["index.js"],
    bundle: true,
    format: "iife",
    outfile: "firebase-bundle.js",
    define
})
