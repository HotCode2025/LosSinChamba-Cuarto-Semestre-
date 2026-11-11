# formateo viejo estilo C con el operador % (%s string, %d entero)
nombre = 'Pepe'
edad = 45
msj_con_formato = 'Mi nombre es %s y tengo %d años' % (nombre, edad)
print(msj_con_formato)

# podes pasarle una tupla directa con los valores en orden (%.2f para clavar 2 decimales)
persona = ('Carla', 'Gomez', 5000.00)
msj_con_formato = 'Hola %s %s. Tu sueldo es %.2f' # % persona
# print(msj_con_formato % persona)

# con .format() usando llaves basicas por orden de parametros
nombre = 'Juan'
edad = 19
sueldo = 3000
# msj_con_formato = 'Nombre {} Edad {} Sueldo {:.2f}'.format(nombre, edad, sueldo)
# print(msj_con_formato)

# referenciando por indice posicional (arrancando en 0)
# mensaje = 'Nombre {0} Edad {1} Sueldo {2:.2f}'.format(nombre, edad, sueldo)
# print(mensaje)

# sirve para cambiar el orden de las variables sin tocar los argumentos del format
# mensaje = 'Sueldo {2:.2f} Edad {1} Nombre {0}'.format(nombre, edad, sueldo)
# print(mensaje)

# pasando alias explicitos en vez de depender de la posicion
mensaje = 'Nombre {n} Edad {e} Sueldo {s:.2f}'.format(n=nombre, e=edad, s=sueldo)
# print(mensaje)

# accediendo directo a las claves del diccionario desde el template
diccionario = {'nombre': 'Ivan', 'edad': 35, 'sueldo': 8000.00}
mensaje = 'Nombre {dic[nombre]} Edad {dic[edad]} Sueldo {dic[sueldo]:.2f}'.format(dic=diccionario)
print(mensaje)
