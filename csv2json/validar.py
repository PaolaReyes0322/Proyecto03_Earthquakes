import csv
import json
from collections import Counter
from pathlib import Path

CARPETA = Path(__file__).parent
CSV_PATH = CARPETA / "sismos_2023_2026.csv"
JSON_PATH = CARPETA / "earthquakes.json"

CLAVES = ["id", "time", "year", "latitude", "longitude", "depth",
          "mag", "magType", "place", "region"]
TIPOS = {"id": str, "time": str, "year": int, "latitude": float,
         "longitude": float, "depth": float, "mag": float,
         "magType": str, "place": str, "region": str}

errores = []

with open(JSON_PATH, encoding="utf-8") as f:
    datos = json.load(f)                      # falla si el JSON no es válido
with open(CSV_PATH, encoding="utf-8-sig", newline="") as f:
    filas_csv = sum(1 for _ in csv.DictReader(f))

# 1. Estructura y cantidad de registros
print("1. ESTRUCTURA")
print(f"   Raíz es lista: {isinstance(datos, list)}")
print(f"   Registros en CSV: {filas_csv} | en JSON: {len(datos)}")
if len(datos) != filas_csv:
    errores.append("La cantidad de registros no coincide con el CSV")

# 2. Claves y tipos de cada registro
for i, r in enumerate(datos):
    if list(r.keys()) != CLAVES:
        errores.append(f"Registro {i}: claves distintas")
        continue
    for col, tipo in TIPOS.items():
        if r[col] is not None and not isinstance(r[col], tipo):
            errores.append(f"Registro {i}: '{col}' no es {tipo.__name__}")

# 3. Valores faltantes
print("2. VALORES FALTANTES (null por campo)")
nulos = {c: sum(1 for r in datos if r[c] is None) for c in CLAVES}
for c, n in nulos.items():
    print(f"   {c}: {n}")
    if n:
        errores.append(f"'{c}' tiene {n} valores nulos")

# 4. Rangos y duplicados
print("3. RANGOS")
mags = [r["mag"] for r in datos]
print(f"   mag: {min(mags)} - {max(mags)}")
print(f"   depth: {min(r['depth'] for r in datos)} - {max(r['depth'] for r in datos)}")
print(f"   latitude: {min(r['latitude'] for r in datos)} - {max(r['latitude'] for r in datos)}")
print(f"   longitude: {min(r['longitude'] for r in datos)} - {max(r['longitude'] for r in datos)}")
if min(mags) < 5.0:
    errores.append("Hay magnitudes menores a 5.0")
if any(not -90 <= r["latitude"] <= 90 or not -180 <= r["longitude"] <= 180 for r in datos):
    errores.append("Coordenadas fuera de rango")
if any(r["time"][:4] != str(r["year"]) for r in datos):
    errores.append("Hay registros donde 'year' no coincide con 'time'")

duplicados = [k for k, v in Counter(r["id"] for r in datos).items() if v > 1]
print(f"4. IDs duplicados: {len(duplicados)}")
if duplicados:
    errores.append(f"{len(duplicados)} ids duplicados")

print("5. SISMOS POR AÑO:", dict(sorted(Counter(r["year"] for r in datos).items())))
print("   Textos con '?':", sum(1 for r in datos if "?" in r["place"] or "?" in r["region"]))

print()
print("RESULTADO:", "JSON válido, sin errores" if not errores else "Errores encontrados")
for e in errores[:20]:
    print(" -", e)
