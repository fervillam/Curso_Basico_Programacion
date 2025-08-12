import numpy as np # Esto hace que cada vez que llame una función de la librería numpy no tenga que escribir numpy sino np. Esto cambia la sintaxis de numpy.funcion() a np.funcion()

# Ejercicio 1: Crear un arreglo #

arreglo = np.arange(1,11,1) # Indica que el array comienza con 1 y se detiene en 11 pero nunca imprime el único número, sino que va hasta el interior. El tercer argumento indica el incremento de los números (en este caso, de uno en uno)
print(arreglo)

# Ejercicio 2: Operaciones básicas #

arreglo = np.array([1,2,3,4,5]) # Arreglo de números del 1 al 5 usando concatenación
print("Suma:", np.sum(arreglo)) # Calcula la suma de los números
print("Media:", np.mean(arreglo)) # Calcula la media de los números
print("Producto:", np.prod(arreglo)) # Multiplica los números

# Ejercicio 3: Matrices #

matriz = np.arange(1,10).reshape(3,3) # arange(1,10) me muestra un arreglo de números de a 1 a 9 y reshape(3,3) me reorganiza los números en una matriz 3x3
print("Matriz original:\n", matriz) # \n muestra un salto de línea, me imprime la matriz en el siguiente renglón
print("Transpuesta:\n", matriz.T) # La matriz original orienta los números de forma ascendente de izquierda a derecha y de arriba a abajo. La transpuesta lo hace de arriba a abajo y de izquierda a derecha. .T arroja la transposición

# Indexación y slicing #

arreglo = np.arange(10) # Me genera un array con los números del 0 al 9
print("Elementos del índice 2 al 6:", arreglo[2:7]) # Poner llaves al lado de un objeto me arroja la posición de un objeto. En este caso, me muestra los objetos que están en las posiciones 2,3,4,5,6 y 7

# Condicionales con NumPy #

arreglo # En el ejercicio muestra que arreglo sigue definido como np.arange(10)
arreglo[arreglo % 2 == 0] = -1 # Me cambió todos los números pares (los que cuando se dividen en 2 tienen residuo cero porque no dan decimal diferente a 0) del arreglo por -1
print("Arreglo modificado", arreglo)
