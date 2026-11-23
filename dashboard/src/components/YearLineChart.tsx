import { Chip, Stack } from '@mui/material';
import ChartPlaceholder from './ChartPlaceholder';
import type { YearCount, YearFilter } from '../types';

interface YearLineChartProps {
    data: YearCount[];
    selectedYear: YearFilter;
}

export default function YearLineChart({ data, selectedYear }:
    YearLineChartProps) {
    return (
        <ChartPlaceholder label="Gráfico de líneas (Sprint 3)">
            <Stack direction="row" spacing={1} useFlexGap sx={{
                flexWrap:
                    'wrap', justifyContent: 'center'
            }}>
                {data.map((d) => (
                    <Chip
                        key={d.year}
                        size="small"
                        label={`${d.year}: ${d.count}`}
                        color={d.year === selectedYear ? 'warning' : 'default'}
                    />
                ))}
            </Stack>
        </ChartPlaceholder>
    );
}
