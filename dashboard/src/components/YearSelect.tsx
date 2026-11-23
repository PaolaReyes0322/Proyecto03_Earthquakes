import { MenuItem, TextField } from '@mui/material';
import type { YearFilter } from '../types';

interface YearSelectProps {
  label: string;
  value: YearFilter;
  options: YearFilter[];
  onChange: (value: YearFilter) => void;
}

export default function YearSelect({ label, value, options, onChange }: YearSelectProps) {
  return (
    <TextField
      select
      size="small"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value === 'Todos' ? 'Todos' : Number(e.target.value))}
      sx={{ minWidth: 140 }}
    >
      {options.map((o) => (
        <MenuItem key={o} value={o}>{o}</MenuItem>
      ))}
    </TextField>
  );
}