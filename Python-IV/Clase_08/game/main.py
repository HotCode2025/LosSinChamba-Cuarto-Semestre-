import random


# pide la jugada y valida que este bien escrita
def choose_options():
    options = ('piedra', 'papel', 'tijera')
    user_option = input('    piedra, papel o tijera -> ')
    user_option = user_option.lower()

    # si metio cualquier fruta devuelve vacio para saltar la ronda
    if not user_option in options:
        print('!!! Esa opcion no es valida')
        return None, None

    computer_option = random.choice(options)

    print('')
    print('Oponente =>', computer_option)
    return user_option, computer_option


# revisa quien suma punto segun las reglas
def check_rules(user_option, computer_option, user_wins, computer_wins):
    if user_option == computer_option:
        print('¡Empate!')
    elif user_option == 'piedra':
        if computer_option == 'tijera':
            print('piedra gana a tijera')
            print('-> USUARIO ¡GANA!')
            user_wins += 1
        else:
            print('Papel gana a piedra')
            print('-> OPONENTE ¡GANA!')
            computer_wins += 1
    elif user_option == 'papel':
        if computer_option == 'piedra':
            print('papel gana a piedra')
            print('-> USUARIO ¡GANA!')
            user_wins += 1
        else:
            print('tijera gana a papel')
            print('-> OPONENTE ¡GANA!')
            computer_wins += 1
    elif user_option == 'tijera':
        if computer_option == 'papel':
            print('tijera gana a papel')
            print('-> USUARIO ¡GANA!')
            user_wins += 1
        else:
            print('piedra gana a tijera')
            print('-> OPONENTE ¡GANA!')
            computer_wins += 1
    return user_wins, computer_wins


# loop principal del juego (al mejor de 3)
def run_game():
    computer_wins = 0
    user_wins = 0
    rounds = 1

    while True:
        print('\n')
        print('       ***********')
        print(f"       * ROUND {rounds} *")
        print('       ***********')
        print(f"Oponente  {computer_wins} - {user_wins}  Usuario\n")
        rounds += 1

        user_option, computer_option = choose_options()

        # si puso una opcion invalida, pasa al siguiente round sin evaluar
        if user_option is None:
            continue

        user_wins, computer_wins = check_rules(
            user_option, computer_option, user_wins, computer_wins)

        # el primero en llegar a 2 victorias se lleva la partida
        if computer_wins == 2:
            print('=========================')
            print('El CAMPEON es el OPONENTE')
            print('-------------------------\n')
            break

        if user_wins == 2:
            print('=========================')
            print('El CAMPEON es el USUARIO')
            print('-------------------------\n')
            break


run_game()
