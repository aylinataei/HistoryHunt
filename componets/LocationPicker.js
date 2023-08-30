import { View, StyleSheet, TouchableOpacity, Text, Image }
  from "react-native"
import React, { useEffect, useState } from 'react';
import { CreateLocationUrl } from "../util/location"
import { useNavigation, useRoute } from '@react-navigation/native';

const LocationPicker = () => {
  const [pickedLocations, setPickedLocations] = useState([]);
  const navigation = useNavigation();
  const route = useRoute()

  useEffect(() => {
    const manuallyPickeLocations = route.params ? { lat: route.params.latitude, lgn: route.params.longitude } : null
    if (manuallyPickeLocations) {
      setPickedLocations(manuallyPickeLocations)
    }

  }, [route])




  return (
    <View>
      <View style={styles.preview}>
        <Image source={{ uri: CreateLocationUrl(pickedLocations) }} />
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#456268',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  preview: {
    width: "100%",
    backgroundColor: "lightblue",
    height: 250,
    marginVertical: 8,
  }
})

export default LocationPicker