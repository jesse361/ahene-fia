import { eventConfig } from "@/config/event";
import { getSpeakersByIds } from "@/data/speakers";
import { sessionBounds, sessions } from "@/data/schedule";
import type { ScheduleSession } from "@/types/event";

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function formatUtcStamp(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

function fold(line: string): string {
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 73) {
    chunks.push(rest.slice(0, 73));
    rest = ` ${rest.slice(73)}`;
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

function eventBlock(session: ScheduleSession, stamp: string): string {
  const { start, end } = sessionBounds(session);
  const speakers = getSpeakersByIds(session.speakerIds)
    .map((speaker) => speaker.name)
    .join(", ");
  const description = [
    session.description,
    speakers ? `With ${speakers}.` : "",
    session.roomConfirmed ? session.room : `${session.room} (proposed room).`,
    "Demonstration programme for Ahene Fia. Not a confirmed booking.",
  ]
    .filter(Boolean)
    .join(" ");
  const lines = [
    "BEGIN:VEVENT",
    `UID:${session.id}@ahene-fia.demo`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatUtcStamp(start)}`,
    `DTEND:${formatUtcStamp(end)}`,
    `SUMMARY:${escapeText(session.title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(`${eventConfig.venue.name}, ${eventConfig.venue.streetAddress}, ${eventConfig.venue.city}`)}`,
    "END:VEVENT",
  ];
  return lines.map(fold).join("\r\n");
}

export function buildIcs(list: ScheduleSession[], stamp = new Date("2026-10-26T00:00:00Z")): string {
  const header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ahene Fia//Events and Conference Hub//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(eventConfig.name)}`,
    `X-WR-TIMEZONE:${eventConfig.timezone}`,
  ];
  const body = list.map((session) => eventBlock(session, formatUtcStamp(stamp)));
  return `${[...header, ...body, "END:VCALENDAR"].join("\r\n")}\r\n`;
}

export function programmeIcs(): string {
  return buildIcs(sessions);
}

export function sessionIcs(session: ScheduleSession): string {
  return buildIcs([session]);
}
