import csv
import json

def read_csv_file(file_path):
    bd = []
    try:
        with open(file_path, "r",encoding="utf-8") as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')

            for row in csv_reader:
                bd.append(row)
    except FileNotFoundError:
        print(f"O ficheiro {file_path} não encontrado")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    return bd

file_path = 'contratos2024.csv'
myBD = read_csv_file(file_path)

f = open("contratos2024.json","w",encoding="utf-8")
json.dump(myBD,f,indent=2)
f.close()