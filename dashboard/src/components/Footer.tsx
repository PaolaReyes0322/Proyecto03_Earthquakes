import { Typography } from '@mui/material';

interface FooterProps {
    text: string;
}

export default function Footer({ text }: FooterProps) {
    return (
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', py: 3 }}
        >
            {text}
        </Typography>
    );
}