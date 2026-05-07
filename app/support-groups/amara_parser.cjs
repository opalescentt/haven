// For Amara Website

// For Amara Website — https://amarafamily.org/get-involved/events-trainings/

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
    .replace(/\u00a0/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

const parseMetaData = (metaText) => {
  // e.g. "9:00 am – 11:00 am | Online Training" or "5:00 pm – 7:00 pm"
  const [timePart, locationPart] = metaText.split("|").map((s) => s.trim());

  const timeMatch = timePart.match(
    /(\d{1,2}:\d{2}\s*(?:am|pm))\s*[-–]\s*(\d{1,2}:\d{2}\s*(?:am|pm))/i,
  );

  return {
    timeStart: timeMatch ? normalizeText(timeMatch[1]) : null,
    timeEnd: timeMatch ? normalizeText(timeMatch[2]) : null,
    location: locationPart ? normalizeText(locationPart) : null,
  };
};

(async () => {
  const html = await fetch(
    "https://amarafamily.org/get-involved/events-trainings/",
  ).then((r) => r.text());
  const { document } = new JSDOM(html).window;

  const eventCards = document.querySelectorAll(".event-card");

  const events = [...eventCards]
    .map((card) => {
      const link = card.querySelector("a");
      const url =
        link?.href ?? "https://amarafamily.org/get-involved/events-trainings/";

      const title = normalizeText(card.querySelector("h3")?.textContent);
      const dateText = normalizeText(card.querySelector(".date")?.textContent);
      const metaText = normalizeText(
        card.querySelector(".meta-data")?.textContent,
      );
      const description = normalizeText(
        card.querySelector(".excerpt")?.textContent,
      );
      const eventType = normalizeText(
        card.querySelector(".event-type")?.textContent,
      );

      const { timeStart, timeEnd, location } = parseMetaData(metaText);

      return {
        title,
        description,
        format: location?.toLowerCase().includes("online")
          ? "online"
          : "in-person",
        eventType,
        location,
        speaker: null,
        rsvp: null,
        date: dateText ? [dateText] : [],
        timeStart,
        timeEnd,
        url,
      };
    })
    .filter((e) => e.title);

  await mongoose.connect(process.env.MONGODB_URI);
  await Event.deleteMany({ url: /amarafamily\.org/ });
  await Event.insertMany(events);
  console.log(`Seeded ${events.length} Amara events.`);
  await mongoose.disconnect();
})();
