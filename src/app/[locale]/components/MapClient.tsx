"use client"

import dynamic from "next/dynamic";

const Map = dynamic(
  () => import('./Map'),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);

export default function MapClient({ posix, zoom }: { posix: [number, number]; zoom: number }) {
  return <Map posix={posix} zoom={zoom} />;
}
