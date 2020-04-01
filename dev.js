import yaml from 'js-yaml';
import mockServer from './test/support/mockServer';

// not necessary but useful to mimic how Verdaccio integration is configured
const CONFIG_YML = `
registry: 'https://registry.npmjs.org'
debug: true
endpoint: '/-/badge/'
format:
  label: 'npm'
  color: 'red'
`;
const config = yaml.safeLoad(CONFIG_YML);

mockServer({ config }).listen(3000, () => {
  console.log(`running @ http://localhost:3000${config.endpoint}`); // eslint-disable-line no-console
});
