# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
# builder — dependencias. Base compartida por dev y por el build de producción.
# Vite 7 exige Node >=22.12, por eso la línea 22.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22.23.2-alpine3.24 AS builder
WORKDIR /app

# package* antes del código: esta capa se rearma solo si cambian las dependencias
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ─────────────────────────────────────────────────────────────────────────────
# dev — vite dev server con hot reload
# ─────────────────────────────────────────────────────────────────────────────
FROM builder AS dev

# El usuario `node` de la imagen tiene UID 1000, pero el del host es 1001.
# Sin alinearlos, todo lo que el contenedor escriba en el bind mount
# (node_modules/.vite, dist) queda con dueño equivocado.
ARG HOST_UID=1001
ARG HOST_GID=1001
RUN addgroup -g ${HOST_GID} -S appgroup \
    && adduser -u ${HOST_UID} -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 5173
# --host 0.0.0.0: sin esto vite escucha solo en localhost del contenedor
# y no lo alcanza nadie desde afuera
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ─────────────────────────────────────────────────────────────────────────────
# build — compila el bundle estático
# ─────────────────────────────────────────────────────────────────────────────
FROM builder AS build

# Vite inyecta las VITE_* en tiempo de build, no de runtime. Vacío por defecto:
# la guarda de main.jsx desactiva analytics si no hay ID.
# No es un secreto: el measurement ID viaja en el JS del cliente igual.
ARG VITE_GA_ID=""
ENV VITE_GA_ID=${VITE_GA_ID}

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# prod — solo los estáticos servidos por nginx. No hay Node en producción.
# nginx-unprivileged corre como usuario 101 y escucha en 8080 (no-root real,
# sin los parches que hay que hacerle a la imagen oficial de nginx).
# ─────────────────────────────────────────────────────────────────────────────
FROM nginxinc/nginx-unprivileged:1.31.3-alpine3.24 AS prod

COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
