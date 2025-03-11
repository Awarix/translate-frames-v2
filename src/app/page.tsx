'use client';

import dynamic from 'next/dynamic';

const Quiz = dynamic(() => import('~/components/Demo'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <Quiz />
    </main>
  );
}