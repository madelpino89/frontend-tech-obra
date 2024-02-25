# FRONTEND-TECH-OBRAMAT

Frontend construido utilizando Vue3, Vite y Mozaic-Vue que es un design system creado, desarrollado y mantenido por el grupo [ADEO] (https://www.adeo.com/es/) para mejor el proceso de desarrollo y entrega de los productos digitales de ADEO, Leroy Merlin y OBRAMAT.

- [Mozaic](https://mozaic.adeo.cloud/) (solo SASS sin jQuery)
- [Mozaic-Vue](https://adeo.github.io/mozaic-vue/?path=/docs/getting-started--docs)

##  IDE recomendado

[VSCode](https://code.visualstudio.com/).

# Instalación

Para la instalación de dependencias y ejecución de este proyecto se requiere de <a href="https://nodejs.org/" target="_blank">NodeJS</a> versión `>=18.18.0` y <a href="https://www.npmjs.com/get-npm" target="_blank">npm</a> versión `>=9.8.1`.

## Project Setup

```sh
mkdir <project-folder-name>
git clone <url> <project-folder-name>
cd <project-folder-name>
npm install
```

# Ambiente de desarrollo

> Para la correcta ejecución en un entorno local de desarrollo de este proyecto se recomienda primeramente en una terminal de Visual Studio Code levantar el servidor API REST [json-server] (https://github.com/typicode/json-server/) que utiliza datos mockeados en el fichero src/mocks/db.json con el siguiente script:

```sh
json-server --watch  src/mocks/db.json
```
> Una vez levantado el servidor API en la dirección [http://localhost:3000] (http://localhost:3000) se debe ejecutar la aplicación frontend utilizando el siguiente script

```sh
npm run dev
```

> Servidor web local disponible con hot reload en la dirección [http://localhost:8080] (http://localhost:8080)

# Notas importantes

> Esta aplicación forma parte de un examen técnico porpuesto por OBRAMAT qué no se ha podido cumplimentar teniendo en cuenta que entre sus principales objetivos se debía conectar este frontend con un API REST creado con Java y Spring Boot.

> Teniendo en cuenta que no ha sido posible terminar el backend se ha decidido utilizar json-server para servir los datos necesarios para crear un frontal que su principal valor añadido está el uso del sistema de diseño Mozaic creado por ADEO y utilizando en mas de 3000 repositorios dentro de la organización según sus propios datos [Get inspired](https://adeo.github.io/mozaic-vue/?path=/docs/get-inspired--docs)
