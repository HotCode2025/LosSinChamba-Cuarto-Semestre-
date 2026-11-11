# extrae solo los años y los pasa a int para poder graficarlos
def get_population(country_dict):
    population_dict = {
        '2022': int(country_dict['2022 Population']),
        '2020': int(country_dict['2020 Population']),
        '2015': int(country_dict['2015 Population']),
        '2010': int(country_dict['2010 Population']),
        '2000': int(country_dict['2000 Population']),
        '1990': int(country_dict['1990 Population']),
        '1980': int(country_dict['1980 Population']),
        '1970': int(country_dict['1970 Population'])
    }
    # separo los ejes (x = años, y = cantidad de gente)
    labels = population_dict.keys()
    values = population_dict.values()
    return labels, values


# busca la fila del pais que le pida dentro del dataset
def population_by_country(data, country):
    result = list(filter(lambda item: item['Country'] == country, data))
    return result
