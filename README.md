# Buscador de Clima

Aplicación web desarrollada con React + TypeScript que consulta el clima actual de cualquier ciudad mediante la API de OpenWeatherMap.

## Tecnologías

- **React 18** con **TypeScript**
- **Vite** + **SWC** para el build
- **CSS Modules** para estilos con efecto glassmorphism
- **Zod** para validación de datos de la API
- **Axios** para peticiones HTTP

## Funcionalidades

- Búsqueda de clima por ciudad y país
- Validación de formularios
- Visualización de temperatura actual, mínima y máxima
- Manejo de estados: carga, error y ciudad no encontrada
- Diseño responsive con glassmorphism

## Instalación

```bash
pnpm install
```

## Uso

1. Copiar el archivo `.env.local` y asignar una API Key de OpenWeatherMap:

```
VITE_API_KEY=tu_api_key
```

2. Iniciar en modo desarrollo:

```bash
pnpm dev
```

3. Build para producción:

```bash
pnpm build
```

## API

Se utiliza la API gratuita de [OpenWeatherMap](https://openweathermap.org/api). El flujo consta de dos pasos:

1. **Geocodificación** → `geo/1.0/direct` para obtener coordenadas de la ciudad
2. **Clima** → `data/2.5/weather` para obtener los datos meteorológicos

## Estructura

```
src/
├── components/     # Componentes UI (Form, WeatherDetail, Alert, Spinner)
├── data/           # Datos estáticos (lista de países)
├── helpers/        # Utilidades (formateo de temperatura)
├── hooks/          # Lógica de estado y llamadas API
└── types/          # Tipos de TypeScript compartidos
```
