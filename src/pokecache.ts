import { setInterval } from 'node:timers';

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | number | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    let cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };

    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string): T | undefined {
    let cacheEntry = this.#cache.get(key);

    if (!cacheEntry) {
      return undefined;
    }
    return cacheEntry.val;
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
