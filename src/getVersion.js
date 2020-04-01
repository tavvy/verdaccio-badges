import { spawn } from 'child_process';

const getVersion = ({ scope, name, registry } = {}) =>
  new Promise(resolve => {
    const output = {};
    let version = 'undefined';
    const pkgName = scope ? `@${scope}/${name}` : name;

    if (!pkgName) {
      output['error'] = `invalid lookup: ${pkgName}`;
      resolve({ version, output });
    }

    const npm = spawn('npm', ['view', pkgName, 'version', '--registry', registry, '--update-notifier', false]);

    npm.stdout.on('data', data => {
      output['stdout'] = `${data}`;
      version = `v${data}`;
    });

    npm.stderr.on('data', data => {
      output['stderr'] = `${data}`;
    });

    npm.on('close', code => {
      output['close_code'] = `${code}`;
      resolve({ version, output });
    });
  });

export { getVersion };
