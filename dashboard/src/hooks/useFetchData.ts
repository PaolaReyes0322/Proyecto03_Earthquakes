import { useEffect, useState } from 'react';
import { obtenerSismos } from '../services/earthquakeService';
import type { Earthquake } from '../types';

export default function useFetchData() {
  const [sismos, setSismos] = useState<Earthquake[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      try {
        const datos = await obtenerSismos();
        if (activo) setSismos(datos);
      } catch (e) {
        if (activo) setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  return { sismos, cargando, error };
}