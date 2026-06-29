FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
COPY packages/ui/package.json packages/ui/
COPY storybook/package.json storybook/

RUN npm ci --ignore-scripts

COPY packages/ui/ packages/ui/
COPY storybook/ storybook/

RUN npm run build:storybook

FROM nginx:1.27-alpine

COPY storybook/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/storybook/storybook-static /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
