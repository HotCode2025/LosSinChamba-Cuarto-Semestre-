import matplotlib.pyplot as plt

# grafica de barras clasica y la guarda con el nombre que le pase
def generate_bar_chart(name, labels, values):
    fig, ax = plt.subplots()
    ax.bar(labels, values)
    plt.savefig(f'./imgs/{name}.png')
    plt.close()

# grafico de torta
def generate_pie_chart(labels, values):
    fig, ax = plt.subplots()
    ax.pie(values, labels=labels)
    # fuerza a que quede un circulo perfecto y no un ovalo
    ax.axis('equal')
    # ojo: aca le pusiste 'bar.png' pero es una torta
    plt.savefig('bar.png')
    plt.close()

if __name__ == '__main__':
    # datos mock para probar que dibuje bien
    labels = ['a', 'b', 'c']
    values = [10, 40, 800]
    # generate_bar_chart(labels, values)
    generate_pie_chart(labels, values)
