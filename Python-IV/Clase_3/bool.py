# los numeros solo dan False si son exactamente cero (0 o 0.0), el resto siempre da True (incluso negativos)
valor = 0.0
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

valor = -1
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

# strings: texto vacio evalua como False, con que tenga un solo caracter ya es True
valor = ''
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

valor = 'Hola'
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

# colecciones: misma logica, si no tienen elementos adentro dan False
# listas
valor = []
resultado = bool(valor)
print(f'Valor de una lista vacia: {valor}, Resultado: {resultado}')

valor = [2, 3, 4]
resultado = bool(valor)
print(f'Valor de una lista con elementos: {valor}, Resultado: {resultado}')

# tuplas (ojo a la coma si tiene un solo elemento)
valor = ()
resultado = bool(valor)
print(f'Valor de una tupla vacia: {valor}, Resultado: {resultado}')

valor = (5, )
resultado = bool(valor)
print(f'Valor de una tupla con elementos: {valor}, Resultado: {resultado}')

# diccionarios
valor = {}
resultado = bool(valor)
print(f'Valor de un diccionario vacio: {valor}, Resultado: {resultado}')

valor = {'Nombre': 'Juan', 'Apellido': 'Perez'}
resultado = bool(valor)
print(f'Valor de un diccionario con elementos: {valor}, Resultado: {resultado}')

# python evalua la verdad implicita de la variable sin obligarte a castear a bool()
if '':
    print('Regresa verdadero')
else:
    print('Regresa falso')

# pasarle bool() al if funciona pero es redundante
if bool('hola'):
    print('Regresa verdadero')
else:
    print('Regresa falso')

# en loops: si la condicion arranca en != 0 entra directo
variable = 15
while variable:
    print('Regresa verdadero')
    break
else:
    print('Regresa falso')

# aca ni entra al while porque 0 es falsy, salta de una al else
variable = 0
while variable:
    print('Regresa verdadero')
else:
    print('Regresa falso')
