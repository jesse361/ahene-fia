import { getSession, sessions } from "@/data/schedule";
import { buildIcs } from "@/lib/utils/ics";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session");
  const session = sessionId ? getSession(sessionId) : undefined;
  if (sessionId && !session) {
    return new Response("That session is not on the programme.", { status: 404 });
  }
  const list = session ? [session] : sessions;
  const filename = session ? `${session.id}.ics` : "ahene-fia-leadership-summit-2027.ics";
  return new Response(buildIcs(list), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
