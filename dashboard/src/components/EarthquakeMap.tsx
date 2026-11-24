import { ScatterChart } from '@mui/x-charts/ScatterChart';
import type { Earthquake } from '../types';

interface EarthquakeMapProps {
  points: Earthquake[];
  height?: number;
}

const MAX_PUNTOS = 2000;

export default function EarthquakeMap({ points, height = 320 }: EarthquakeMapProps) {
  const paso = Math.max(1, Math.ceil(points.length / MAX_PUNTOS));
  const muestra = points
    .filter((_, i) => i % paso === 0)
    .map((p, i) => ({ id: i, x: p.longitude, y: p.latitude }));

  return (
    <ScatterChart
      height={height}
      hideLegend
      series={[{ data: muestra, label: 'Sismos', markerSize: 3 }]}
      xAxis={[{ label: 'Longitud', min: -180, max: 180 }]}
      yAxis={[{ label: 'Latitud', min: -90, max: 90 }]}
    />
  );
}