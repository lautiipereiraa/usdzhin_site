# `usdzhin_site`

## 📝 Descripción

`usdzhin_site` es un proyecto de **front-end**, diseñado como una base ligera y moderna para desarrollar interfaces web de alto rendimiento. Este proyecto se enfoca en proporcionar una experiencia de desarrollo fluida y ágil, incluyendo configuraciones esenciales como **ESLint** para asegurar un código limpio y consistente. La aplicación está desplegada en **Vercel**.

-----

## 🛠️ Tecnologías

Este proyecto utiliza las siguientes tecnologías y herramientas:

  * **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
  * **Vite:** Herramienta de construcción de próxima generación para un desarrollo front-end más rápido.
  * **ESLint:** Herramienta de análisis de código estático para identificar y reportar patrones problemáticos en el código JavaScript.
  * **HTML, CSS, JavaScript:** Los lenguajes fundamentales para el desarrollo web.
  * **Git:** Sistema de control de versiones para gestionar el código.
  * **Vercel:** Plataforma de despliegue para el sitio web.

-----

## 🚀 Instalación

Para configurar y ejecutar este proyecto de forma local, sigue estos pasos. Asegúrate de tener **Node.js** y **npm** (o **Yarn**) instalados en tu máquina.

### Requisitos previos

  * **Node.js** (versión 14 o superior)
  * **npm** o **Yarn**

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/lautiipereiraa/usdzhin_site.git
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd usdzhin_site
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
    O si prefieres usar **Yarn**:
    ```bash
    yarn
    ```

-----

## 🏃 Uso

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo.

### Iniciar el servidor local

Para iniciar la aplicación en modo de desarrollo, ejecuta el siguiente comando. Esto abrirá el sitio en tu navegador en `http://localhost:5173`.

```bash
npm run dev
```

### Construir 

Para generar una versión optimizada y lista para producción del proyecto, ejecuta el siguiente comando. Los archivos se guardarán en el directorio `dist`.

```bash
npm run build
```

-----

## 📂 Estructura del proyecto

El proyecto sigue una estructura de directorios estándar de React y Vite, facilitando la navegación y el mantenimiento del código.

```
usdzhin_site/
├── .vscode/                 # Configuraciones de VS Code (opcional)
├── public/                  # Archivos estáticos (favicon, imágenes, etc.)
├── src/
│   ├── assets/              # Archivos de recursos (imágenes, fuentes)
│   ├── components/          # Componentes reutilizables de React
│   ├── App.jsx              # Componente principal de la aplicación
│   ├── index.css            # Hoja de estilos principal
│   ├── main.jsx             # Punto de entrada de la aplicación
├── .gitignore               # Archivos y directorios a ignorar por Git
├── index.html               # Archivo HTML principal
├── package.json             # Lista de dependencias y scripts
├── README.md                # Acerca del proyecto
└── vite.config.js           # Archivo de configuración de Vite
```

-----

## ⚙️ Scripts disponibles

En el archivo `package.json`, encontrarás los siguientes scripts:

  * `npm run dev`: Inicia el servidor de desarrollo local con recarga en caliente (HMR).
  * `npm run build`: Compila la aplicación para producción.
  * `npm run lint`: Ejecuta ESLint para revisar el código en busca de errores y advertencias.
  * `npm run preview`: Sirve la aplicación de producción localmente para pruebas.
