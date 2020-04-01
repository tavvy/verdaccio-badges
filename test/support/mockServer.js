import express from 'express';
import middleware from '../../src/index';

export default function({ config, options }) {
  const app = express();
  const plugin = middleware(config, options);
  plugin.register_middlewares(app, {}, {});
  return app;
}
