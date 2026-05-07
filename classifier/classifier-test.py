from pymongo import MongoClient
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(script_dir, "../.env"))

client = MongoClient(os.getenv("MONGODB_URI"))
collection = client["test"]["places"]

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Simulate a child's interests
query = "shopping"

# Load only places that have embeddings
places = list(collection.find({"embedding": {"$exists": True}}, {"_id": 0}))
print(f"Found {len(places)} enriched places")

# Embed the query
query_vec = embedding_model.encode([query])

# Stack all place embeddings
place_vecs = np.array([p["embedding"] for p in places])

# Compute similarity
scores = cosine_similarity(query_vec, place_vecs)[0]

# Sort by score
ranked = sorted(zip(scores, places), key=lambda x: x[0], reverse=True)

print(f"\nTop results for: '{query}'\n")
for score, place in ranked[:5]:
    print(f"{score:.3f} — {place['displayName']['text']}")
    print(f"       Tags: {place.get('types', [])[:3]}")
    print()