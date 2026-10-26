import { eventConfig } from "@/config/event";
import { getSpeakersByIds } from "@/data/speakers";
import { addCalendarDays, zonedLocalToUtc } from "@/lib/utils/dates";
import type { ScheduleSession } from "@/types/event";

export const scheduleDays = [
  { id: "day-1" as const, date: eventConfig.startDate, label: "Day 1" },
  { id: "day-2" as const, date: eventConfig.endDate, label: "Day 2" },
];

export const scheduleFilters = ["All", "Keynote", "Conversation", "Workshop", "Networking"] as const;
export type ScheduleFilter = (typeof scheduleFilters)[number];

export const sessions: ScheduleSession[] = [
  {
    id: "arrival-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "08:30",
    end: "09:15",
    title: "Arrival and registration",
    description: "Doors open. Collect your badge and find the room with time to spare.",
    kind: "arrival",
    category: "Arrival",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "welcome-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "09:15",
    end: "09:30",
    title: "Words of welcome",
    description: "A short opening that sets the tone for the two days. No keynote claims, no manufactured urgency.",
    kind: "session",
    category: "Conversation",
    speakerIds: [],
    host: "Programme host",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "keynote-ama",
    dayId: "day-1",
    date: "2027-10-16",
    start: "09:30",
    end: "10:20",
    title: "The next chapter of African enterprise",
    description: "A keynote on judgment, succession, and what ambitious institutions owe the people who trust them.",
    kind: "keynote",
    category: "Keynote",
    speakerIds: ["ama-serwaa-mensah"],
    host: "Ama Serwaa Mensah",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "tea-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "10:20",
    end: "10:50",
    title: "Tea and conversation",
    description: "A paced break. The programme treats conversation between sessions as part of the design.",
    kind: "break",
    category: "Break",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "kwame-companies",
    dayId: "day-1",
    date: "2027-10-16",
    start: "10:50",
    end: "11:40",
    title: "Building companies that outlast the launch",
    description: "An operating session on cash, customers, and the work that begins after the announcement.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["kwame-boateng"],
    host: "Kwame Boateng",
    room: "Committee Hall",
    roomConfirmed: false,
  },
  {
    id: "naa-design",
    dayId: "day-1",
    date: "2027-10-16",
    start: "10:50",
    end: "11:40",
    title: "Design as a leadership practice",
    description: "How identity, hospitality, and visual judgment shape the way a company is received.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["naa-lamiley-okai"],
    host: "Naa Lamiley Okai",
    room: "Meeting Room",
    roomConfirmed: false,
  },
  {
    id: "idris-public",
    dayId: "day-1",
    date: "2027-10-16",
    start: "11:50",
    end: "12:40",
    title: "Tools that serve the public",
    description: "A technology conversation about usefulness, maintenance, and saying no to tools a team cannot keep.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["idris-owusu"],
    host: "Idris Owusu",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "lunch-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "12:40",
    end: "14:00",
    title: "Lunch and open networking",
    description: "A long midday pause. Seating is open. No hosted introductions are promised.",
    kind: "networking",
    category: "Networking",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "efua-pressure",
    dayId: "day-1",
    date: "2027-10-16",
    start: "14:00",
    end: "14:50",
    title: "Decisions under pressure",
    description: "A leadership studio on dissent, silence, and recovering judgment when a room is tense.",
    kind: "session",
    category: "Workshop",
    speakerIds: ["efua-darko"],
    host: "Efua Darko",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "clinic-founders",
    dayId: "day-1",
    date: "2027-10-16",
    start: "15:00",
    end: "15:50",
    title: "The entrepreneurship clinic",
    description: "A practical clinic on the first repeatable offer, and on partnerships that are willing to stay.",
    kind: "session",
    category: "Workshop",
    speakerIds: ["abena-nyarko", "adwoa-quaye"],
    host: "Abena Nyarko and Adwoa Quaye",
    room: "Committee Hall",
    roomConfirmed: false,
  },
  {
    id: "pause-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "15:50",
    end: "16:10",
    title: "Afternoon pause",
    description: "A short break before the late session.",
    kind: "break",
    category: "Break",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "kojo-stories",
    dayId: "day-1",
    date: "2027-10-16",
    start: "16:10",
    end: "17:00",
    title: "Stories that carry a company",
    description: "On reputation, images, and institutional memory that a team can actually keep.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["kojo-asante"],
    host: "Kojo Asante",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "reception-day-1",
    dayId: "day-1",
    date: "2027-10-16",
    start: "17:00",
    end: "18:30",
    title: "Evening reception",
    description: "An informal close to the first day. Refreshments are proposed and not yet confirmed with a caterer.",
    kind: "networking",
    category: "Networking",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Reception space",
    roomConfirmed: false,
  },
  {
    id: "arrival-day-2",
    dayId: "day-2",
    date: "2027-10-17",
    start: "08:45",
    end: "09:20",
    title: "Morning arrival",
    description: "Doors reopen. A quieter start to the second day.",
    kind: "arrival",
    category: "Arrival",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "keynote-adwoa",
    dayId: "day-2",
    date: "2027-10-17",
    start: "09:20",
    end: "10:10",
    title: "What we build when we stay",
    description: "A featured conversation on capital, craft, and the discipline of remaining with a problem.",
    kind: "keynote",
    category: "Keynote",
    speakerIds: ["adwoa-quaye"],
    host: "Adwoa Quaye",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "tea-day-2",
    dayId: "day-2",
    date: "2027-10-17",
    start: "10:10",
    end: "10:40",
    title: "Morning tea",
    description: "A break between the opening conversation and the late-morning sessions.",
    kind: "break",
    category: "Break",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "abena-system",
    dayId: "day-2",
    date: "2027-10-17",
    start: "10:40",
    end: "11:30",
    title: "From first customer to first system",
    description: "A workshop on offers, promises, and the small systems that make a venture repeatable.",
    kind: "session",
    category: "Workshop",
    speakerIds: ["abena-nyarko"],
    host: "Abena Nyarko",
    room: "Meeting Room",
    roomConfirmed: false,
  },
  {
    id: "kojo-room",
    dayId: "day-2",
    date: "2027-10-17",
    start: "10:40",
    end: "11:30",
    title: "A room that remembers",
    description: "How gatherings, archives, and images give a company a memory longer than a campaign.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["kojo-asante"],
    host: "Kojo Asante",
    room: "Committee Hall",
    roomConfirmed: false,
  },
  {
    id: "care-plenary",
    dayId: "day-2",
    date: "2027-10-17",
    start: "11:40",
    end: "12:30",
    title: "Care is an operating system",
    description: "A shared conversation on hospitality, design, and leadership as daily practice rather than posture.",
    kind: "session",
    category: "Conversation",
    speakerIds: ["efua-darko", "naa-lamiley-okai"],
    host: "Efua Darko and Naa Lamiley Okai",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "lunch-day-2",
    dayId: "day-2",
    date: "2027-10-17",
    start: "12:30",
    end: "13:40",
    title: "Lunch and open networking",
    description: "Midday pause. Dietary needs shared at registration will be noted, not guaranteed, until a caterer is confirmed.",
    kind: "networking",
    category: "Networking",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
  {
    id: "idris-maintain",
    dayId: "day-2",
    date: "2027-10-17",
    start: "13:40",
    end: "14:30",
    title: "Choosing technology you can maintain",
    description: "A workshop for teams deciding what to adopt, what to refuse, and what they can still explain later.",
    kind: "session",
    category: "Workshop",
    speakerIds: ["idris-owusu"],
    host: "Idris Owusu",
    room: "Meeting Room",
    roomConfirmed: false,
  },
  {
    id: "closing-assembly",
    dayId: "day-2",
    date: "2027-10-17",
    start: "14:40",
    end: "15:30",
    title: "The work after the room",
    description: "A closing assembly on what should travel home with guests, and what should be left behind.",
    kind: "keynote",
    category: "Keynote",
    speakerIds: ["ama-serwaa-mensah", "kwame-boateng"],
    host: "Ama Serwaa Mensah and Kwame Boateng",
    room: "Plenary Hall",
    roomConfirmed: false,
  },
  {
    id: "farewell",
    dayId: "day-2",
    date: "2027-10-17",
    start: "15:30",
    end: "16:00",
    title: "Farewell",
    description: "The gathering closes. Guests are welcome to linger briefly in the foyer.",
    kind: "networking",
    category: "Networking",
    speakerIds: [],
    host: "Ahene Fia team",
    room: "Foyer",
    roomConfirmed: false,
  },
];

export function sessionBounds(session: ScheduleSession): { start: Date; end: Date } {
  const endDate = session.crossesMidnight ? addCalendarDays(session.date, 1) : session.date;
  return {
    start: zonedLocalToUtc(session.date, session.start, eventConfig.timezone),
    end: zonedLocalToUtc(endDate, session.end, eventConfig.timezone),
  };
}

export function validateSchedule(list: ScheduleSession[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const session of list) {
    if (ids.has(session.id)) errors.push(`Duplicate session id: ${session.id}`);
    ids.add(session.id);
    const { start, end } = sessionBounds(session);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      errors.push(`Invalid time for ${session.id}`);
      continue;
    }
    if (end.getTime() <= start.getTime()) {
      errors.push(`End must be after start for ${session.id}`);
    }
    const day = scheduleDays.find((item) => item.id === session.dayId);
    if (!day || day.date !== session.date) {
      errors.push(`Day mismatch for ${session.id}`);
    }
    if (getSpeakersByIds(session.speakerIds).length !== session.speakerIds.length) {
      errors.push(`Unknown speaker on ${session.id}`);
    }
  }
  return errors;
}

export function sessionsForDay(dayId: ScheduleSession["dayId"]): ScheduleSession[] {
  return sessions
    .filter((session) => session.dayId === dayId)
    .sort((a, b) => {
      const startDelta = a.start.localeCompare(b.start);
      if (startDelta !== 0) return startDelta;
      return a.title.localeCompare(b.title);
    });
}

export function previewSessions(limit = 5): ScheduleSession[] {
  return sessionsForDay("day-1").filter((session) => session.kind !== "arrival").slice(0, limit);
}

export function getSession(id: string): ScheduleSession | undefined {
  return sessions.find((session) => session.id === id);
}

const scheduleErrors = validateSchedule(sessions);
if (scheduleErrors.length > 0) {
  throw new Error(`Schedule data is invalid:\n${scheduleErrors.join("\n")}`);
}
