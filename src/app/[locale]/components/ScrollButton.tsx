"use client"

export default function ScrollButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      className="uppercase text-md px-10 md:px-20 py-3 md:py-6 w-min border-1 cursor-pointer bg-transparent hover:bg-white hover:text-black"
    >
      {label}
    </button>
  );
}
