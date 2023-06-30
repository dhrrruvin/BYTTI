import requests
import json
from bs4 import BeautifulSoup

# URL of the Wikipedia page for Indian railway stations
url = "https://en.wikipedia.org/wiki/List_of_railway_stations_in_India"

# Send a GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# print(soup)

# Find the table containing the station information
tables = soup.find_all("table", class_="wikitable")

# Initialize a list to store station data
stations = []

# Iterate over each row in the table
for table in tables:
    for row in table.find_all("tr")[1:]:
        # Get the columns in the row
        columns = row.find_all("td")

        # Extract the station name, code, and zone
        station_name = columns[0].text.strip()
        station_code = columns[1].text.strip()
        state = columns[2].text.strip()

        # Append the station data to the list
        stations.append({
            "name": station_name,
            "code": station_code,
            "state": state,
        })

# Save the station information to a JSON file
with open("stations.json", "w") as json_file:
    json.dump(stations, json_file, indent=4)

# print("Station information saved to stations.json")