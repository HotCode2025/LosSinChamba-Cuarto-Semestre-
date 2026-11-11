import requests

# pegada a la api para traer la lista de usuarios
respuesta = requests.get("https://jsonplaceholder.typicode.com/users")

# 200 = salio todo bien
print("Código de estado:", respuesta.status_code)

# parseo el json a una lista de diccionarios
usuarios = respuesta.json()

# muestro solo los nombres en consola
for usuario in usuarios:
    print(usuario["name"])
