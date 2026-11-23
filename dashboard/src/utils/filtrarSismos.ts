import type { Earthquake, MagRange, RegionCount, YearCount, YearFilter } from '../types';

export function filtrarSismos(data: Earthquake[], year: YearFilter, magRange: MagRange) {
  const [min, max] = magRange;
  const porMagnitud = data.filter((e) => e.mag >= min && e.mag <= max);
  const filtrados = year === 'Todos' ? porMagnitud : porMagnitud.filter((e) => e.year === year);

  const total = filtrados.length;
  const promedio = total ? filtrados.reduce((s, e) => s + e.mag, 0) / total : 0;
  const maximo = total ? filtrados.reduce((m, e) => (e.mag > m.mag ? e : m)) : null;

  const conteoAnios = new Map<number, number>();
  porMagnitud.forEach((e) => conteoAnios.set(e.year, (conteoAnios.get(e.year) ?? 0) + 1));
  const porAnio: YearCount[] = [...conteoAnios]
    .map(([anio, count]) => ({ year: anio, count }))
    .sort((a, b) => a.year - b.year);

  const conteoRegiones = new Map<string, number>();
  filtrados.forEach((e) => conteoRegiones.set(e.region, (conteoRegiones.get(e.region) ?? 0) + 1));
  const porRegion: RegionCount[] = [...conteoRegiones]
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const masFuertes = [...filtrados].sort((a, b) => b.mag - a.mag);

  return { filtrados, total, promedio, maximo, porAnio, porRegion, masFuertes };
}