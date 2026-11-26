import json

with open('earthquakes.json', encoding='utf-8') as f:
    datos = json.load(f)

salida = {"earthquakes": {s["id"]: s for s in datos}}

with open('earthquakes_firebase.json', 'w', encoding='utf-8') as f:
    json.dump(salida, f, ensure_ascii=False)

print(len(salida["earthquakes"]), "sismos")