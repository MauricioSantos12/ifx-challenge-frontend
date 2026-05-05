# IFX Challenge - Frontend

Sistema de gestión de Máquinas Virtuales (VMs) y Usuarios construido con React, TypeScript y Chakra UI.

## Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Chakra UI** - Componentes UI
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
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
│   ├── common/          # Componentes reutilizables (ConfirmModal)
│   ├── user/            # Componentes de usuario (UserCard, UserModal)
│   ├── vm/              # Componentes de VM (VMCard, VMModal)
│   └── AnimatedSection.tsx
├── context/
│   └── AuthContext.tsx  # Estado de autenticación (user, role)
├── layout/
│   ├── AppLayout.tsx    # Layout principal (sidebar + header + footer)
│   └── Footer.tsx
├── pages/
│   ├── Dashboard.tsx    # Vista principal con stats
│   ├── Login.tsx        # Inicio de sesión
│   ├── UserList.tsx     # CRUD de usuarios
│   └── VMList.tsx       # CRUD de máquinas virtuales
├── routes/
│   ├── AdminRoute.tsx   # Protección de rutas admin
│   ├── ProtectedRoute.tsx # Protección de rutas autenticadas
│   └── index.tsx        # Configuración de rutas
├── services/
│   ├── api.ts           # Instancia de Axios
│   ├── auth.ts          # Servicio de autenticación
│   ├── user.ts          # Servicio de usuarios
│   └── vm.ts            # Servicio de VMs
├── theme/
│   └── index.ts         # Tema de Chakra UI
├── App.tsx
└── main.tsx
```

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/login` | Público | Inicio de sesión |
| `/dashboard` | Autenticado | Dashboard con estadísticas |
| `/dashboard/vms` | Autenticado | Gestión de VMs |
| `/dashboard/users` | Solo Admin | Gestión de usuarios |

## Roles

- **Admin**: Acceso completo (CRUD de VMs y usuarios)
- **Cliente**: Solo lectura de VMs, sin acceso a gestión de usuarios

## Funcionalidades

- Autenticación con cookies (`withCredentials`)
- Persistencia de sesión en localStorage
- Rutas protegidas por autenticación y rol
- CRUD completo de VMs y Usuarios via modales
- Modal de confirmación para eliminación
- Dark/Light mode
- Sidebar responsive (drawer en mobile)
- Animaciones con Framer Motion
- Validación de formularios en tiempo real
- Toast notifications (éxito/error)
- Loading skeletons
- Empty states

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

## Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@ifx.com | Admin123! |
| Cliente | cliente@ifx.com | Cliente123! |
