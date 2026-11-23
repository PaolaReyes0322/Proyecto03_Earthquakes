import DataTable from './DataTable';
import type { Column } from './DataTable';
import MagnitudeBadge from './MagnitudeBadge';
import type { Earthquake } from '../types';

interface EarthquakeTableProps {
  rows: Earthquake[];
  limit?: number;
}

const columns: Column<Earthquake>[] = [
  { key: 'date', header: 'Fecha', render: (r) => r.time.slice(0, 10) },
  { key: 'place', header: 'Lugar', render: (r) => r.place },
  { key: 'mag', header: 'Magnitud', render: (r) => <MagnitudeBadge value={r.mag} /> },
  { key: 'depth', header: 'Profundidad (km)', render: (r) => r.depth.toFixed(1) },
  { key: 'magType', header: 'Tipo', render: (r) => r.magType },
];

export default function EarthquakeTable({ rows, limit = 6 }: EarthquakeTableProps) {
  return (
    <DataTable
      columns={columns}
      rows={rows.slice(0, limit)}
      scrollHint="Desliza horizontalmente para ver más columnas →"
    />
  );
}