type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): { ok: boolean; retryAfterSeconds: number } {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }
  if (current.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}

type MemoryRecord<T> = { value: T; expiresAt: number };

const memory = new Map<string, MemoryRecord<unknown>>();

export function remember<T>(key: string, value: T, ttlMs: number, now = Date.now()): void {
  memory.set(key, { value, expiresAt: now + ttlMs });
}

export function recall<T>(key: string, now = Date.now()): T | undefined {
  const record = memory.get(key);
  if (!record) return undefined;
  if (record.expiresAt <= now) {
    memory.delete(key);
    return undefined;
  }
  return record.value as T;
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
