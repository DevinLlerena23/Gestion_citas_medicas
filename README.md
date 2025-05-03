# 🏥 Sistema de Gestión de Citas Médicas
## 🚀 Funcionalidades

- Crear, listar, y eliminar citas médicas.
- Cambiar el estado de una cita: `pendiente`, `confirmada`, `cancelada`.
- Visualizar detalles completos de cada cita.
- Interfaz responsiva con diseño limpio.
- Persistencia de datos con SQLite.
  ## ⚙️ Requisitos

- Node.js (v16 o superior)
- npm
  
 ## 🧩 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/citas-medicas.git
cd citas-medicas
```
### 2. Instalar todas las dependencias (raíz, frontend y backend) osea en Gestion_citas_medicas
```bash
npm run setup
```
Este comando instalará automáticamente:

Las dependencias del proyecto raíz 

Las dependencias del backend (`Backend/`)

Las dependencias del frontend (`medical-appointments-frontend/`)

### 3. Iniciar la aplicación (frontend + backend)
Desde la raíz del proyecto:
```bash
npm run dev
```

🔧 Iniciar cada parte individualmente (opcional)

Si prefieres iniciar por separado:
```bash
cd Backend
npm run dev
```

``` bash
cd medical-appointments-frontend
npm run dev
```




🌐 Endpoints del Backend (Express)
GET /appointments: Listar todas las citas

`POST /appointments:` Crear nueva cita

`PUT /appointments/:id:` Editar cita existente

`PATCH /appointments/:id/status:` Cambiar estado de una cita

`DELETE /appointments/:id:` Eliminar una cita

`GET /appointments/:id:` Obtener detalles de una cita
