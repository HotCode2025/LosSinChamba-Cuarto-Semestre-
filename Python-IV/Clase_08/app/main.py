import utils
import read_csv
import charts

def run():
    # cargo el archivo con la funcion del modulo propio
    data = read_csv.read_csv('./data.csv')
    # me quedo solo con los paises de sudamerica para no saturar el grafico
    data = list(filter(lambda item: item['Continent'] == 'South America', data))

    # saco las columnas que necesito para la torta
    countries = list(map(lambda x: x['Country'], data))
    percentages = list(map(lambda x: float(x['World Population Percentage']), data))
    charts.generate_pie_chart(countries, percentages)
  
    # pido el pais por consola para armar el grafico individual
    country = input('Type Country => ')
    print(country)

    result = utils.population_by_country(data, country)

    # si encontro coincidencia, saco el historico y guardo la barra
    if len(result) > 0:
        country = result[0]
        print(country)
        labels, values = utils.get_population(country)
        charts.generate_bar_chart(country['Country'], labels, values)

if __name__ == '__main__': 
    run()
