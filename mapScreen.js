// import { useCallback, useLayoutEffect, useState } from 'react';
// import { Dimensions, View, StyleSheet, Alert, } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { FontAwesome } from '@expo/vector-icons';
// const { height, width } = Dimensions.get("window")

// const MapScreen = ({ navigation }) => {
//   const [pickedLocation, setPickedLocation] = useState();

//   const savePickedLocation = useCallback(() => {
//     if (!pickedLocation) {
//       Alert.alert("no location selected", "you have to pick a location")
//       return;
//     }
//   })

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <View style={{ marginRight: 10 }}>
//           <FontAwesome
//             name="save"
//             size={24}
//             color="black"
//             onPress={savePickedLocation}
//           />
//         </View>
//       ),
//     });
//   }, [navigation, savePickedLocation]);


//   const initalRegion = {
//     latitude: 57.70887,
//     longitude: 11.97456,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const presshandler = (event) => {
//     const latitude = event.nativeEvent.coordinate.latitude
//     const longitude = event.nativeEvent.coordinate.longitude
//     setPickedLocation({ latitude, longitude })
//   }
//   return (
//     <MapView
//       style={styles.container}
//       initialRegion={initalRegion}
//       onPress={presshandler}>

//       {pickedLocation && <Marker coordinate={pickedLocation} title='your picked location' />}
//     </MapView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     height: height
//   }
// })
// export default MapScreen









// import { useCallback, useLayoutEffect, useState } from 'react';
// import { Dimensions, View, StyleSheet, Alert, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { FontAwesome } from '@expo/vector-icons';
// const { height, width } = Dimensions.get("window")

// const MapScreen = ({ navigation }) => {
//   const [pickedLocation, setPickedLocation] = useState();
//   const [displayedLocation, setDisplayedLocation] = useState(null);

//   const savePickedLocation = useCallback(() => {
//     if (!pickedLocation) {
//       Alert.alert("No location selected", "You have to pick a location");
//       return;
//     }

//     // Save the pickedLocation and perform any desired actions
//     // For example, you can update a database or context with the pickedLocation data
//     // After saving, you can navigate back to the previous screen if needed
//     // navigation.goBack();
//   }, [pickedLocation]);

//   const initalRegion = {
//     latitude: 57.70887,
//     longitude: 11.97456,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const presshandler = (event) => {
//     const latitude = event.nativeEvent.coordinate.latitude;
//     const longitude = event.nativeEvent.coordinate.longitude;
//     const newLocation = { latitude, longitude };
//     setPickedLocation(newLocation);
//     setDisplayedLocation(newLocation);
//   }

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <View style={{ marginRight: 10 }}>
//           <FontAwesome
//             name="save"
//             size={24}
//             color="black"
//             onPress={savePickedLocation}
//           />
//         </View>
//       ),
//     });
//   }, [navigation, savePickedLocation]);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={initalRegion}
//         onPress={presshandler}>

//         {pickedLocation && <Marker coordinate={pickedLocation} title='Your picked location' />}
//       </MapView>

//       {displayedLocation && (
//         <View style={styles.locationContainer}>
//           <Text style={styles.locationText}>
//             Picked Location: {displayedLocation.latitude}, {displayedLocation.longitude}
//           </Text>
//         </View>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   locationContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     backgroundColor: 'white',
//     padding: 5,
//     borderRadius: 5,
//   },
//   locationText: {
//     fontSize: 16,
//   },
// });

// export default MapScreen;









import { useCallback, useLayoutEffect, useState } from 'react';
import { Dimensions, View, StyleSheet, Alert, Text } from 'react-native';
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
});

export default MapScreen;
