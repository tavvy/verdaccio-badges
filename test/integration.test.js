import request from 'supertest';
import mockApp from './support/mockServer';

describe('Integration e2e mounted middleware on mock server', () => {
  it(`returns 200 "vX.X.X" svg for /-/badge/verdaccio-badges.svg`, async () => {
    const app = mockApp({
      config: { registry: 'https://registry.npmjs.org', debug: false, format: { label: 'npm@latest' } },
    });
    const res = await request(app).get('/-/badge/verdaccio-badges.svg');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/svg+xml');
    const svgStr = res.body.toString();
    expect(svgStr).toContain('npm@latest</text>');
    expect(svgStr).toMatch(/\bv.*<\/text>/);
  });

  it(`returns 200 "vX.X.X" svg for /-/badge/babel/core.svg`, async () => {
    const app = mockApp({
      config: { registry: 'https://registry.npmjs.org', debug: false, format: { label: 'npm@latest' } },
    });
    const res = await request(app).get('/-/badge/babel/core.svg');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/svg+xml');
    const svgStr = res.body.toString();
    expect(svgStr).toContain('npm@latest</text>');
    expect(svgStr).toMatch(/\bv.*<\/text>/);
  });

  it(`returns 200 "vX.X.X" svg for /-/badge/@babel/core.svg`, async () => {
    const app = mockApp({
      config: { registry: 'https://registry.npmjs.org', debug: false, format: { label: 'npm@latest' } },
    });
    const res = await request(app).get('/-/badge/@babel/core.svg');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/svg+xml');
    const svgStr = res.body.toString();
    expect(svgStr).toContain('npm@latest</text>');
    expect(svgStr).toMatch(/\bv.*<\/text>/);
  });

  it(`returns 200 "undefined" svg for /-/badge/a-undefined-random-pkg-name-xyz.svg`, async () => {
    const app = mockApp({
      config: { registry: 'https://registry.npmjs.org', debug: false, format: { label: 'npm@latest' } },
    });
    const res = await request(app).get('/-/badge/a-undefined-random-pkg-name-xyz.svg');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/svg+xml');
    const svgStr = res.body.toString();
    expect(svgStr).toContain('npm@latest</text>');
    expect(svgStr).toMatch(/\bundefined<\/text>/);
  });

  it(`returns 200 "vX.X.X" svg for /-/badge/verdaccio-badges.svg with empty / default config`, async () => {
    const app = mockApp({
      config: {},
    });
    const res = await request(app).get('/-/badge/verdaccio-badges.svg');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/svg+xml');
    const svgStr = res.body.toString();
    expect(svgStr).toContain('npm</text>');
    expect(svgStr).toMatch(/\bv.*<\/text>/);
  });
});
