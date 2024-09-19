FROM node:18-alpine as build
WORKDIR /app

ARG SENTRY_AUTH_TOKEN
ARG REACT_APP_MEDIA_BASE_URL
ARG REACT_APP_CMS_URL
ARG REACT_APP_PMS_URL
ARG REACT_APP_WMS_URL
ARG REACT_APP_IMS_URL
ARG REACT_APP_SENTRY_DNS
ARG REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID
ARG REACT_APP_GTM_ID
ARG REACT_APP_CLARITY_TOKEN
ARG REACT_APP_GOFTINO_TOKEN
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_APPLICATION_ID
ARG REACT_APP_JAVASCRIPT_KEY
ARG REACT_APP_METABASE_SITE_URL
ARG REACT_APP_METABASE_SECRET_KEY


COPY ./package.json ./
RUN yarn
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN yarn build

FROM nginx:alpine as production
ENV SERVER_NAME = _
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
COPY ./nginx.conf.template /etc/nginx/templates/
COPY --from=build /app/build /var/www/public
