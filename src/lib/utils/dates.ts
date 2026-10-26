export type Remaining =
  | { status: "invalid" }
  | { status: "started"; days: 0; hours: 0; minutes: 0; seconds: 0 }
  | { status: "counting"; days: number; hours: number; minutes: number; seconds: number };

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function partsInTimeZone(date: Date, timeZone: string): ZonedParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const map: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour) % 24,
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

/** Offset of `timeZone` at `date`, in milliseconds: local wall time interpreted as UTC, minus the instant. */
export function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = partsInTimeZone(date, timeZone);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUtc - date.getTime();
}

/**
 * Convert a calendar date and clock time in an IANA timezone to a UTC instant.
 * `date` is YYYY-MM-DD. `time` is HH:mm or HH:mm:ss.
 */
export function zonedLocalToUtc(date: string, time: string, timeZone: string): Date {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time);
  if (!dateMatch || !timeMatch) return new Date(Number.NaN);

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const second = Number(timeMatch[3] ?? 0);

  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) {
    return new Date(Number.NaN);
  }

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const offset = timeZoneOffsetMs(utcGuess, timeZone);
  const instant = new Date(utcGuess.getTime() - offset);
  const correctedOffset = timeZoneOffsetMs(instant, timeZone);
  if (correctedOffset !== offset) {
    return new Date(utcGuess.getTime() - correctedOffset);
  }
  return instant;
}

export function addCalendarDays(date: string, days: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  const utc = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
  const year = utc.getUTCFullYear();
  const month = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const day = String(utc.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function remainingTime(nowMs: number, targetMs: number): Remaining {
  if (!Number.isFinite(nowMs) || !Number.isFinite(targetMs)) return { status: "invalid" };
  const diff = targetMs - nowMs;
  if (diff <= 0) return { status: "started", days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    status: "counting",
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function formatClock(time: string): string {
  const match = /^(\d{2}):(\d{2})/.exec(time);
  if (!match) return time;
  return `${match[1]}:${match[2]}`;
}

const weekdayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Format a YYYY-MM-DD calendar date without shifting it across timezones. */
export function formatCalendarDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  const utc = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return weekdayFormatter.format(utc);
}

export function formatEventRange(startDate: string, endDate: string): string {
  const start = /^(\d{4})-(\d{2})-(\d{2})$/.exec(startDate);
  const end = /^(\d{4})-(\d{2})-(\d{2})$/.exec(endDate);
  if (!start || !end) return `${startDate} – ${endDate}`;
  const startUtc = new Date(Date.UTC(Number(start[1]), Number(start[2]) - 1, Number(start[3])));
  const endUtc = new Date(Date.UTC(Number(end[1]), Number(end[2]) - 1, Number(end[3])));
  const sameMonth = start[1] === end[1] && start[2] === end[2];
  const month = new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" }).format(startUtc);
  if (sameMonth) {
    return `${Number(start[3])}–${Number(end[3])} ${month} ${start[1]}`;
  }
  const startLabel = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(startUtc);
  const endLabel = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(endUtc);
  return `${startLabel} – ${endLabel}`;
}

export function padTwo(value: number): string {
  return String(value).padStart(2, "0");
}
