// Notes about the page
// Headings have 'data-widget_type = 'heading-default'
// Text has 'data-widget_type = 'text-editor.default'

require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const { JSDOM } = require("jsdom");
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  format: String,
  eventType: String,
  location: String,
  speaker: String,
  rsvp: String,
  date: [String],
  timeStart: String,
  timeEnd: String,
  url: String,
  updatedAt: { type: Date, default: Date.now },
});
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

/* Helper Functions */
const normalizeText = (str) => {
  return (str ?? "")
    .normalize("NFKC")
    .replace(/\u00a0/g, " ") // non-breaking space -> space
    .replace(/[–—]/g, "-") // en/em dash -> hyphen
    .replace(/[“”]/g, '"') // curly double quotes -> straight
    .replace(/[‘’]/g, "'") // curly single quotes -> straight
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
};

const extractTime = (text) => {
  // Handles "7-9 p.m.", "6:30-8:30 p.m.", and single times like "2 p.m."
  const m = text.match(
    /(\d{1,2}(?::\d{2})?)(?:\s*-\s*(\d{1,2}(?::\d{2})?))?\s*(a\.m\.|p\.m\.)?/i,
  );
  if (!m) return { timeStart: null, timeEnd: null };

  const meridiem = m[3] ? m[3].toLowerCase() : "";
  const start = m[1] ? `${m[1]}${meridiem ? " " + meridiem : ""}` : null;
  const end = m[2] ? `${m[2]}${meridiem ? " " + meridiem : ""}` : null;

  return { timeStart: start, timeEnd: end };
};

const extractDates = (text) => {
  // Find month token (e.g., "Mar." or "Mar")
  const monthMatch = text.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\b/i,
  );
  if (!monthMatch) return [];
  const month = monthMatch[1];

  // Grab everything after that month token
  const tail = text.slice(text.indexOf(monthMatch[0]) + monthMatch[0].length);
  // Collect all day numbers (handles "4, 11, & 18", "16", etc.)
  const days = [...tail.matchAll(/\b(\d{1,2})\b/g)].map((m) => m[1]);

  return days.map((d) => `${month} ${d}`);
};

(async () => {
  /* Parsing */

  // Fetching HTML
  const [html, tsgHtml] = await Promise.all([
    fetch("https://alliancecares.org/newsletter/").then((r) => r.text()),
    fetch("https://alliancecares.org/support-groups/").then((r) => r.text()),
  ]);
  const { document } = new JSDOM(html).window;

  // Loading TSG page for TSG descriptions
  const tsgDocument = new JSDOM(tsgHtml).window.document;
  const tsgDescMap = {};
  tsgDocument.querySelectorAll(".elementor-tab-content p").forEach((p) => {
    const link = p.querySelector("a[href*='exceedlms.com']");
    if (!link) return;
    const idMatch = link.href.match(/\/(\d+)-/);
    if (!idMatch) return;
    tsgDescMap[idMatch[1]] = normalizeText(p.textContent).replace(
      /^[^:]*:\s*/,
      "",
    );
  });

  // All Widgets (for identifying headings)
  const allWidgets = document.querySelectorAll("[data-widget_type]");

  // All Text Widgets
  const allText = document.querySelectorAll(
    '[data-widget_type="text-editor.default"]',
  );

  /* Topic Support Groups */

  // Getting Relevant Events
  const tsgSection = [...allText].find(
    (w) => w.textContent.includes("Topic Support Groups (TSGs)"), // save the first div that has "Topic Support Groups (TSGs)"
  );
  const rawTSGEvents = tsgSection.querySelectorAll("ul > li"); // get the items in the list under TSGs
  const tsgEvents = [...rawTSGEvents].filter((w) =>
    w.textContent.includes("TSG:"),
  ); // select only TSGs

  // Converting to json

  const tsgjson = tsgEvents.map((item) => {
    const rawText = item.textContent;
    const link = item.querySelector("a");
    const time = extractTime(rawText);
    const date = extractDates(rawText);

    // description matching
    const idMatch = link?.href.match(/\/(\d+)-/);
    const description = idMatch ? (tsgDescMap[idMatch[1]] ?? null) : null;

    if (link) {
      return {
        title: link.textContent ? normalizeText(link.textContent) : null,
        description: description,
        format: "online",
        eventType: "TSG",
        location: null,
        speaker: null,
        date: date,
        timeStart: time.timeStart ? time.timeStart : null,
        timeEnd: time.timeEnd ? time.timeEnd : null,
        url: link.href ? link.href : "https://alliancecares.org/newsletter/",
      };
    }
  });

  /* Special Events */
  // Get this section by using indexing to pull the section that starts with
  // 'Statewide Online Events' (h2) and ends with 'Region 1'

  // Getting Relevant Events
  // allWidgets since headings don't have text-editor-default so can't use allText

  const statewideStart = [...allWidgets].findIndex((w) =>
    w.querySelector("h2")?.textContent.includes("Statewide Online Events"),
  );

  const statewideEnd = [...allWidgets].findIndex((w) =>
    w.textContent.includes("Region 1"),
  );

  const specialSection = [...allWidgets].slice(
    statewideStart + 1,
    statewideEnd - 1,
  );

  // At this point, use italicized 'When:' as a baseline to identify events, and get other
  // values using previousElementSibling and nextElementSibling

  let specialWhenTags = specialSection
    .flatMap((w) => [...w.querySelectorAll("i")])
    .filter((i) => i.textContent.trim().startsWith("When"));

  const specialEvents = specialWhenTags.map((whenTag) => {
    const whenDiv = whenTag.parentElement; // when div as the basis
    const titleDiv = whenDiv.previousElementSibling; // title is before when
    const speakerDiv = whenDiv.nextElementSibling; // speaker is after when
    const descDiv = speakerDiv?.nextElementSibling; // desc is after speaker

    const link = titleDiv?.querySelector("a");
    const whenText = normalizeText(whenDiv.textContent)
      .replace(/^when:/i, "") // not case sensitive
      .trim();
    const speakerText = normalizeText(speakerDiv?.textContent)
      .replace(/^(speaker|reader):/i, "") // not case sensitive
      .trim();

    return {
      title: link
        ? normalizeText(link.textContent)
        : normalizeText(titleDiv?.textContent),
      description: normalizeText(descDiv?.textContent) || null,
      format: "online",
      eventType: "Special Event",
      speaker: speakerText || null,
      date: extractDates(whenText),
      timeStart: extractTime(whenText).timeStart,
      timeEnd: extractTime(whenText).timeEnd,
      url: link?.href ?? "https://alliancecares.org/newsletter/",
    };
  });

  /* Regional Events */
  // Similar approach to above, we start with 'Region 1' (h2) and go to the end of the page

  const regionalStart = [...allWidgets].findIndex((w) =>
    w.querySelector("h2")?.textContent.includes("Region 1"),
  );

  const regionalSection = [...allWidgets].slice(
    regionalStart,
    allWidgets.length,
  );

  // All events are wrapped in their own <p>, and another <p> for description
  // Get all p elements that have an italicized 'When' within them
  let regionalPTags = regionalSection
    .flatMap((w) => [...w.querySelectorAll("p")])
    .filter((p) => p.querySelector("i")?.textContent.trim().startsWith("When"));

  const regionalEvents = regionalPTags.map((p) => {
    const pText = normalizeText(p.textContent);
    const title = normalizeText(p.querySelector("b")?.textContent);

    // Regional Section doesn't have as good DOM structuring,
    // so instead we use regex to extract the values
    const whenText = normalizeText(
      pText.match(/when\s*:\s*(.+?)(?=\s*where\s*:|$)/i)?.[1] ?? "",
    );
    const whereText = normalizeText(
      pText.match(/where\s*:\s*(.+?)(?=\s*rsvp\s*:|$)/i)?.[1] ?? "",
    );
    const rsvpText = normalizeText(pText.match(/rsvp\s*:\s*(.+)/i)?.[1] ?? "");

    const description = !p.nextElementSibling?.querySelector("b") // if sibling isn't bold (next event's heading)
      ? normalizeText(p.nextElementSibling?.textContent) || null // save text content
      : null;

    return {
      title: title,
      description: description,
      format: "in-person",
      eventType: "Regional Event",
      location: whereText,
      rsvp: rsvpText,
      date: extractDates(whenText),
      timeStart: extractTime(whenText).timeStart,
      timeEnd: extractTime(whenText).timeEnd,
      url: "https://alliancecares.org/newsletter/",
    };
  });

  /* Save to MongoDB */

  const allEvents = [
    ...(tsgjson ?? []),
    ...(specialEvents ?? []),
    ...(regionalEvents ?? []),
  ].filter(Boolean);

  await mongoose.connect(process.env.MONGODB_URI);
  await Event.deleteMany({});
  await Event.insertMany(allEvents);
  console.log(`Seeded ${allEvents.length} events.`);
  await mongoose.disconnect();
})();
