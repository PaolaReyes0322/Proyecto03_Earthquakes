import type { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';

interface ChartCardProps {
  title: string;
  note?: string;
  children: ReactNode;
}

export default function ChartCard({ title, note, children }: ChartCardProps) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
      {children}
      {note && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          {note}
        </Typography>
      )}
    </Paper>
  );
}