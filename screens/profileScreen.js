
import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import * as http from '../util/http';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from '../componets/Picture';
import PlannedHunt from '../componets/PlannedHunt';
import ActiveHunts from '../componets/ActiveHunts';
import { AuthContext } from '../componets/ContextAuth';




export function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { name, email, token } = route.params;
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [selectedFriendNames, setSelectedFriendNames] = useState([]);


  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState('');



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await http.getUserById(authCtx.token); // Fetch user from Firebase
        const foundUser = userData.find(u => u.email.toLowerCase() === authCtx.email.toLowerCase()); // Modify according to your data structure

        if (foundUser) {
          setUsername(foundUser.displayName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);




  return (
    <View style={styles.container}>
      <ImagePicker />

      <Text style={styles.username}>{username}</Text>

      {/* Profile Info */}
      <View style={styles.sectionContainer}>
        <View style={styles.profileInfo}>
          {/* ... (existing profile info components) */}
        </View>
        {/* ... (medal circles if needed) */}
      </View>

      {/* Active Hunt */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Active Hunt</Text>
        <ActiveHunts />
      </View>

      {/* Planned Hunt */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Planned Hunt</Text>
        <PlannedHunt />
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
    marginTop: '10%',

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
  // activityText: {
  //   fontSize: 18,
  //   color: '#456268',
  //   marginBottom: '10%',
  //   marginTop: '10'


  // },
  plannedText: {
    fontSize: 18,
    color: '#456268',
    marginBottom: '60%',
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
  sectionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionText: {
    fontSize: 18,
    color: '#456268',
  },
});





export default ProfileScreen;


