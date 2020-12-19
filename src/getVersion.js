import { spawn } from 'child_process';

const getVersion = ({ scope, name, registry } = {}) =>
  new Promise(resolve => {
    const output = {};
    let version = 'undefined';
    const pkgName = scope ? `@${scope.replace('@', '')}/${name}` : name;

    if (!pkgName) {
      output['error'] = `invalid lookup: ${pkgName}`;
      resolve({ version, output });
    }

    const npm = spawn('npm', [
      'view',
      pkgName,
      'version',
      '--registry',
      registry,
      '--update-notifier',
      false,
      '--json',
    ]);

    npm.stdout.on('data', data => {
      const rawJson = `${data}`;
      const parsedJson = JSON.parse(rawJson);
      output['stdout'] = parsedJson;
      if (parsedJson.error || typeof parsedJson !== 'string') {
        version = 'undefined';
      } else {
        version = `v${parsedJson}`;
      }
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
