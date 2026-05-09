import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jan Uku Travel',
    short_name: 'Jan Uku Travel',
    description: 'Travel diaries, adventures and travel tips by Jan Uku.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2d7a4f',
    icons: [
      { src: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
