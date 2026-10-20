import pygame # importo pygame para manejar gráficos y eventos
import sys # importo sys para manejar la salida del programa
import random # importo random para generar números aleatorios
import os # proporciona funcionalidades para interactuar con el sistema
from personaje import Personaje , Enemigo , Explosion # importo las clases Personaje, Enemigo y Explosion desde el archivo personaje.py
from constantes import SCREEN_WIDTH , SCREEN_HEIGHT , ASSETS_PATH # importo las constantes screen_width, screen_height y assets_path desde el archivo constantes.py


def mostrar_imagen_inicial(screen, imagen_path, duracion): # creo la funcion mostrar_imagen_inicial que permite mostrar una imagen inicial con desvanecimiento
    imagen = pygame.image.load(imagen_path).convert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    alpha = 255  # valor inicial de alpha (opacidad)
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion  # duración total en milisegundos (5 segundos = 5000 ms)
    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        tiempo_transcurrido = pygame.time.get_ticks() - tiempo_inicial # calcular el tiempo transcurrido desde que comenzó la animación

        alpha = 255 - (255 * (tiempo_transcurrido / tiempo_total)) # calcular el valor de alpha basado en el tiempo transcurrido y la duración total
        if alpha < 0:
            alpha = 0

        imagen.set_alpha(int(alpha)) # establecer el valor de alpha en la imagen
        screen.fill((0, 0, 0))  # rellenar la pantalla con negro antes de dibujar la imagen
        screen.blit(imagen, (0, 0))
        pygame.display.flip()

        clock.tick(60) 


def main() : # creo la función main que contiene el bucle principal del juego 
    pygame.init ( ) 
    screen = pygame.display.set_mode ( (SCREEN_WIDTH , SCREEN_HEIGHT) )
    pygame.display.set_caption ( 'amenaza Fantasma' )
    imagen_inicial_path = os.path.join ( ASSETS_PATH , 'images' , 'inicio' , 'star.png' )

    mostrar_imagen_inicial ( screen , imagen_inicial_path , 5000 )
    icon = pygame.image.load ( os.path.join ( ASSETS_PATH , 'images' , '001.jfif' ) )
    pygame.display.set_icon ( icon )

    fondo2 = pygame.image.load ( os.path.join ( ASSETS_PATH , 'images' , 'fondo2.jfif' ) )
    fondo2 = pygame.transform.scale ( fondo2 , (SCREEN_WIDTH , SCREEN_HEIGHT) )

    fondo3 = pygame.image.load ( os.path.join ( ASSETS_PATH , 'images' , 'fondo3.jpg' ) )
    fondo3 = pygame.transform.scale ( fondo3 , (SCREEN_WIDTH , SCREEN_HEIGHT) )

    fondo_actual = fondo2 # establezco el fondo inicial del juego como fondo2

    sonido_laser = pygame.mixer.Sound ( os.path.join ( ASSETS_PATH , 'sounds' , 'laserdis.mp3' ) )
    sonido_explosion = pygame.mixer.Sound ( os.path.join ( ASSETS_PATH , 'sounds' , 'explosion.mp3' ) )

    pygame.mixer.music.load ( os.path.join ( ASSETS_PATH , 'sounds' , 'efectos.mp3' ) ) # cargo la música de fondo del juego desde la carpeta de assets
    pygame.mixer.music.play ( -1 )  

    personaje = Personaje ( SCREEN_WIDTH // 2 , SCREEN_HEIGHT // 2 ) # creo una instancia de la clase Personaje y la posiciono en el centro de la pantalla
    enemigos = [ ] # creo una lista vacía para almacenar los enemigos que aparecerán en el juego
    explosiones = [ ] # creo una lista vacía para almacenar las explosiones que ocurrirán en el juego
    puntos = 0 # creo una variable para almacenar el puntaje del jugador
    nivel = 1 # creo una variable para almacenar el nivel del juego

    clock = pygame.time.Clock ( ) # creo un reloj para controlar la velocidad de actualización del juego
    running = True
    while running :
        for event in pygame.event.get ( ) :
            if event.type == pygame.QUIT :
                pygame.quit ( )
                sys.exit ( )

        keys = pygame.key.get_pressed ( )
        dx , dy = 0 , 0
        if keys [ pygame.K_LEFT ] :
            dx = -5
        if keys [ pygame.K_RIGHT ] :
            dx = 5
        if keys [ pygame.K_UP ] :
            dy = -5
        if keys [ pygame.K_DOWN ] :
            dy = 5

        personaje.mover ( dx , dy )

        if keys [ pygame.K_SPACE ] :
            personaje.lanzar_laser ( )
            sonido_laser.play ( )

        for enemigo in enemigos [ : ] : 
            enemigo.mover ( )
            if enemigo.rect.top > SCREEN_HEIGHT :
                enemigos.remove ( enemigo )

            # verifico si el enemigo colisiona con algún láser del personaje 
            for laser in personaje.lasers [ : ] :  
                if enemigo.rect.colliderect ( laser.rect ) :
                    explosiones.append ( Explosion ( enemigo.rect.centerx , enemigo.rect.centery ) )
                    enemigos.remove ( enemigo ) 
                    personaje.lasers.remove ( laser )  
                    sonido_explosion.play ( )
                    puntos += 10 # incremento el puntaje del jugador en 10 puntos por cada enemigo destruido
                    break  

            if enemigo.rect.colliderect ( personaje.shape ) : # verifico si el enemigo colisiona con el personaje
                if not personaje.recibir_dano ( ) :
                    running = False 

        if random.random ( ) < 0.02 : # 2% de probabilidad de generar un enemigo en cada frame
            x = random.randint ( 0 , SCREEN_WIDTH - 50 )  
            enemigo = Enemigo ( x , 0 )
            enemigos.append ( enemigo )

        explosiones = [ explosion for explosion in explosiones if explosion.actualizar ( ) ] # actualizo la lista de explosiones eliminando aquellas que han terminado su animación

        if puntos > 0 and puntos % 250 == 0 : # verifico si el puntaje del jugador es múltiplo de 250 para cambiar el fondo del juego
            if fondo_actual == fondo2 :
                fondo_actual = fondo3
            else :
                fondo_actual = fondo2
            puntos += 10  

        screen.blit ( fondo_actual , (0 , 0) ) # dibujo el fondo actual del juego en la pantalla
        personaje.dibujar ( screen )
        for enemigo in enemigos :
            enemigo.dibujar ( screen )
        for explosion in explosiones :
            explosion.dibujar ( screen )

        font = pygame.font.Font ( None , 36 ) # creo una fuente para mostrar el puntaje y el nivel del jugador en la pantalla
        texto_puntos = font.render ( f"Puntos: {puntos}" , True , (255 , 255 , 255) )
        texto_nivel = font.render ( f"Nivel: {nivel}" , True , (255 , 255 , 255) )
        screen.blit ( texto_puntos , (10 , 50) )
        screen.blit ( texto_nivel , (10 , 90) )

        if puntos >= 250 : # verifico si el puntaje del jugador es mayor o igual a 250 para aumentar el nivel del juego
            nivel += 1
            puntos = 0  

        pygame.display.flip ( ) # actualizo la pantalla con todo lo que se ha dibujado en ella
        clock.tick ( 60 )

   # Pantalla de GAME OVER
    screen.fill ( (0 , 0 , 0) )

    # defino las fuentes para los textos de GAME OVER y el mensaje adicional
    font_large = pygame.font.Font ( None , 74 )
    font_small = pygame.font.Font ( None , 36 )

    # renderizo los textos de GAME OVER y el mensaje adicional
    texto_game_over = font_large.render ( "GAME OVER" , True , (255 , 0 , 0) )
    texto_mensaje = font_small.render ( "Que la Fuerza te acompañe" , True , (255 , 255 , 255) )

    # calculo las posiciones para centrar los textos en la pantalla
    pos_x_game_over = SCREEN_WIDTH // 2 - texto_game_over.get_width ( ) // 2
    pos_y_game_over = SCREEN_HEIGHT // 2 - texto_game_over.get_height ( ) // 2 - 20  

    pos_x_mensaje = SCREEN_WIDTH // 2 - texto_mensaje.get_width ( ) // 2
    pos_y_mensaje = SCREEN_HEIGHT // 2 + texto_game_over.get_height ( ) // 2 + 20  

    # dibujo los textos en la pantalla
    screen.blit ( texto_game_over , (pos_x_game_over , pos_y_game_over) )
    screen.blit ( texto_mensaje , (pos_x_mensaje , pos_y_mensaje) )

    # actualizo la pantalla y espero 2 segundos antes de cerrar el juego
    pygame.display.flip ( )
    pygame.time.wait ( 2000 ) 
    pygame.quit ( )
    sys.exit ( )

# ejecuto la función main si el archivo se ejecuta directamente
if __name__ == '__main__' :
    main ( )