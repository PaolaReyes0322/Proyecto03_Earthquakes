import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import type { RegionCount } from '../types';

interface RegionBarChartProps {
    data: RegionCount[];
    limit?: number;
}

export default function RegionBarChart({ data, limit = 10 }: RegionBarChartProps) {
  const items = data.slice(0, limit);

  if (!items.length) {
    return <Typography color="text.secondary">No hay registros con los filtros elegidos.</Typography>;
  }

  return (
    <BarChart
      height={320}
      layout="horizontal"
      margin={{ left: 130 }}
      series={[{ data: items.map((i) => i.count), label: 'Sismos' }]}
      yAxis={[{ scaleType: 'band', data: items.map((i) => i.region) }]}
    />
  );
}