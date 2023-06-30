import pandas as pd
import json

csv_file = "train_details.csv"
json_file = "stations.json"

pd.set_option('display.max_colwidth', None)

# df = pd.read_json(json_file)
df = pd.read_csv(csv_file)


# print(df["Train No"].size)
# print(df.shape[0])
# unique_values = df["Train No"].unique()
# unique_values = df["Station Code"].unique()
# unique_stations = df["Train No"].unique()

# print(unique_values.size)
# print(unique_stations.size)

unique_code = df["Station Code"].unique()
unique_station = df["Station Name"].unique()

# print(unique_code.shape[0])
# print(unique_station.shape[0])

tuple_col = list(zip(unique_code, unique_station))

# print(tuple_col)
with open("stations.json", "w") as f:

    for x, y in tuple_col:

        data = {
                "station_code": x,
                "station_name": y
        }
        json.dump(data, f)



# duplicate = df[df.duplicated(subset=["code"])]
# print(duplicate)

# for each station print incoming and outgoing train

# station_code = df["Station Code"].unique()
trains = df["Train No"].unique()
visited = [0]*df["Train No"].unique()
# j = 0
# print(df['Train No'][4])
# with open('stationsWtrains2.json', 'w') as f:
#     i=0
#     trains = {}
#     while i != df.shape[0]:
#         trains.setdefault(df['Train No'][i], []).append(df['Station Code'][i])
#         i += 1

#     json.dump(trains, f)

# print(trains)




#     for train in trains:
#         stations = []
#         for i, r in df.iterrows():
#             if r["Train No"] == train:
#                 stations.append(r["Station Code"])
#             else:
#                 r.ite

#         data = {
#             "train_number": train,
#             "stations": stations
#         }

#         json.dump(data, f)
#         print(train)


#     for station in station_code:
#         incoming = []
#         outgoing = []
#         for i, r in df.iterrows():
#             if r["Source Station"] == station and r["Station Code"] == station:
#                 outgoing.append(r["Train No"])
#             elif r["Destination Station"] == station and r["Station Code"] == station:
#                 incoming.append(r["Train No"])
#             elif r["Station Code"] == station:
#                 incoming.append(r["Train No"])
#                 outgoing.append(r["Train No"])

#         data = {
#             "station_code": station,
#             "incoming_trains": incoming,
#             "outgoing_trains": outgoing
#         }
#         json.dump(data, f)
#         j+=1
#         print(j)


        # some data is in string and some in int

# import pymongo

# client = pymongo.MongoClient("mongodb://localhost:27017")
# database = client['train_booking']
# source_collection = database["stations"]
# target_collection = database["train1"]
# source_docs = source_collection.find()

# for doc in docs:
#     print(doc['_id'])
#     print(doc['station_code'])