import math
from decimal import Decimal


# crear un NaN nativo casteando desde string
a = float('nan')
print(f'a: {a}')

# para chequear si es NaN hay que usar math.isnan, porque NaN == NaN da False
a = float('nan')
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(a)}')

# tambien funciona con objetos Decimal de la libreria decimal
a = Decimal('NaN')
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(a)}')
