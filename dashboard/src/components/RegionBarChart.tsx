import { Box, LinearProgress, Stack, Typography } from
    '@mui/material';
import type { RegionCount } from '../types';

interface RegionBarChartProps {
    data: RegionCount[];
    limit?: number;
}

export default function RegionBarChart({ data, limit = 10 }:
    RegionBarChartProps) {
    const items = data.slice(0, limit);
    const max = items.length ? items[0].count : 1;
    if (!items.length) {
        return <Typography color="text.secondary">No hay registros con los
            filtros elegidos.</Typography>;
    }
    return (
        <Stack spacing={1}>
            {items.map((item) => (
                <Box key={item.region}>
                    <Typography variant="caption">{item.region}
                        ({item.count})</Typography>
                    <LinearProgress variant="determinate" value={(item.count /
                        max) * 100} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
            ))}
        </Stack>
    );
}