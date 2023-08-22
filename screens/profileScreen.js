
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import * as http from '../util/http';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from '../componets/Picture';



export function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { name, token } = route.params;


  const handleCreateHunt = () => {
    // Add navigation logic for creating a hunt
  };





  useEffect(() => {
    async function storeToken() {
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        console.error('Error storing token:', error);
      }
    }
    console.log("profile", token)

    storeToken();
  }, [token]);
  const [storedToken, setStoredToken] = useState('');

  const [storedUsername, setStoredUsername] = useState('');
  // useEffect(() => {
  //   async function fetchStoredUsername() {
  //     try {
  //       const username = await AsyncStorage.getItem(token);
  //       setStoredUsername(username);
  //     } catch (error) {
  //       console.error('Error fetching stored username:', error);
  //     }
  //   }

  //   fetchStoredUsername();
  // }, []);

  // Compare the stored token with the received token
  const isAuthenticated = storedToken === token;
  return (

    <View style={styles.container}>
      <ImagePicker />
      <View style={styles.profileInfo}>

        <Text style={styles.username}>{name}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.activityText}>Active Hunt</Text>
          <Text style={styles.plannedText}>Planned Hunt</Text>
        </View>
      </View>

      {/* Medal Circles */}
      <View style={styles.medalContainer}>
        <Text style={styles.medalsHeader}>Medals</Text>
        <View style={styles.medalRow}>
          <View style={styles.medalCircle} />
          <View style={styles.medalCircle} />
          <View style={styles.medalCircle} />
          <View style={styles.medalCircle} />
          <View style={styles.medalCircle} />
        </View>
      </View>
      {/* Create Hunt Button */}
      <TouchableOpacity style={styles.createHuntButton} onPress={() => navigation.navigate('create')}>
        <Text style={styles.createHuntButtonText}>Create Hunt</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Adjusted justifyContent
    alignItems: 'center',
    backgroundColor: '#F3EFE7',
    paddingTop: 20,

  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '85%',

  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 10,

  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#456268',
    marginTop: 10,
  },
  activityText: {
    fontSize: 18,
    color: '#456268',


  },
  plannedText: {
    fontSize: 18,
    color: '#456268',
  },
  medalContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  medalsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#456268',
  },
  medalRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  medalCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white', // Gold color
    marginHorizontal: 5,
  },
  createHuntButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 100,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#456268',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  createHuntButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});





export default ProfileScreen;



