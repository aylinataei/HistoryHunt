import { useState } from 'react';
import { Dimensions, View, StyleSheet, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get("window")

const MapScreen = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const initalRegion = {
    latitude: 57.70887,
    longitude: 11.97456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const presshandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude
    const longitude = event.nativeEvent.coordinate.longitude
    setPickedLocation({ latitude, longitude })
  }
  return (
    <MapView
      style={styles.container}
      initialRegion={initalRegion}
      onPress={presshandler}>

      {pickedLocation && <Marker coordinate={pickedLocation} />}
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height
  }
})
export default MapScreen