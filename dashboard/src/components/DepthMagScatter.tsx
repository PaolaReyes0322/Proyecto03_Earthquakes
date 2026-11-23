import ChartPlaceholder from './ChartPlaceholder';
import type { Earthquake } from '../types';

interface DepthMagScatterProps {
    points: Earthquake[];
    strongThreshold?: number;
}

export default function DepthMagScatter({ points, strongThreshold = 7
}: DepthMagScatterProps) {
    const fuertes = points.filter((p) => p.mag >=
        strongThreshold).length;
    return (
        <ChartPlaceholder
            label={`Dispersión (Sprint 3): ${points.length} puntos,
${fuertes} con M ≥ ${strongThreshold}`}
        />
    );
}
