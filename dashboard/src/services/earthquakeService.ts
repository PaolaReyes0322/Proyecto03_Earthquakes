import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Earthquake } from "../types/index";

export async function obtenerSismos(): Promise<Earthquake[]> {
  const snapshot = await get(ref(database, 'earthquakes'));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.values(snapshot.val() as Record<string, Earthquake>);
}