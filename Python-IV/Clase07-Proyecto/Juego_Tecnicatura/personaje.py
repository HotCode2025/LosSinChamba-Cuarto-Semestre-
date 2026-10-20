import pygame 
import os  
from constantes import ASSETS_PATH # importo la constante assets_path para acceder a la carpeta de recursos del juego

class Personaje: # crwo la clase Personaje que representa al jugador en el juego
    def __init__(self, x, y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'Speeder.png'))
        self.image = pygame.transform.scale(self.image, (95, 95))
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100  

    def mover(self, dx, dy): # creo el metodo mover que permite mover al personaje en la pantalla
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self): # creo el metodo lanzar_laser que permite al personaje disparar un laser
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self): # creo el metodo recibir_dano que permite al personaje recibir daño y actualizar su energía
        self.energia -= 10
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def dibujar(self, screen): # creo el metodo dibujar que permite dibujar al personaje y sus lasers en la pantalla
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()

        pygame.draw.rect(screen, (255, 0, 0), (10, 10, 100, 10))  # barra de fondo
        pygame.draw.rect(screen, (0, 255, 0), (10, 10, self.energia, 10))  # barra de energía

class Enemigo: # creo la clase Enemigo que representa a los enemigos en el juego
    def __init__(self, x, y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'enemigo1.png'))
        self.image = pygame.transform.scale(self.image, (80, 80))
        self.rect = self.image.get_rect(topleft=(x, y))

    def mover(self): # creo el metodo mover que permite mover al enemigo hacia abajo en la pantalla
        self.rect.y += 5  
    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Laser: # creo la clase Laser que representa los lasers disparados por el personaje
    def __init__(self, x, y):
        self.image = pygame.image.load(os.path.join(ASSETS_PATH, 'images', 'lase1.png'))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self): # creo el metodo mover que permite mover al láser hacia arriba en la pantalla
        self.rect.y -= 10  #

    def dibujar(self, screen): # creo el metodo dibujar que permite dibujar al láser en la pantalla
        screen.blit(self.image, self.rect.topleft)

class Explosion: # creo la clase Explosion que representa las explosiones en el juego
    def __init__(self, x, y):
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
                return False 
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen): # creo el metodo dibujar que permite dibujar la explosión en la pantalla
        screen.blit(self.image, self.rect.topleft)