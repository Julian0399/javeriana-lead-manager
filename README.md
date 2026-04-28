# Javeriana Lead & Events Manager

 
Aplicación web de una sola página (SPA) desarrollada como prueba técnica para el puesto de Desarrollador FrontEnd en la Universidad Javeriana.

## Demo en producción Vercel

[Ver aplicación desplegada](https://javeriana-lead-manager-rho.vercel.app/)


## Stack tecnológico
 
| Tecnología | Uso |
|---|---|
| React 19 + Vite | Framework y bundler |
| TypeScript | Tipado estricto, con el menor uso de `any` posible |
| Tailwind CSS v4 | Estilos y diseño responsive |
| Redux Toolkit | Gestión de estado global |
| My JSON Server | API REST simulada con datos reales |
 
---

## Cómo ejecutar el proyecto localmente

### Requisitos previos
 
- Node.js 18 o superior
- npm 9 o superior


### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Julian0399/javeriana-lead-manager.git
cd javeriana-lead-manage
 
# 2. Instalar dependencias
npm install
 
# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## API de datos
 
Los programas académicos se consumen desde **My JSON Server**, que expone el archivo `db.json` del repositorio como una API REST, tambien esta el archivo `programas_completo`, el cual se saco priemro extrayendo los datos de la pagina propia de la universiada para tener los programas, pero por peso se tuvo que reorganizar y separar en `db.json`, para que funcionara correctamente en **My JSON Server**:

```
GET https://my-json-server.typicode.com/Julian0399/javeriana-lead-manager/programs
```
## Decisiones técnicas

### Diseño con identidad Javeriana
Principalmente de la pagina web tambien se sacaron los colores que utiliza la pagina y la institucion (`#2C5697` azul y `#f8cd00` dorado) lso cuales se definieron como tokens en el `index.css` usando la directiva `@theme` de Tailwind , lo que permite referenciarlos como `bg-primary` y `bg-accent` en todo el proyecto. 
### Redux Toolkit para estado global
Se uso Redux Toolkit para persestir los datos como las busquedas atraves de diferentes componentes y tiene que ser accesible de forma facil, tamien se manejaron slices para programas y leads.
### Hooks tipados (`useAppDispatch` / `useAppSelector`)
Ya que la prueba pues necesitaba el menso uso del typo `any`, se obto por esos dos sencillos hoocks los cuales garantizan que el tipado sea el correcto.
### Filtrado con `useMemo`
Para mejorar la optimizacion de la pagina, se usa useMemo, el cual cachea el resultado de funciones en este caso el filtrado para que cuando se hagan lso renders no se recalcule si no que lo mantenga.
### Persistencia en localStorage
Los leads son cargados desde `localStorage`cuando se crea el slice, y cuando se agrega uno nuevo pues se sincroniza.

## Autor
 
**Julian Andres Rodriguez**
[GitHub](https://github.com/Julian0399) · [LinkedIn](https://www.linkedin.com/in/julianrod-ing/)

