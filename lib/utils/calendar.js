import { google, outlook, office365, yahoo, ics } from "calendar-link";

export function parseEventDate(str) {
    if (!str) return null;
    const trimmed = str.trim();
    const short = trimmed.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{1,2})$/i);
    if (short) {
      const d = new Date(`${short[1]} ${short[2]}, ${new Date().getFullYear()}`);
      return isNaN(d) ? null : d;
    }
    const d = new Date(trimmed);
    return isNaN(d) ? null : d;
}

export function attachPrimaryDate(event) {
    let parsed = null;
    if (event.date?.length) {
      for (const s of event.date) {
        parsed = parseEventDate(s);
        if (parsed) break;
      }
    }
    return { ...event, _parsedDate: parsed };
}
  
export function buildGrid(year, month) {
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length < 42) cells.push(null);
    return cells;
}

export function buildCalendarLinks(event) {
  const d = event._parsedDate;
  if (!d) return null;

  const pad = (n) => String(n).padStart(2, "0");

  const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  let start = `${dateStr}T00:00:00`;
  let end;

  const calendarEvent = {
    title: event.title || "Event",
    description: [event.description, event.url && `More info: ${event.url}`]
      .filter(Boolean)
      .join("\n"),
    start,
    end,
    location: event.location || "",
  };

  return {
    google: google(calendarEvent),
    outlook: outlook(calendarEvent),
    office365: office365(calendarEvent),
    yahoo: yahoo(calendarEvent),
    ics: ics(calendarEvent),
  };
}
  
export function fmtTime(start, end) {
    return end ? `${start} – ${end}` : (start ?? "");
}
  
export function tagStyle(event, tag_styles = {}) {
  for (const [k, v] of Object.entries(tag_styles)) {
    if (
      event.title?.includes(k) ||
      event.eventType?.includes(k) ||
      event.description?.includes(k)
    ) return v;
  }
  return "bg-[#E8F4F0] text-[#113C3B]";
}