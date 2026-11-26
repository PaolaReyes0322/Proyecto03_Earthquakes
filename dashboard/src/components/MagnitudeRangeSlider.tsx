import { Box, Slider, Typography } from '@mui/material';
import type { MagRange } from '../types';

interface MagnitudeRangeSliderProps {
  value: MagRange;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: MagRange) => void;
}

export default function MagnitudeRangeSlider({ value, min = 5, max = 9, step = 0.5, onChange }: MagnitudeRangeSliderProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" gutterBottom>
        Rango de magnitud: {value[0].toFixed(1)} – {value[1].toFixed(1)}
      </Typography>
      <Slider
        value={value}
        min={5}
        max={9}
        step={0.5}
        marks
        disableSwap
        valueLabelDisplay="auto"
        onChange={(_, v) => {
          if (Array.isArray(v)) onChange([v[0], v[1]]);
        }}
      />
    </Box>
  );
}