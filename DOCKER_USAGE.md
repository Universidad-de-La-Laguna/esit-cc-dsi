
## Introducción

El uso de la tecnología de contenedores Docker facilita gestionar todas las dependencias de  los proyecto software tanto durante la **fase de desarrollo** como en la **fase de despligue**.

Como primer pasado debemos instalar Docker 

## Instalación de Docker

Para instalar Docker debe seguir las instrucciones dadas en la páginas web

https://docs.docker.com/engine/install/ubuntu/


```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo groupadd docker

sudo usermod -aG docker $USER

Log out and log back in so that your group membership is re-evaluated.

docker run hello-world

```

## Fase de desarrollo 

Una vez instalado Docker decidimos la arquictura que contenedores que tendrá nuestra aplicación.

En el fichero **docker-compose.yml** se declaran todos los contenedores que definen la aplicación: **mongo** y **express-app**, además de **express-app-tests** para los tests

* **Base de datos mongo**
    * será un contendor con la última versión disponible
    * se descarga de DockerHub, y se configura mediante variables de entorno
    * accesible en el puerto 27017
    * los datos se guardan en el volumen mongo-data
    * el usuario y el password lo definimos por variables de entorno

* Aplicación con node y express **express-app**
    * La imagen del contenedor se contruye (buid) a partir del fichero **Dockerfile**
    * Expone el puerto 3000 del contendor en el puerto 3000 de la máquina virtual
    * El directorio en la maquina virtual se hace accesible desde dentro del contenedor **./:/usr/src/app**. Esto permite trabajar directamente en el código sin tener que copiarlo en el contenedo durante la fase de desarrollo.


Comando para subir las imágenes de los contenedores a registro de GitHub

````
docker login ghcr.io -u pgonyan
docker compose build
docker compose push
````

## Despligue

Para hacer el despliegue de la aplicación de forma automatizada sólo necesitamos: 

- Imágenes de los contenedores alojados en un registro como DockerHub.
- Fichero **docker-compose.pro.yml** que define la formar de iniciar los contenedores en producción
- Variables de configuración (normalemente diferentes que el entorno dedesarrollo)

Anteriormente ya se ha construido la aplicación, pasado los test y subido al repositorio de artefactos.

Con estos tres archivos el despliegue en un servidor debe ser totalmente automático y fluido. Sin necesidad de acceder al código fuente.



## Referencias

https://docs.docker.com/get-started/