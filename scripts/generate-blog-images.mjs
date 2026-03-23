/**
 * generate-blog-images.mjs
 *
 * Generates hero images for each blog post using the Gemini API.
 *
 * Usage:
 *   node scripts/generate-blog-images.mjs
 *
 * Requirements:
 *   - GEMINI_API_KEY set in .env.local (or as a real env var)
 *   - Node.js 18+ (for native fetch + fs/promises)
 *   - dotenv package: pnpm add -D dotenv
 *
 * Output:
 *   /public/images/blog/{slug}.png  — one PNG per blog post
 */

import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Load .env.local ─────────────────────────────────────────────────────────
function loadEnvLocal() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.error("❌  .env.local not found at project root.");
    console.error("    Create it and add: GEMINI_API_KEY=your_key_here");
    process.exit(1);
  }

  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌  GEMINI_API_KEY is not set in .env.local");
  process.exit(1);
}

// ── Blog posts and their image prompts ──────────────────────────────────────
const POSTS = [
  {
    slug: "save-on-hiring-costs-new-llc",
    prompt:
      "Professional business owner reviewing financial documents at a modern minimalist desk, cost savings chart visible on laptop screen, clean bright office environment, photorealistic corporate photography style, soft natural lighting, no text or labels in image",
  },
  {
    slug: "advantages-of-hiring-remote-contractors",
    prompt:
      "Split composition showing two professionals working effectively from different locations connected digitally, one in a modern home office with plants and a laptop, one in a corporate office, warm professional lighting, photorealistic, no text or labels in image",
  },
  {
    slug: "era-of-remote-contracting",
    prompt:
      "Aerial view of a global digital network visualization connecting professionals across continents on a modern world map with subtle glowing connection lines, professional business aesthetic, deep navy and teal color palette, photorealistic, no text or labels in image",
  },
  {
    slug: "how-to-manage-a-remote-team",
    prompt:
      "Business manager confidently reviewing team KPI dashboard on a large curved monitor, organized modern workspace with plants, soft data metrics and charts visible on screen, professional corporate setting, warm lighting, photorealistic, no text or labels in image",
  },
  {
    slug: "latam-outsourcing-country-comparison",
    prompt:
      "Stylized Latin America map with glowing major business cities highlighted, professional talent network visualization with subtle dotted connection lines, clean modern corporate aesthetic, teal and green color accents on dark background, no text or labels in image",
  },
  {
    slug: "honduras-english-proficiency-outsourcing",
    prompt:
      "Smiling diverse professional team of customer service representatives in a bright modern call center, clean corporate environment, natural daylight from large windows, high-end photorealistic photography, no text flags or labels in image",
  },
  {
    slug: "reinvest-payroll-savings-from-remote-hiring",
    prompt:
      "Confident executive reviewing upward-trending growth charts on a large tablet, money and investment visuals subtly in background, modern glass office environment, sunrise or natural window lighting, photorealistic, aspirational business photography style, no text or labels in image",
  },
];

// ── Gemini API endpoint ──────────────────────────────────────────────────────
const GEMINI_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`;

// ── Output directory ─────────────────────────────────────────────────────────
const OUTPUT_DIR = join(ROOT, "public", "images", "blog");
mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Helper: delay ─────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Generate a single image ──────────────────────────────────────────────────
async function generateImage(slug, prompt, attempt = 1) {
  console.log(`\n🎨  [${slug}] Generating image (attempt ${attempt})…`);
  console.log(`    Prompt: ${prompt.slice(0, 80)}…`);

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
    },
  };

  const res = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();

  // Navigate to the inline image data
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error("No parts returned in response: " + JSON.stringify(data));
  }

  // Find the part that contains image data
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    throw new Error(
      "No inlineData.data found in response parts: " + JSON.stringify(parts)
    );
  }

  const { data: base64Data, mimeType } = imagePart.inlineData;
  const ext = mimeType === "image/webp" ? "webp" : mimeType === "image/jpeg" ? "jpg" : "png";
  const outputPath = join(OUTPUT_DIR, `${slug}.${ext}`);

  const buffer = Buffer.from(base64Data, "base64");
  writeFileSync(outputPath, buffer);

  const sizeKb = Math.round(buffer.length / 1024);
  console.log(`    ✅  Saved → public/images/blog/${slug}.${ext} (${sizeKb} KB)`);
  return outputPath;
}

// ── Main runner ───────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Remote ACKtive — Blog Image Generator");
  console.log("  Model: gemini-2.5-flash-image");
  console.log(`  Output: public/images/blog/`);
  console.log("═══════════════════════════════════════════════════════");

  const results = { success: [], failed: [] };

  for (let i = 0; i < POSTS.length; i++) {
    const { slug, prompt } = POSTS[i];
    const outputPng = join(OUTPUT_DIR, `${slug}.png`);
    const outputWebp = join(OUTPUT_DIR, `${slug}.webp`);

    // Skip if already generated
    if (existsSync(outputPng) || existsSync(outputWebp)) {
      console.log(`\n⏭️  [${slug}] Already exists — skipping.`);
      results.success.push(slug);
      continue;
    }

    try {
      await generateImage(slug, prompt);
      results.success.push(slug);
    } catch (err) {
      console.error(`\n❌  [${slug}] Failed: ${err.message}`);

      // Retry once after 5s on rate limit or server error
      if (err.message.includes("429") || err.message.includes("500")) {
        console.log(`    ⏳  Retrying in 10s…`);
        await sleep(10_000);
        try {
          await generateImage(slug, prompt, 2);
          results.success.push(slug);
        } catch (retryErr) {
          console.error(`    ❌  Retry failed: ${retryErr.message}`);
          results.failed.push(slug);
        }
      } else {
        results.failed.push(slug);
      }
    }

    // Rate-limit courtesy pause between requests (not the last one)
    if (i < POSTS.length - 1) {
      console.log(`    ⏳  Waiting 3s before next request…`);
      await sleep(3_000);
    }
  }

  // Summary
  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  Summary");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`  ✅  Generated: ${results.success.length} / ${POSTS.length}`);
  if (results.failed.length > 0) {
    console.log(`  ❌  Failed:    ${results.failed.length}`);
    results.failed.forEach((s) => console.log(`        - ${s}`));
  }
  console.log("\n  Next steps:");
  console.log("  1. Review images in public/images/blog/");
  console.log("  2. See scripts/README-images.md for how to use them in blog posts");
  console.log("═══════════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
