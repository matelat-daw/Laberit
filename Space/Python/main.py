import requests

# Define the API endpoint and parameters
url = "https://maps.googleapis.com/maps/api/distancematrix/json"
params = {
"origins": "Earth, Cabo Canaveral",
"destinations": "Moon, Crater Tycho",
"units": "imperial",
"key": "AIzaSyBbnApQImm9KUJetd-S0IniWEyT-xIYX1Q"
}

# Make the request to the API
response = requests.get(url, params=params)

# Parse the response
data = response.json()

print(data)

# Print the distance and duration
for element in data['rows'][0]['elements']:
    print(f"Distance: {element['distance']['text']}")
    print(f"Duration: {element['duration']['text']}")