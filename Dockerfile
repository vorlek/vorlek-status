FROM ghcr.io/twin/gatus:stable

COPY config/config.yaml /config/config.yaml

ENV GATUS_CONFIG_PATH=/config/config.yaml

EXPOSE 8080
