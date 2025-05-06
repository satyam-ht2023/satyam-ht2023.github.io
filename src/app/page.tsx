'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleRedirect = (param: string) => {
    router.push(`/last-run?domain=${param}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Affiliate Hygiene Dashboard</h1>
      <button onClick={() => handleRedirect('LM')}>View LM Report</button>
      <button onClick={() => handleRedirect('HT')}>View HT Report</button>
      <button onClick={() => handleRedirect('LH')}>View LH Report</button> 
    </div>
  );
}
