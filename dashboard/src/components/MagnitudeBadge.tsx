import { Chip } from '@mui/material';
interface MagnitudeBadgeProps {
    value: number;
}
export default function MagnitudeBadge({ value }: MagnitudeBadgeProps) {
    const color = value >= 7 ? '#d32f2f' : value >= 6 ? '#ef6c00' :
        '#1976d2';
    return (
        <Chip
            label={value.toFixed(1)}
            size="small"
            sx={{ bgcolor: color, color: 'white', fontWeight: 'bold' }}
        />
    );
}