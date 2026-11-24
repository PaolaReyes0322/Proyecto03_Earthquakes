import { LineChart } from '@mui/x-charts/LineChart';
import type { YearCount, YearFilter } from '../types';

interface YearLineChartProps {
    data: YearCount[];
    selectedYear: YearFilter;
}

export default function YearLineChart({ data, selectedYear }: YearLineChartProps) {
  const etiqueta = selectedYear === 'Todos' ? 'Sismos (todos los años)' : `Sismos (año ${selectedYear} resaltado en la tabla)`;
  return (
    <LineChart
      height={300}
      series={[{ data: data.map((d) => d.count), label: etiqueta }]}
      xAxis={[{ scaleType: 'point', data: data.map((d) => String(d.year)) }]}
    />
  );
}