import csv
from pymongo import MongoClient
from bson import ObjectId
csv_file_path = 'train_details.csv'

import pymongo

# Connect to MongoDB
# client = pymongo.MongoClient('mongodb+srv://dhrrruvin:dhruvin929@cluster0.kwrebu4.mongodb.net/train_booking')

client = pymongo.MongoClient('mongodb://localhost:27017')
database = client['train_booking']

# Source collection (with documents to reference)
source_collection = database['stations']

# Target collection (to store the references)
target_collection = database['train1']

# Retrieve documents from the source collection
source_documents = source_collection.find()

# Save document references in the target collection

trains = []

with open(csv_file_path, 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        q = {
            'station_code':row['Station Code']
        }
        p = {'_id':1}
        try:
            y = list(source_collection.find(q, p))[0]['_id']
        except:
            y = "647f3234893ea26a60b2ebdb" # id of station that is made to handle this situations

        print(y)
        x = {
            "train_number": row['Train No'],
            "train_name": row['Train Name'],
            "route": [{
                "station": y,
                "distance_traveled": row["Distance"],
                "arrival_time": row["Arrival Time"],
                "departure_time": row["Departure Time"],
                "sequence": row["SEQ"]
        }]
        }
        print(x)
        trains.append(x)

target_collection.insert_many(trains)
print(trains)
client.close()

