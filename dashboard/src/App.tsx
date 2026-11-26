import { useMemo, useState } from 'react';
import {Alert, Box, CircularProgress, Container, Grid, Stack, Typography, useMediaQuery, useTheme,} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import useFetchData from './hooks/useFetchData';
import { filtrarSismos } from './utils/filtrarSismos';
import type { KpiItem, MagRange, YearFilter } from './types';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import ChartCard from './components/ChartCard';
import YearLineChart from './components/YearLineChart';
import RegionBarChart from './components/RegionBarChart';
import DepthMagScatter from './components/DepthMagScatter';
import EarthquakeTable from './components/EarthquakeTable';
import Footer from './components/Footer';

export default function App() {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));

  // Datos desde Firebase (useEffect + useState dentro del hook)
  const { sismos, cargando, error } = useFetchData();

  // Estado de los filtros
  const [year, setYear] = useState<YearFilter>('Todos');
  const [magRange, setMagRange] = useState<MagRange>([5, 9]);

  const yearOptions = useMemo<YearFilter[]>(
    () => ['Todos', ...[...new Set(sismos.map((e) => e.year))].sort((a, b) => a - b)],
    [sismos],
  );

  const r = useMemo(() => filtrarSismos(sismos, year, magRange), [sismos, year, magRange]);

  if (cargando) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <CircularProgress sx={{ color: 'white' }} />
        <Typography sx={{ color: 'white' }}>Cargando sismos desde Firebase…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="error">No se pudieron cargar los datos: {error}</Alert>
      </Container>
    );
  }

  const kpis: KpiItem[] = [
    {
      label: 'Total de sismos',
      value: r.total.toLocaleString('en-US'),
      subtitle: `M ${magRange[0].toFixed(1)} – ${magRange[1].toFixed(1)}`,
      icon: <PublicIcon fontSize="large" />,
      color: '#1565c0',
    },
    {
      label: 'Magnitud promedio',
      value: r.total ? r.promedio.toFixed(2) : '—',
      subtitle: 'Escala de magnitud',
      icon: <SpeedIcon fontSize="large" />,
      color: '#1565c0',
    },
    {
      label: 'Magnitud máxima',
      value: r.maximo ? r.maximo.mag.toFixed(1) : '—',
      subtitle: r.maximo ? `${r.maximo.place} · ${r.maximo.time.slice(0, 10)}` : 'Sin registros',
      icon: <WarningAmberIcon fontSize="large" />,
      color: '#e65100',
    },
  ];

  const irAGraficos = () =>
    document.getElementById('graficos')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <HeroSection
          title="Actividad sísmica global 2023–2026"
          subtitle="Explora dónde, cuándo y con qué fuerza ocurren los terremotos de magnitud 5.0 o superior."
          badgeText="Datos: Kaggle · M ≥ 5.0"
          ctaLabel="Ver dashboard"
          onCtaClick={irAGraficos}
          kpis={kpis}
          mapPoints={r.filtrados}
        />

        <FilterPanel
          year={year}
          magRange={magRange}
          yearOptions={yearOptions}
          onYearChange={setYear}
          onMagRangeChange={setMagRange}
          collapsible={esMovil}
        />

        <Grid container spacing={3} id="graficos">
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title="Sismos por año" note="2026 hasta el 14 de julio">
              <YearLineChart data={r.porAnio} selectedYear={year} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title="Top 10 regiones con más sismos">
              <RegionBarChart data={r.porRegion} limit={10} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title="Profundidad vs. magnitud">
              <DepthMagScatter points={r.filtrados} strongThreshold={7} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title="Sismos más fuertes registrados">
              <EarthquakeTable rows={r.masFuertes} limit={6} />
            </ChartCard>
          </Grid>
        </Grid>

        <Footer text="Fuente de datos: Kaggle, Global Earthquakes 2020-2026 (Neave, 2026)." />
      </Stack>
    </Container>
  );
}