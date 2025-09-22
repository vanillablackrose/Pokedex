import { Cache } from './pokecache.js';
import { describe, expect, test } from 'vitest';

test.concurrent.each([
  {
    key: 'https://example.com',
    val: 'testdata',
    interval: 500, // 1/2 second
  },
  {
    key: 'https://example.com/path',
    val: 'moretestdata',
    interval: 1000, // 1 second
  },
  {
    key: 'https://example.com/path/another',
    val: 'stillmoretestdata',
    interval: 2000, // 1 second
  },
])('Test Caching $interval ms', async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) =>
    setTimeout(resolve, interval + 1000)
  );
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
