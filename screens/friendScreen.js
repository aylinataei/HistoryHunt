
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native';
import * as http from '../util/http';

export function FriendScreen({ navigation }) {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [selectedFriendNames, setSelectedFriendNames] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const users = await http.getUser();
        setFriends(users);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    }

    fetchFriends();
  }, []);

  const data = Object.keys(friends).map(key => ({ id: key, ...friends[key] }));
  const filteredData = data.filter(item =>
    item.username && item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Invite Friends</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        style={styles.friendList}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.friendItem,
              selectedFriendNames.includes(item.username) && styles.selectedFriend,
            ]}
            onPress={() => {
              const updatedNames = selectedFriendNames.includes(item.username)
                ? selectedFriendNames.filter(name => name !== item.username)
                : [...selectedFriendNames, item.username];
              setSelectedFriendNames(updatedNames);
              setSelectedFriend([...selectedFriend, item]);
            }}>
            <Text style={styles.friendName}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedFriend && (
        <Text style={styles.typingMessage}>
          Typing a message to {selectedFriend.username}...
        </Text>
      )}
      <View style={styles.selectedFriendsContainer}>
        {selectedFriendNames.map(name => (
          <Text key={name} style={styles.selectedFriendName}>
            {name}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={styles.createHuntButton}
        onPress={() => navigation.navigate('create', { selectedFriend: selectedFriend })}>
        <Text style={styles.createHuntButtonText}>Invite</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#333',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
  },
  friendList: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  friendItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedFriend: {
    backgroundColor: '#E3EFFF', // Change to a color of your choice
  },
  friendName: {
    fontSize: 18,
    color: '#333',
  },
  typingMessage: {
    fontSize: 14,
    color: '#888',
    marginHorizontal: 16,
    marginTop: 8,
  },
  selectedFriendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  selectedFriendName: {
    backgroundColor: '#E3EFFF', // Change to a color of your choice
    padding: 4,
    margin: 4,
    borderRadius: 5,
    color: '#333',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendScreen;


