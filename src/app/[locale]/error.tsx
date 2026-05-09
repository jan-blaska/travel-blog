'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex justify-center h-[calc(100vh*(4/5))]'>
      <div className="flex flex-col w-[95%] max-w-6xl justify-center items-center gap-4">
        <span className="text-2xl md:text-4xl font-bold">Something went wrong</span>
        <span className="text-center text-(--green)">
          <button onClick={reset} className="underline cursor-pointer">Try again</button>
          {' or '}
          <Link href="/" className="underline">go to the home page</Link>.
        </span>
      </div>
    </div>
  );
}
