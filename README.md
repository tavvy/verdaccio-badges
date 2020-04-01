# verdaccio-badges

A verdaccio plugin to provide a version badge generator endpoint

---

## Quick start

In your verdaccio dockerfile you need to `npm install` this package and update the ownership permissions on the `~/.npm` folder. e.g

```Dockerfile
RUN npm install verdaccio-badges@x.x.x
RUN chown -R $VERDACCIO_USER_UID:root ~/.npm
```

If this is the first/only plugin you are loading check the [example](./example) Dockerfile to see how to install the dependencies requireds to `npm install`.

In your `config.yaml` file add the following configuration to `middlewares`

```yaml
middlewares:
  badges:
    enabled: true
```

Now once you restart your Verdaccio instance visit:

```text
https://your.verdaccio.url/-/badge/<NAME>.svg
https://your.verdaccio.url/-/badge/<SCOPE>/<NAME>.svg

e.g
https://0.0.0.0:4873/-/badge/myorg/my-package.svg
https://internal.npm.com/-/badge/my-package.svg
```

## Configuration

```yaml
middlewares:
  badges:
    enabled: true
    debug: true # optional - default false
    registry: 'https://npm.example.com' # optional - default https://0.0.0.0:4873
    endpoint: '/foo/' # optional - default '/-/badge/'
    format: # optional - gh-badges formatting option
      label: 'foo' # optional - default 'npm'
      color: 'red' # optional - default 'blue'
      colorLabel: 'black' # optional - default null
      template: 'social' # optional - default 'flat'
```

### registry

By default the lookup is done against the running verdaccio instance (i.e itself). This url is generated from available environment variables as per the Verdaccio startup [cmd](https://github.com/verdaccio/verdaccio/blob/master/Dockerfile#L58).

```
<VERDACCIO_PROTOCOL>://0.0.0.0:<VERDACCIO_PORT>
```

## Development

See the [verdaccio contributing guide](https://github.com/verdaccio/verdaccio/blob/master/CONTRIBUTING.md) for instructions setting up your development environment.
Once you have completed that, use the following npm tasks.

  - `npm run build`

    Build a distributable archive

  - `npm run test`

    Run unit test

  - `npm run lint`

    Run project linting

  - `npm run dev`

    Run a simple express server that loads the middleware for local development (http://localhost:300/-/badge/)
    In this mode it points directly to `https://registry.npmjs.org` by setting `config.registry`.

For more information about any of these commands run `npm run ${task} -- --help`.
