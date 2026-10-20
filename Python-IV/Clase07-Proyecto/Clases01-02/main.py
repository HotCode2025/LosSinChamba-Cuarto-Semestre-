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