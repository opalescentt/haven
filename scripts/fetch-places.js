const axios = require("axios");
const fs = require("fs");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

console.log(API_KEY);

const searchPoints = [
  { lat: 47.6062, lng: -122.3321 }, // Seattle
  { lat: 47.548, lng: -122.0534 }, // Bellevue
  { lat: 47.3809, lng: -122.2348 }, // Renton
  { lat: 47.2529, lng: -122.4443 }, // Tacoma
  { lat: 47.1854, lng: -122.2929 }, // Puyallup
  { lat: 47.4507, lng: -122.3087 }, // Burien
  { lat: 47.6588, lng: -122.078 }, // Redmond
  { lat: 47.3073, lng: -122.0794 }, // Auburn
  { lat: 47.5112, lng: -122.2571 }, // Tukwila
  { lat: 47.674, lng: -122.1215 }, // Kirkland
  { lat: 47.7107, lng: -122.3774 }, // Shoreline
  { lat: 47.8107, lng: -122.3774 }, // Mountlake Terrace
  { lat: 47.4219, lng: -122.1617 }, // Kent
  { lat: 47.3012, lng: -122.2284 }, // Federal Way
  { lat: 47.2001, lng: -122.4302 }, // Lakewood
  { lat: 47.1707, lng: -122.5159 }, // University Place
];

const searchQueries = [
  // Activities & Programs
  "things to do with kids",
  "family activities",
  "children's classes",
  "youth programs",
  "after school activities",
  "children's sports",
  "kids indoor activities",
  "family entertainment",
  // Community & Support
  "community center",
  "family resource center",
  "family services",
  "boys and girls club",
  "YMCA",
  // Places
  "park",
  "playground",
  "library",
  "place of worship",
  // Health
  "pediatric clinic",
  "child therapist",
  "urgent care",
  "pharmacy",
  // Personal Care
  "children's haircut",
  "hair salon",
  "barber shop",
  // Clothing & Essentials
  "children's clothing store",
  "thrift store",
  "shoe store",
  // Basic Needs
  "food bank",
  "grocery store",
  "laundromat",
  "WIC office",
  "social services",
];

async function searchPlaces(query, lat, lng) {
  let allResults = [];
  let pageToken = null;

  do {
    const body = {
      textQuery: query,
      locationBias: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 8000.0,
        },
      },
      maxResultCount: 20,
      ...(pageToken && { pageToken }),
    };

    const res = await axios.post(
      `https://places.googleapis.com/v1/places:searchText`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.types,places.rating,places.websiteUri,places.nationalPhoneNumber,places.regularOpeningHours,places.reviews,places.editorialSummary,nextPageToken",
        },
      },
    );

    const places = res.data.places || [];
    allResults = [...allResults, ...places];
    pageToken = res.data.nextPageToken || null;

    if (pageToken) await new Promise((r) => setTimeout(r, 2000));
  } while (pageToken);

  return allResults;
}

async function fetchAllPlaces() {
  const allPlaces = new Map();

  for (const point of searchPoints) {
    for (const query of searchQueries) {
      console.log(`Searching "${query}" near ${point.lat}, ${point.lng}`);
      try {
        const places = await searchPlaces(query, point.lat, point.lng);
        for (const place of places) {
          if (!allPlaces.has(place.id)) {
            allPlaces.set(place.id, place);
          }
        }
        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        console.error(`Error:`, err.response?.data || err.message);
      }
    }
  }

  fs.writeFileSync(
    "scripts/places.json",
    JSON.stringify([...allPlaces.values()], null, 2),
  );
  console.log(`Saved ${allPlaces.size} places to scripts/places.json`);
}

fetchAllPlaces();
