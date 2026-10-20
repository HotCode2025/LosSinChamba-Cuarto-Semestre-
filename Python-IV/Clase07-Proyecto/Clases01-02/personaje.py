import pygame
import os
from constantes import ASSETS_PATH

class personaje:
    def __init__(self, x, y):
        #construye la ruta a la imagen del personaje
        self.image_path = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'personaje1.png'))
        self.image = pygame.transform.scale(self.image_path, (95, 95))  # Ajusta el tamaño de la imagen
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100 #barra d energia
