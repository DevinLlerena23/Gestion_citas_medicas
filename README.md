# 🏥 Sistema de Gestión de Citas Médicas
## 🚀 Funcionalidades

- Crear, listar, editar y eliminar citas médicas.
- Cambiar el estado de una cita: `pendiente`, `confirmada`, `cancelada`.
- Visualizar detalles completos de cada cita.
- Validaciones en formulario y backend.
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
### 2. Instalar dependencias del backend
```bash
cd server
npm install
```
## 3. Instalar dependencias del frontend
``` bash
cd medical-appointments-frontend
npm install
```
## 4. Para iniciar el frontend como el backen desde su carpeta raiz de forma individual
``` bash
npm run dev
```
## 5. Para iniciar el frontend como el backen al mismo tiempo desde la carpeta principal que contiene al backend como el fronted
``` bash
npm run dev
```




🌐 Endpoints del Backend (Express)
GET /appointments: Listar todas las citas

`POST /appointments:` Crear nueva cita

`PUT /appointments/:id:` Editar cita existente

`PATCH /appointments/:id/status:` Cambiar estado de una cita

`DELETE /appointments/:id:` Eliminar una cita

`GET /appointments/:id:` Obtener detalles de una cita
