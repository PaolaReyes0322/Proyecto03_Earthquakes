import { ScatterChart } from '@mui/x-charts/ScatterChart';
import type { Earthquake } from '../types';

interface DepthMagScatterProps {
    points: Earthquake[];
    strongThreshold?: number;
}

const MAX_PUNTOS = 2000;

export default function DepthMagScatter({ points, strongThreshold = 7 }: DepthMagScatterProps) {
  const paso = Math.max(1, Math.ceil(points.length / MAX_PUNTOS));
  const muestra = points.filter((_, i) => i % paso === 0);

  const normales = muestra
    .filter((p) => p.mag < strongThreshold)
    .map((p, i) => ({ id: i, x: p.mag, y: p.depth }));
  const fuertes = muestra
    .filter((p) => p.mag >= strongThreshold)
    .map((p, i) => ({ id: `f${i}`, x: p.mag, y: p.depth }));

  return (
    <ScatterChart
      height={320}
      series={[
        { data: normales, label: `M < ${strongThreshold}`, markerSize: 3 },
        { data: fuertes, label: `M ≥ ${strongThreshold}`, markerSize: 5 },
      ]}
      xAxis={[{ label: 'Magnitud', min: 5 }]}
      yAxis={[{ label: 'Profundidad (km)', reverse: true }]}
    />
  );
}