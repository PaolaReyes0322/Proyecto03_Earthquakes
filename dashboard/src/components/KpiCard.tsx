import type { ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface KpiCardProps {
    label: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
    color: string;
}

export default function KpiCard({ label, value, subtitle, icon, color
}: KpiCardProps) {
    return (
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <Box>
                <Typography variant="body2"
                    color="text.secondary">{label}</Typography>
                <Typography variant="h4" sx={{
                    fontWeight: 'bold', color
                }}>{value}</Typography>
                <Typography variant="caption"
                    color="text.secondary">{subtitle}</Typography>
            </Box>
            <Box sx={{ color }}>{icon}</Box>
        </Paper>
    );
}