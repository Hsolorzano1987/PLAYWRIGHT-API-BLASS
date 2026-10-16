# PLAYWRIGHT-API-BLASS

Automatización de pruebas de API para **Blass Academy** usando [Playwright Test](https://playwright.dev/) como framework de testing, TypeScript como lenguaje y [Pino](https://getpino.io/) para el registro estructurado de logs.

---

## 📋 Tabla de contenidos

- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Cómo ejecutar los tests](#-cómo-ejecutar-los-tests)
- [Logging](#-logging)
- [Reportes](#-reportes)
- [Configuración de Playwright](#-configuración-de-playwright)
- [Buenas prácticas](#-buenas-prácticas)

---

## ✅ Requisitos previos

Antes de clonar y ejecutar el proyecto, asegurate de tener instalado:

| Herramienta | Versión recomendada | Verificar con |
|---|---|---|
| [Node.js](https://nodejs.org/) | `>= 18.x` (LTS) | `node -v` |
| [npm](https://www.npmjs.com/) | `>= 9.x` | `npm -v` |
| [Git](https://git-scm.com/) | Última versión | `git --version` |

---

## 📦 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Hsolorzano1987/PLAYWRIGHT-API-BLASS.git
   cd PLAYWRIGHT-API-BLASS
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Instalar los navegadores de Playwright** (necesario aunque sean tests de API, por si se agregan pruebas E2E)

   ```bash
   npx playwright install
   ```

---

## ⚙️ Configuración

La URL base de la API se configura en `playwright.config.ts`, dentro del proyecto **"API Tests"**:

```ts
projects: [
  {
    name: "API Tests",
    use: {
      baseURL: "https://api.blassacademy.com/"
    }
  }
]
```

Si necesitás cambiar el entorno (dev, QA, prod), modificá ese `baseURL` o parametrizalo con variables de entorno.

### Variables de entorno (opcional)

Si más adelante agregás credenciales o tokens, creá un archivo `.env` en la raíz (ya está en `.gitignore`) y descomentá el bloque de `dotenv` en `playwright.config.ts`.

---

## 🗂️ Estructura del proyecto

```
PLAYWRIGHT-API-BLASS/
├── tests/                  # Suites de pruebas (specs)
│   └── animales.spec.ts
├── utils/                  # Helpers reutilizables
│   ├── apiLogger.ts        # Logger para llamadas HTTP
│   └── logs.ts             # Configuración de Pino
├── logs/                   # Logs de ejecución (ignorado por git)
├── playwright-report/      # Reporte HTML (ignorado por git)
├── test-results/           # Resultados de tests (ignorado por git)
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

| Carpeta / Archivo | Propósito |
|---|---|
| `tests/` | Contiene los archivos `.spec.ts` con las pruebas |
| `utils/` | Funciones auxiliares: loggers, clients, validadores |
| `logs/` | Archivos de log generados en ejecución (no se versionan) |
| `playwright-report/` | Reporte HTML generado tras correr los tests |

---

## ▶️ Cómo ejecutar los tests

> **Nota:** El `package.json` actual no define scripts. Se recomienda agregar los que figuran abajo en la sección `"scripts"` para simplificar los comandos.

### Ejecutar toda la suite

```bash
npx playwright test
# o si agregaste el script:
npm test
```

### Ejecutar un archivo específico

```bash
npx playwright test tests/animales.spec.ts
```

### Ejecutar un test por nombre

```bash
npx playwright test -g "nombre del test"
```

### Modo UI (interactivo, muy útil para depurar)

```bash
npx playwright test --ui
```

### Modo debug (paso a paso con inspector)

```bash
npx playwright test --debug
```

### Ejecutar solo un proyecto

```bash
npx playwright test --project="API Tests"
```

### Ver el último reporte HTML

```bash
npx playwright show-report
```

---

## 🪵 Logging

El proyecto usa **[Pino](https://getpino.io/)** junto con **pino-pretty** para generar logs estructurados en formato JSON (ideal para CI) y legibles en consola (ideal para desarrollo local).

- `utils/logs.ts`: configuración base del logger.
- `utils/apiLogger.ts`: logger especializado para llamadas a la API (request/response, tiempos, errores).

Los archivos de log se escriben en `logs/` y **no se versionan** (están en `.gitignore`):

```
logs/
├── debugLogs.log
├── infoLogs.log
└── traceLogs.log
```

---

## 📊 Reportes

Playwright genera automáticamente un reporte HTML tras cada ejecución. Para verlo:

```bash
npx playwright show-report
```

Se abre en `http://localhost:9323` mostrando:

- Resultado por test (passed / failed / skipped)
- Trazas, screenshots y videos (si aplica)
- Tiempo de ejecución
- Errores detallados con stack trace

El reporte se guarda en `playwright-report/` (ignorado por git).

---

## 🔧 Configuración de Playwright

Resumen de la configuración actual (`playwright.config.ts`):

| Opción | Valor | Descripción |
|---|---|---|
| `testDir` | `./tests` | Carpeta donde viven los specs |
| `fullyParallel` | `true` | Tests dentro de un archivo corren en paralelo |
| `forbidOnly` | `!!process.env.CI` | Falla si hay `test.only` en CI |
| `retries` | `2` en CI, `0` local | Reintentos automáticos |
| `workers` | `1` en CI | Ejecución secuencial en CI |
| `reporter` | `html` | Reporte HTML por defecto |
| `trace` | `on-first-retry` | Guarda traza cuando un test falla y se reintenta |
| `projects` | `API Tests` | Proyecto configurado para pruebas de API |

---

## 🧭 Buenas prácticas

- **Nombres descriptivos** en los `describe` y `test` para que el reporte sea autoexplicativo.
- **No commitear** la carpeta `logs/`, `playwright-report/` ni `test-results/` (ya están en `.gitignore`).
- **Nunca subir** credenciales, tokens o `.env` al repositorio.
- **Reutilizar helpers** de `utils/` en lugar de duplicar lógica en los tests.
- **Un archivo por recurso/endpoint** (por ejemplo: `animales.spec.ts`, `usuarios.spec.ts`, etc.).
- **Ejecutar en local antes de hacer push** para asegurar que todo pasa.

---

## 👤 Autor

**Hernán Solórzano** — [@Hsolorzano1987](https://github.com/Hsolorzano1987)

---

## 📄 Licencia

ISC
