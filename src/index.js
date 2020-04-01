import express from 'express';
import { getVersion } from './getVersion';
import { generateBadge } from './generateBadge';

class VerdaccioMiddlewarePlugin {
  constructor(config, options) {
    this.config = config;
    this.debug = config.debug;
    this.registry = config.registry || `${process.env.VERDACCIO_PROTOCOL}://0.0.0.0:${process.env.VERDACCIO_PORT}`;
    this.endpoint = config.endpoint || `/-/badge/`;
    this.format = config.format || {};
  }

  log(type, msg) {
    if (this.debug) {
      console.log(`[verdaccio-badges/${type}]`, msg); // eslint-disable-line no-console
    }
  }

  register_middlewares(app, auth, storage) {
    const { registry, endpoint, config, format } = this;
    this.log('register_middlewares', JSON.stringify(config));

    const router = express.Router(); // eslint-disable-line new-cap

    router.get('/:scope?/:name.svg', async (req, res) => {
      const { scope, name } = req.params;
      this.log('get', JSON.stringify({ scope, name, registry }));

      const { version, output } = await getVersion({ scope, name, registry });
      this.log('getVersion', JSON.stringify(output));

      const svg = await generateBadge(Object.assign({}, format, { version }));
      res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
      res.end(svg);
    });

    app.use(endpoint, router);
  }
}

module.exports = (config, options) => {
  return new VerdaccioMiddlewarePlugin(config, options);
};
