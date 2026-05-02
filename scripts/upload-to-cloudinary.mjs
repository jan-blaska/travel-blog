/**
 * Bulk upload script: uploads public/countries/ to Cloudinary preserving folder structure.
 *
 * Setup:
 *   npm install cloudinary dotenv
 *   Add to .env.local:
 *     CLOUDINARY_CLOUD_NAME=your-cloud-name
 *     CLOUDINARY_API_KEY=your-api-key
 *     CLOUDINARY_API_SECRET=your-api-secret
 *
 * Run:
 *   node scripts/upload-to-cloudinary.mjs
 */

import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env.local") });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
// Point this at the local folder where your real photos are organized
const SOURCE_DIR = join(__dirname, "../public/countries");

function collectImages(dir) {
    const results = [];
    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        if (statSync(fullPath).isDirectory()) {
            results.push(...collectImages(fullPath));
        } else if (IMAGE_EXTENSIONS.has(extname(entry).toLowerCase())) {
            results.push(fullPath);
        }
    }
    return results;
}

async function uploadAll() {
    const images = collectImages(SOURCE_DIR);
    console.log(`Found ${images.length} images to upload.`);

    for (const filePath of images) {
        const relativePath = relative(join(__dirname, "../public"), filePath);
        const normalized = relativePath.replace(/\\/g, "/");
        const withoutExt = normalized.replace(/\.[^/.]+$/, "");
        const lastSlash = withoutExt.lastIndexOf("/");
        const folder = withoutExt.substring(0, lastSlash);
        const publicId = withoutExt.substring(lastSlash + 1);

        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder,
                public_id: publicId,
                overwrite: false,
                unique_filename: false,
            });
            console.log(`✓ ${folder}/${publicId} → ${result.secure_url}`);
        } catch (err) {
            console.error(`✗ ${folder}/${publicId}: ${err.message}`);
        }
    }

    console.log("Done.");
}

uploadAll();
