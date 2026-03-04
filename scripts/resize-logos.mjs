// One-time script to resize oversized company logos for PageSpeed.
// Run with: node scripts/resize-logos.mjs
// Uses sharp (already installed as devDependency).

import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.join(__dirname, "../public/images/companies");

// Per-file max dimensions (width × height) — fit inside, preserve aspect ratio, no enlargement.
const targets = {
  "oracle.png":     { width: 240, height: 135 },
  "shopify.png":    { width: 280, height: 88  },
  "ibm.png":        { width: 280, height: 105 },
  "salesforce.png": { width: 200, height: 140 },
  // All other PNGs: 300×150 max
  _default:         { width: 300, height: 150 },
};

const files = await readdir(LOGOS_DIR);
const pngs = files.filter((f) => f.endsWith(".png"));

for (const file of pngs) {
  const { width, height } = targets[file] ?? targets._default;
  const filePath = path.join(LOGOS_DIR, file);

  const meta = await sharp(filePath).metadata();
  const needsResize = (meta.width ?? 0) > width || (meta.height ?? 0) > height;

  if (!needsResize) {
    console.log(`  skip  ${file}  (${meta.width}×${meta.height} — already within ${width}×${height})`);
    continue;
  }

  const buffer = await sharp(filePath)
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  const { size: before } = await import("fs").then((m) => m.promises.stat(filePath));
  await import("fs").then((m) => m.promises.writeFile(filePath, buffer));

  const metaAfter = await sharp(buffer).metadata();
  console.log(
    `  done  ${file}  ${meta.width}×${meta.height} → ${metaAfter.width}×${metaAfter.height}  (${(before / 1024).toFixed(1)} KiB → ${(buffer.length / 1024).toFixed(1)} KiB)`
  );
}

console.log("\nAll logos processed.");
