import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addCalendarDays, remainingTime, zonedLocalToUtc } from "./dates.ts";
import { buildIcs } from "./ics.ts";
import type { ScheduleSession } from "../../types/event.ts";

describe("countdown", () => {
  it("counts whole units without going negative", () => {
    const target = Date.parse("2027-10-16T08:30:00Z");
    const now = target - ((2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000);
    const result = remainingTime(now, target);
    assert.equal(result.status, "counting");
    if (result.status !== "counting") return;
    assert.equal(result.days, 2);
    assert.equal(result.hours, 3);
    assert.equal(result.minutes, 4);
    assert.equal(result.seconds, 5);
  });

  it("shows a started state at zero and beyond", () => {
    assert.equal(remainingTime(10, 10).status, "started");
    assert.equal(remainingTime(11, 10).status, "started");
  });

  it("rejects an invalid target", () => {
    assert.equal(remainingTime(0, Number.NaN).status, "invalid");
  });
});

describe("timezone", () => {
  it("treats Africa/Accra as UTC+0", () => {
    const instant = zonedLocalToUtc("2027-10-16", "08:30", "Africa/Accra");
    assert.equal(instant.toISOString(), "2027-10-16T08:30:00.000Z");
  });

  it("moves an end time to the next calendar day when asked", () => {
    assert.equal(addCalendarDays("2027-10-16", 1), "2027-10-17");
  });
});

describe("calendar", () => {
  it("builds an ICS event from session data", () => {
    const session: ScheduleSession = {
      id: "sample-session",
      dayId: "day-1",
      date: "2027-10-16",
      start: "09:30",
      end: "10:20",
      title: "Sample, with a comma",
      description: "A line.",
      kind: "keynote",
      category: "Keynote",
      speakerIds: [],
      host: "Host",
      room: "Plenary Hall",
      roomConfirmed: false,
    };
    const ics = buildIcs([session]);
    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /DTSTART:20271016T093000Z/);
    assert.match(ics, /DTEND:20271016T102000Z/);
    assert.match(ics, /Sample\\, with a comma/);
  });
});
