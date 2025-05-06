'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Result = {
  storyURL: string;
  totalAdUnits: number;
  totalSingleCards: number;
  totalMultiProductCarousel: number;
  topWidgetCardsNotRendered: { productId: string; cardNumber: number }[];
  singleCardsNotRendered: any[];
};

type ApiResponse = {
  domain: string;
  timestamp: string;
  results: Result[];
};

export default function LastRunPage() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!domain) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5100/api/v1/report/last-run?domain=${domain}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        const res = await fetch('/sample.json');
        const sampleData = await res.json();
        setData(sampleData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [domain]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Last Run Report for {data.domain}</h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Story URL</th>
            <th>Total Ad Units</th>
            <th>Total Single Card</th>
            <th>Total Multi Product Carousels</th>
            <th>Number of Cards Not Rendered in Top Widget</th>
            <th>Number of Single Cards Not Rendered</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item) => (
            <tr key={item.storyURL}>
              <td>
                <a href={item.storyURL} target="_blank" rel="noopener noreferrer">
                  {item.storyURL}
                </a>
              </td>
              <td>{item.totalAdUnits}</td>
              <td>{item.totalSingleCards}</td>
              <td>{item.totalMultiProductCarousel}</td>
              <td>{item.topWidgetCardsNotRendered?.length}</td>
              <td>{item.singleCardsNotRendered?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
