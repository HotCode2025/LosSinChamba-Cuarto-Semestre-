import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y): # creo el metodo init que permite inicializar la clase Explosion con las coordenadas x e y de la explosión
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion0{i:02d}.png')) for i in range(9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0
        self.max_frames = 20

    def actualizar(self): # creo el metodo actualizar que permite actualizar la animación de la explosión
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False  # indica que la animación ha terminado
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen): # creo el metodo dibujar que permite dibujar la explosión en la pantalla
        screen.blit(self.image, self.rect.topleft)