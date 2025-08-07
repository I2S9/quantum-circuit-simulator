'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type Props = {
  labels: string[];
  values: number[];
  yLabel: string;
  yMax?: number;
};

export default function Histogram({ labels, values, yLabel, yMax }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: yLabel,
            data: values,
            backgroundColor: 'rgba(14, 165, 233, 0.8)',
            hoverBackgroundColor: 'rgba(2, 132, 199, 0.9)',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false, text: 'Histogram' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: true, color: 'rgba(0,0,0,0.05)' },
            title: { display: true, text: 'Measured state' },
          },
          y: {
            grid: { display: true, color: 'rgba(0,0,0,0.05)' },
            title: { display: true, text: yLabel },
            beginAtZero: true,
            suggestedMax: yMax,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, values, yLabel]);

  return (
    <div className="h-72">
      <canvas ref={canvasRef} />
    </div>
  );
}

