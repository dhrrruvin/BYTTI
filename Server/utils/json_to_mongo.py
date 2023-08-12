import json
from pymongo import MongoClient

# MongoDB connection details
mongo_host = 'localhost'
mongo_port = 27017
database_name = 'train_booking'
collection_name = 'stations'

# Load JSON data from file
with open('stations.json') as file:
    data = json.load(file)

# Connect to MongoDB
# client = MongoClient('mongodb+srv://dhrrruvin:dhruvin929@cluster0.kwrebu4.mongodb.net/train_booking')

client = MongoClient(mongo_host, mongo_port)

# Access the database and collection
db = client[database_name]
collection = db[collection_name]

# Insert the data into the collection
collection.insert_many(data)

# Close the MongoDB connection
client.close()
