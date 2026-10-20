import pygame
import sys
import random
import os
from personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, SCREEN_HEIGHT, FPS, COLOR_FONDO, COLOR_BARRA_VIDA, COLOR_BARRA_VIDA_FONDO

# inicializa el juego

def mostrar_imagen_inicial(screen, image_path, duracion):
    imagen = pygame.image.load(image_path).benvert()
    imagen = pygame.transform.scale(imagen, (SCREEN_WIDTH, SCREEN_HEIGHT))

    # BUCLE PARA MOSTRAR LA IMAGEN PRINICIPAL CON UNA OPACIDAD
    alpha = 255 #transparencia inicial completa
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion # duracion en milisegundos
while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        # disminuye la opacidad

    keys = pygame.key.get_pressed()
dx, dy = 0, 0
if keys[pygame.K_LEFT]:
    dx = -5
if keys[pygame.K_RIGHT]:
    dx = 5
if keys[pygame.K_UP]:
    dy = -5
if keys[pygame.K_DOWN]:
    dy = 5

personaje.mover(dx, dy)

if keys[pygame.K_SPACE]:
    personaje.lanzar_laser()
    sonido_laser.play()

# Actualizar poscion de enemigos y manejar las colisiones
for enemigo in enemigos[:]: # Iterar para eliminar la lista principal
    enemigo.mover()
    if enemigo.rect.top > SCREEN_HEIGHT:
        enemigos.remove(enemigo)

#Verificar colision con el laser
for laser in personaje.lasers[:]:
    if enemigo.rect.colliderect(laser.react):
        explosiones.append(Explosines(enemigo.rect.centerx, enemigo.rect.centery))
        enemigos.remove(enemigo) # elimina al enemigo
        personaje.lasers.remove(laser) # elimina el laser
        sonido_explosion.play()
        puntos += 10 # incrementa el puntuje
        break # sale del bucle

if enemigo.react.colliderect(personaje.shape):
    if not personaje.recibir_dano():
        running = False # termina el juego

#generan enemigos aleatorios
if random.randint(1, 100) <= 2: # 2% de probabilidad
    x = random.randint(0, SCREEN_WIDTH - 50)
    enemigo = Enemigo(x, 0)
    enemigo.append(enemigo)

# Actualizar y dibujar explosiones
explosionn = [ explosion for explosion in explosiones if explosion.actualizar()]

#actualizar el fondo cada 250 puntos
    if puntos > 0 and puntos % 250 == 0:
        if fondo_actual == fondo2:
            fondo_actual = fondo3
        else:
            fondo_actual = fondo2
            puntos += 10 # para que no se quede en el mismo fondo

#dibujar al fondo y objetos en la pantalla
screen.blit(fondo_actual, (0, 0))
personajes.dibujar(screen)
for enemigo in enemigos:
    enemigo.dibujar(screen)
for explosion in explosiones:
    explosion.dibujar(screen)