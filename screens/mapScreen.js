// who can i code so that when the user press on create hunt after saving the positions an images of  the choosen position will show up in my createhunt screnn

import { useCallback, useLayoutEffect, useState } from 'react';
import { Dimensions, View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
const { height, width } = Dimensions.get("window")

const MapScreen = ({ navigation }) => {
  const [pickedLocations, setPickedLocations] = useState([]);
  const [displayedLocation, setDisplayedLocation] = useState(null);

  const savePickedLocation = useCallback(() => {
    if (!displayedLocation) {
      Alert.alert("No location selected", "You have to pick a location");
      return;
    }

    // Save the displayedLocation to pickedLocations array
    setPickedLocations([...pickedLocations, displayedLocation]);

    // Clear displayedLocation after saving
    setDisplayedLocation(null);
  }, [displayedLocation, pickedLocations]);

  const deletePickedLocation = (index) => {
    const updatedLocations = pickedLocations.filter((_, i) => i !== index);
    setPickedLocations(updatedLocations);
  };

  const createHunt = () => {
    navigation.navigate('create', { pickedLocations });
    // Perform actions to create a hunt using the saved locations
    // For example, you can navigate to a new screen with the created hunt
    // navigation.navigate('CreateHuntScreen', { locations: pickedLocations });
  };

  const initialRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const pressHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    const newLocation = { latitude, longitude };
    setDisplayedLocation(newLocation);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <FontAwesome
            name="save"
            size={24}
            color="black"
            onPress={savePickedLocation}
          />
        </View>
      ),
    });
  }, [navigation, savePickedLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={pressHandler}>

        {pickedLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            title={`Picked Location ${index + 1}`}
            onCalloutPress={() => deletePickedLocation(index)}
          />
        ))}

        {displayedLocation && (
          <Marker
            coordinate={displayedLocation}
            title='Your picked location'
            pinColor="blue" // Custom pin color for the current displayed location
          />
        )}
      </MapView>

      {displayedLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Picked Location: {displayedLocation.latitude}, {displayedLocation.longitude}
          </Text>
        </View>
      )}

      {pickedLocations.length > 0 && (
        <TouchableOpacity style={styles.createHuntButton} onPress={createHunt}>
          <Text style={styles.createHuntButtonText}>Create Hunt</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  locationText: {
    fontSize: 16,
  },
  createHuntButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  createHuntButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapScreen;
