import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "public/logo-gmconsulting.png";
const OUT = "public";

interface Variant {
  name: string;
  size: number;
  format: "webp" | "png";
}

const variants: Variant[] = [
  { name: "logo-gmconsulting-72.webp", size: 72, format: "webp" },
  { name: "logo-gmconsulting-72.png", size: 72, format: "png" },
  { name: "logo-gmconsulting-56.webp", size: 56, format: "webp" },
  { name: "logo-gmconsulting-56.png", size: 56, format: "png" },
  { name: "logo-gmconsulting-44.webp", size: 44, format: "webp" },
  { name: "logo-gmconsulting-44.png", size: 44, format: "png" },
  { name: "logo-gmconsulting-128.webp", size: 128, format: "webp" },
  { name: "logo-gmconsulting-128.png", size: 128, format: "png" },
  { name: "logo-gmconsulting-512.webp", size: 512, format: "webp" },
  { name: "logo-gmconsulting-512.png", size: 512, format: "png" },
  { name: "logo-gmconsulting-1024.png", size: 1024, format: "png" },
];

async function main() {
  const trimmed = await sharp(SRC).trim().toBuffer();
  
  for (const v of variants) {
    const outPath = path.join(OUT, v.name);
    let pipeline = sharp(trimmed).resize(v.size, v.size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: "lanczos3",
    });

    if (v.format === "webp") {
      pipeline = pipeline.webp({ quality: 92 });
    } else {
      pipeline = pipeline.png({ quality: 90 });
    }

    await pipeline.toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`${v.name.padEnd(40)} ${v.size}×${v.size}  ${(stat.size / 1024).toFixed(1)} KB`);
  }

  console.log("\nAll variants generated.");
}

main().catch((e) => { console.error(e); process.exit(1); });
