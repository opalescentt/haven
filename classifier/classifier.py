from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import pipeline
from sentence_transformers import SentenceTransformer
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(script_dir, "../.env"))

# MongoDB Connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["test"]
collection = db["places"]
print("Connected to MongoDB!")

# Load in ZSC
classifier = pipeline("zero-shot-classification", model="valhalla/distilbart-mnli-12-3")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
print("Model loaded!")

# Load places
places = list(collection.find({}, {"_id": 0}))
print(f"Loaded {len(places)} places!")

all_places = []
for i, place in enumerate(places[:50]):
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

# ZSC and embeddings
# print("Running ZSC...")
# zsc_results = classifier(all_places, candidate_labels=labels, multi_label=True)
# print(zsc_results)

print("Running embeddings...")
embeddings = embedding_model.encode(all_places)

# Save to MongoDB
print("Saving to MongoDB...")
for place, embedding in zip(places, embeddings):
    collection.update_one(
        {"id": place["id"]},
        {"$set": {
            "embedding": embedding.tolist(),
        }}
    )

# for place, zsc, embedding in zip(places, zsc_results, embeddings):
#     collection.update_one(
#         {"id": place["id"]},
#         {"$set": {
#             "tags": zsc["labels"],
#             "scores": zsc["scores"],
#             "embedding": embedding.tolist(),
#         }}
#     )

print("Done!")