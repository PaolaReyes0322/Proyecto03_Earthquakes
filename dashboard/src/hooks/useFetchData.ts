import { useEffect, useState } from "react";
import { obtenerEarthquake } from "../services/earthquakeService";
import type { Earthquake } from "../types/index";

export default function useFetchData( place: string ) {

  const [clima, setClima] = useState<Clima | null>(null);

  useEffect(() => {

    if (!ciudad) {
      return;
    }

    async function cargarDatos() {

      const datos = await obtenerClima(`clima/${ciudad}`);

      setClima(datos);
    }

    cargarDatos();

  }, [ciudad]);

  return { clima }
}