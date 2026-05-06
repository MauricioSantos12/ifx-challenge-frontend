# IFX Challenge - Frontend

Sistema de gestión de Máquinas Virtuales (VMs) y Usuarios construido con React, TypeScript y Chakra UI, con actualizaciones en tiempo real via WebSocket.

## Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Chakra UI** - Componentes UI
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Socket.IO Client** - Comunicación en tiempo real
- **Chart.js** + **react-chartjs-2** - Gráficas
- **Framer Motion** - Animaciones
- **React Icons** - Iconografía

## Requisitos Previos

- Node.js >= 18
- npm o yarn
- Backend corriendo en `http://localhost:4000`

## Instalación

```bash
git clone <repo-url>
cd ifx-challenge-frontend
npm install
```

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BACKEND_URL=http://localhost:4000
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/              # Componentes reutilizables
│   │   ├── AnimatedSection.tsx   # Wrapper de animación (fade-in)
│   │   ├── CardSkeleton.tsx      # Skeleton loading para cards
│   │   ├── ConfirmModal.tsx      # Modal de confirmación para eliminar
│   │   ├── DoughnutChart.tsx     # Gráfica de dona reutilizable
│   │   └── StatCard.tsx          # Card de estadística
│   ├── user/                # Componentes de usuario
│   │   ├── UserCard.tsx          # Card de usuario
│   │   └── UserModal.tsx         # Modal crear/editar usuario
│   └── vm/                  # Componentes de VM
│       ├── VMCard.tsx            # Card de VM
│       └── VMModal.tsx           # Modal crear/editar VM
├── context/
│   └── AuthContext.tsx      # Estado de autenticación (user, role, localStorage)
├── layout/
│   ├── AppLayout.tsx        # Layout privado (sidebar + header + footer)
│   ├── Footer.tsx           # Footer reutilizable
│   └── Header.tsx           # Header público
├── pages/
│   ├── Dashboard.tsx        # Stats + gráficas de recursos
│   ├── Login.tsx            # Inicio de sesión (split layout)
│   ├── PublicVMList.tsx     # Vista pública de VMs (tiempo real)
│   ├── UserList.tsx         # CRUD de usuarios
│   └── VMList.tsx           # CRUD de máquinas virtuales
├── routes/
│   ├── AdminRoute.tsx       # Protección de rutas admin
│   ├── ProtectedRoute.tsx   # Protección de rutas autenticadas
│   └── index.tsx            # Configuración de rutas
├── services/
│   ├── api.ts               # Instancia de Axios (withCredentials)
│   ├── auth.ts              # Servicio de autenticación
│   ├── socket.ts            # Instancia de Socket.IO
│   ├── user.ts              # Servicio de usuarios
│   └── vm.ts                # Servicio de VMs
├── theme/
│   └── index.ts             # Tema de Chakra UI (dark/light mode)
├── App.tsx
└── main.tsx
```

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/vms` | Público | Lista de VMs con actualización en tiempo real |
| `/login` | Público | Inicio de sesión |
| `/dashboard` | Autenticado | Dashboard con estadísticas y gráficas |
| `/dashboard/vms` | Autenticado | Gestión de VMs (CRUD) |
| `/dashboard/users` | Solo Admin | Gestión de usuarios (CRUD) |

## Roles

- **Admin**: Acceso completo (CRUD de VMs y usuarios, estadísticas completas)
- **Cliente**: Solo lectura de VMs, sin acceso a gestión de usuarios

## Funcionalidades

### Autenticación
- Login con cookies (`withCredentials`)
- Persistencia de sesión en localStorage
- Rutas protegidas por autenticación y rol
- Redirección automática según estado de auth

### CRUD
- Crear, editar y eliminar VMs y Usuarios via modales
- Modal de confirmación para eliminación
- Validación de formularios en tiempo real
- Toast notifications (éxito/error)

### Tiempo Real (WebSocket)
- Vista pública `/vms` con actualizaciones en tiempo real via Socket.IO
- Eventos escuchados:
  - `vm:created` — agrega VM a la lista (toast verde)
  - `vm:updated` — actualiza VM en la lista (toast azul)
  - `vm:deleted` — remueve VM de la lista (toast amarillo)

### Dashboard
- Cards con estadísticas (total VMs, VMs activas, cores, usuarios)
- Gráficas de dona (Doughnut) mostrando recursos activos vs totales:
  - Cores
  - RAM (GB)
  - Disco (GB)

### UX
- Dark/Light mode (toggle en header)
- Sidebar responsive (drawer en mobile)
- Animaciones con Framer Motion
- Loading skeletons
- Empty states
- Componentes reutilizables (StatCard, CardSkeleton, DoughnutChart, ConfirmModal)

## API Endpoints Consumidos

```
POST   /api/v1/login        # Iniciar sesión
GET    /api/v1/vms          # Listar VMs
POST   /api/v1/vms          # Crear VM
PUT    /api/v1/vms/:id      # Actualizar VM
DELETE /api/v1/vms/:id      # Eliminar VM
GET    /api/v1/users        # Listar usuarios
POST   /api/v1/users        # Crear usuario
PUT    /api/v1/users/:id    # Actualizar usuario
DELETE /api/v1/users/:id    # Eliminar usuario
```

## WebSocket Events

```
vm:created  → { id, name, cores, ram, disk, os, status }
vm:updated  → { id, name, cores, ram, disk, os, status }
vm:deleted  → { id }
```

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@ifx.com | Admin123! |
| Cliente | cliente@ifx.com | Cliente123! |

## Modelo de IA Utilizado

Este proyecto fue desarrollado con asistencia de **Amazon Q Developer**, un asistente de IA de AWS integrado en el IDE.

### Uso del modelo:
- **Arquitectura del proyecto** — Definición de la estructura de carpetas, separación de responsabilidades y patrones de diseño (context, services, routes)
- **Generación de componentes** — Creación de componentes reutilizables (DoughnutChart, AnimatedSection)
- **Gráficas** — Integración de Chart.js con componente reutilizable de dona
- **Gestión de estado** — Implementación del AuthContext con persistencia en localStorage
- **Protección de rutas** — ProtectedRoute y AdminRoute con redirecciones según rol
- **Integración de servicios** — Configuración de Axios con interceptores, Socket.IO client, y servicios CRUD
- **Tiempo real** — Integración de Socket.IO para actualizaciones en vivo con manejo correcto de listeners