import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Earthquake } from "../types/index";

export async function obtenerEarthquake( collection: string ): Promise<Earthquake | null> {

  const referencia = ref(database, `${collection}`);

  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    return snapshot.val() as Earthquake;
  }

  return null;
}