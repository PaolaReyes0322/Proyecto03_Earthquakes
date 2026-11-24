import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import App from './App';

// Tema oscuro con los colores del prototipo
const tema = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#38BDF8' },
    secondary: { main: '#F97316' },
    background: { default: '#0A1A3F', paper: '#0F2A63' },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);