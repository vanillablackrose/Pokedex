import { setInterval } from 'node:timers';
export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        let cacheEntry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, cacheEntry);
    }
    get(key) {
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
