const BASE = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

export function getImageSrc(src: string): string {
    if (!BASE || src.startsWith("http")) return src;
    return `${BASE}/${src.startsWith("/") ? src.slice(1) : src}`;
}
