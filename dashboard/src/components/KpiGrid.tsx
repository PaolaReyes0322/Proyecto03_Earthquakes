import { Grid } from '@mui/material';
import KpiCard from './KpiCard';
import type { KpiItem } from '../types';

interface KpiGridProps {
    kpis: KpiItem[];
}

export default function KpiGrid({ kpis }: KpiGridProps) {
    return (
        <Grid container spacing={2}>
            {kpis.map((kpi) => (
                <Grid key={kpi.label} size={{ xs: 12, sm: 4 }}>
                    <KpiCard {...kpi} />
                </Grid>
            ))}
        </Grid>
    );
}