import csv
import json
from pathlib import Path

CARPETA = Path(__file__).parent
ENTRADA = CARPETA / "global_earthquakes_2023_2026_limpio.csv"
SALIDA = CARPETA / "earthquakes.json"

# Orden de columnas y tipo esperado de cada una
COLUMNAS = ["id", "time", "year", "latitude", "longitude", "depth", "mag", "magType", "place", "region"]
ENTEROS = {"year"}
DECIMALES = {"latitude", "longitude", "depth", "mag"}


def convertir_fila(fila):
    registro = {}
    for col in COLUMNAS:
        valor = fila[col].strip()
        if not valor:
            registro[col] = None            
        elif col in ENTEROS:
            registro[col] = int(valor)
        elif col in DECIMALES:
            registro[col] = float(valor)
        else:
            registro[col] = valor           
    return registro


def main():
    # utf-8-sig
    with open(ENTRADA, encoding="utf-8-sig", newline="") as f:
        registros = [convertir_fila(fila) for fila in csv.DictReader(f)]

    with open(SALIDA, "w", encoding="utf-8") as f:
        json.dump(registros, f, indent=2, ensure_ascii=False)

    print(f"{len(registros)} registros convertidos -> {SALIDA.name}")


if __name__ == "__main__":
    main()