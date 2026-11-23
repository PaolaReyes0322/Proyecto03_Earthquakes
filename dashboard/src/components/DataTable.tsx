import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  scrollHint?: string;
}

export default function DataTable<T>({
  columns,
  rows,
  emptyMessage = 'No hay registros con los filtros elegidos.',
  scrollHint,
}: DataTableProps<T>) {
  if (!rows.length) {
    return <Typography color="text.secondary">{emptyMessage}</Typography>;
  }

  return (
    <>
      {scrollHint && (
        <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, mb: 1 }}>
          {scrollHint}
        </Typography>
      )}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key} sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{c.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={c.key} sx={{ whiteSpace: 'nowrap' }}>{c.render(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}