import csv

# lee el csv y lo transforma a una lista de diccionarios
def read_csv(path):
    with open(path, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        # saco la primera fila para usar los nombres de columnas como claves
        header = next(reader)
        data = []
        for row in reader:
            # junto encabezado con el valor de la fila y armo el dict
            iterable = zip(header, row)
            country_dict = {key: value for key, value in iterable}
            data.append(country_dict)
        return data

if __name__ == '__main__':
    # prueba rapida: levanto el archivo y muestro el primer registro
    data = read_csv('./data.csv')
    print(data[0])
