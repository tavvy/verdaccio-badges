FROM verdaccio/verdaccio:4

USER root

ENV NODE_ENV=production

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && npm install verdaccio-badges@0.4.0 \
    && apk del build-dependencies

RUN chown -R $VERDACCIO_USER_UID:root ~/.npm

USER verdaccio
