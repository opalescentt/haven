from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import pipeline
import os
import json

load_dotenv("../.env")

# MongoDB Connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["test"]
collection = db["places"]
print("Connected to MongoDB!")

# Load in ZSC
classifier = pipeline("zero-shot-classification", model="valhalla/distilbart-mnli-12-3")9
print("Model loaded!")

# Load places
script_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(script_dir, "../scripts/places.json"), "r") as f:
    places = json.load(f)

print(f"Loaded {len(places)} places!")

all_places = []
for i, place in enumerate(places[:5]):
    string = []
    string.append(place.get("displayName", {}).get("text", ""))
    string.append(" ".join(place.get("types", [])))
    string.append(" ".join([r["text"]["text"] for r in place.get("reviews", []) if r.get("text")]))
    all_places.append(" ".join(filter(None, string)))

labels = [
    # Activities & Programs
    "children's classes and programs",
    "after school activities",
    "youth sports and recreation",
    "family entertainment",
    # Community & Support
    "community center",
    "family resource and support services",
    "youth organization",
    # Places
    "park or playground",
    "public library",
    "place of worship",
    # Health
    "pediatric or children's health",
    "mental health and therapy",
    "urgent care or pharmacy",
    # Personal Care
    "children's haircut or salon",
    # Clothing & Essentials
    "children's clothing",
    "thrift store or secondhand shop",
    # Basic Needs
    "food bank or food assistance",
    "grocery store",
    "laundromat",
    "WIC or government assistance",
    "social services",
    
    # Creative
    "arts and crafts",
    "music and singing",
    "dance",
    "theater and performance",
    "photography and media",

    # Physical
    "sports and athletics",
    "swimming",
    "martial arts",
    "yoga and movement",
    "outdoor adventures and hiking",

    # Academic
    "STEM and science",
    "reading and storytelling",
    "coding and technology",
    "math and tutoring",

    # Nature
    "animals and pets",
    "gardening and nature",
    "dinosaurs and fossils",

    # Social & Creative Play
    "cooking and baking",
    "gaming",
    "beauty and fashion",
    "lego and building",
    "film and movies",
]

results = classifier(all_places, candidate_labels=labels, multi_label=True)
print(results)