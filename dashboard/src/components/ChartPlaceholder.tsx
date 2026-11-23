import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface ChartPlaceholderProps {
  label: string;
  height?: number;
  children?: ReactNode;
}

export default function ChartPlaceholder({ label, height = 240, children }: ChartPlaceholderProps) {
  return (
    <Box
      sx={{
        height,
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 2,
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <Typography variant="body2">{label}</Typography>
      {children}
    </Box>
  );
}