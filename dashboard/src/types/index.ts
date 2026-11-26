import type { ReactNode } from 'react';

export interface Earthquake {
  id: string;
  time: string;
  year: number;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  magType: string;
  place: string;
  region: string;
}

export type YearFilter = number | 'Todos';
export type MagRange = [number, number];

export interface KpiItem {
  label: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: string;
}

export interface YearCount {
  year: number;
  count: number;
}

export interface RegionCount {
  region: string;
  count: number;
}