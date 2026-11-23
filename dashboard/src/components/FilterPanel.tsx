import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import YearSelect from './YearSelect';
import MagnitudeRangeSlider from './MagnitudeRangeSlider';
import type { MagRange, YearFilter } from '../types';

interface FilterPanelProps {
  year: YearFilter;
  magRange: MagRange;
  yearOptions: YearFilter[];
  onYearChange: (year: YearFilter) => void;
  onMagRangeChange: (range: MagRange) => void;
  collapsible?: boolean;
}

export default function FilterPanel({
  year,
  magRange,
  yearOptions,
  onYearChange,
  onMagRangeChange,
  collapsible = false,
}: FilterPanelProps) {
  const controles = (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'center' } }}>
      <YearSelect label="Año" value={year} options={yearOptions} onChange={onYearChange} />
      <Box sx={{ flex: 1, px: { md: 2 } }}>
        <MagnitudeRangeSlider value={magRange} onChange={onMagRangeChange} />
      </Box>
    </Stack>
  );

  if (collapsible) {
    return (
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold' }}>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>{controles}</AccordionDetails>
      </Accordion>
    );
  }

  return <Paper sx={{ p: 2 }}>{controles}</Paper>;
}