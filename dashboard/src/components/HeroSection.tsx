import { Button, Chip, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import KpiGrid from './KpiGrid';
import ChartCard from './ChartCard';
import EarthquakeMap from './EarthquakeMap';
import type { Earthquake, KpiItem } from '../types';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  ctaLabel: string;
  onCtaClick: () => void;
  kpis: KpiItem[];
  mapPoints: Earthquake[];
}

export default function HeroSection({
  title, subtitle, badgeText, ctaLabel, onCtaClick, kpis, mapPoints,
}: HeroSectionProps) {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={3} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 5 }} sx={{ order: 1 }}>
        <Chip label={badgeText} sx={{ mb: 2 }} />
        <Typography
            variant={esMovil ? 'h4' : 'h3'}
            component="h1"
            sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}
        >
            {title}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 3 }}>{subtitle}</Typography>
        <Button variant="contained" onClick={onCtaClick}>{ctaLabel}</Button>
        </Grid>

        <Grid size={12} sx={{ order: { xs: 2, md: 3 } }}>
        <KpiGrid kpis={kpis} />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 3, md: 2 } }}>
        <ChartCard title="Distribución geográfica de los sismos">
            <EarthquakeMap points={mapPoints} height={esMovil ? 220 : 320} />
        </ChartCard>
        </Grid>
    </Grid>
    );
}