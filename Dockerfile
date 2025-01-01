FROM node:18-alpine AS builder

# Install OpenSSL 3
RUN apk add --no-cache \
    openssl \
    openssl-dev \
    libc6-compat

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
RUN apk add --no-cache openssl
WORKDIR /app
RUN mkdir -p prisma/
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/prisma/schema.prisma ./prisma/
COPY --from=builder /app/prisma/dev.db ./prisma/
COPY package.json ./
ENV DATABASE_URL="file:/app/prisma/dev.db"
ENV PORT=80
EXPOSE 80
CMD ["node", "build"]