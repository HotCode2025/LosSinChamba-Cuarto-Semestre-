import matplotlib.pyplot as plt

def generate_pie_chart():
    # datos de prueba para armar la torta
    labels = ["A", "B", "C"]
    values = [201, 23, 102]

    fig, ax = plt.subplots()
    ax.pie(values, labels=labels)
    # guardo la imagen en disco en vez de mostrarla en ventana
    plt.savefig("pie.png")

    # limpio memoria para no arrastrar la figura
    plt.close()
