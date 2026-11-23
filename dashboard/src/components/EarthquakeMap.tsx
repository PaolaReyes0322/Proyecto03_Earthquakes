import ChartPlaceholder from './ChartPlaceholder';
import type { Earthquake } from '../types';

interface EarthquakeMapProps {
  points: Earthquake[];
  height?: number;
}

export default function EarthquakeMap({ points, height = 320 }: EarthquakeMapProps) {
  return <ChartPlaceholder height={height} label={`Mapa mundial (Sprint 3): ${points.length} sismos a dibujar`} />;
}