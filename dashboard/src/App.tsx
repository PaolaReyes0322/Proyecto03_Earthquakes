import { useMemo, useState } from 'react';
import { Container, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import earthquakesData from './data/earthquakes.json';
import { filtrarSismos } from './utils/filtrarSismos';
import type { Earthquake, KpiItem, MagRange, YearFilter } from './types';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import ChartCard from './components/ChartCard';
import YearLineChart from './components/YearLineChart';
import RegionBarChart from './components/RegionBarChart';
import DepthMagScatter from './components/DepthMagScatter';
import EarthquakeTable from './components/EarthquakeTable';
import Footer from './components/Footer';

const sismos = earthquakesData as unknown as Earthquake[];
const yearOptions: YearFilter[] = [
  'Todos',
  ...[...new Set(sismos.map((e) => e.year))].sort(),
];

export default function App() {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));

  // Estado de los filtros (useState)
  const [year, setYear] = useState<YearFilter>('Todos');
  const [magRange, setMagRange] = useState<MagRange>([5, 9]);

  // Cada vez que cambia un filtro se recalculan los datos
  const r = useMemo(() => filtrarSismos(sismos, year, magRange), [year, magRange]);

  const kpis: KpiItem[] = [
    {
      label: 'Total de sismos',
      value: r.total.toLocaleString('en-US'),
      subtitle: `M ${magRange[0].toFixed(1)} – ${magRange[1].toFixed(1)}`,
      icon: <PublicIcon fontSize="large" />,
      color: '#38BDF8',
    },
    {
      label: 'Magnitud promedio',
      value: r.total ? r.promedio.toFixed(2) : '—',
      subtitle: 'Escala de magnitud',
      icon: <SpeedIcon fontSize="large" />,
      color: '#38BDF8',
    },
    {
      label: 'Magnitud máxima',
      value: r.maximo ? r.maximo.mag.toFixed(1) : '—',
      subtitle: r.maximo
        ? `${r.maximo.place} · ${r.maximo.time.slice(0, 10)}`
        : 'Sin registros',
      icon: <WarningAmberIcon fontSize="large" />,
      color: '#F97316',
    },
  ];

  const irAGraficos = () =>
    document.getElementById('graficos')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <HeroSection
          title="Dashboard de Monitoreo de Actividad Sísmica Global 2023-2026"
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
          <Grid size={{ xs: 12, md: 7 }}>
            <ChartCard title="Sismos por año" note="*2026 hasta el 14 de julio">
              <YearLineChart data={r.porAnio} selectedYear={year} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <ChartCard title="Top 10 regiones con más sismos">
              <RegionBarChart data={r.porRegion} limit={10} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <ChartCard title="Profundidad vs. magnitud">
              <DepthMagScatter points={r.filtrados} strongThreshold={7} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
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