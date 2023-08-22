
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as http from '../util/http';

export function FriendScreen({ navigation }) {
  const [friends, setFriends] = useState([]);

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
  console.log('Current friends state:', friends);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Invite Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friendItem}
            onPress={() => navigation.navigate('create')}>
            <Text style={styles.friendText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.createHuntButton}
        onPress={() => navigation.navigate('map')}>
        <Text style={styles.createHuntButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    backgroundColor: '#F5F7FA',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
    textAlign: 'center',
  },
  friendButton: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#456268',
    borderRadius: 5,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendButtonText: {
    fontSize: 18,
    color: '#456268',
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

export default FriendScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import * as http from '../util/http';



// export function FriendScreen({ navigation }) {
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {

//     async function fetchFriends() {
//       try {
//         const users = await http.getUser();
//         setFriends(users);
//         console.log(users)
//       } catch (error) {
//         console.error('Error fetching friends:', error);
//       }
//     }

//     fetchFriends();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Invite Friends</Text>
//       <FlatList
//         data={friends}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.friendItem}
//             onPress={() => navigation.navigate('create')}>
//             <Text style={styles.friendText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <TouchableOpacity
//         style={styles.createHuntButton}
//         onPress={() => navigation.navigate('map')}>
//         <Text style={styles.createHuntButtonText}>Invite</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 64,
//     backgroundColor: '#F5F7FA',
//   },
//   heading: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     color: '#333',
//     textAlign: 'center',
//   },
//   friendItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//   },
//   friendText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   createHuntButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     width: 100,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#456268',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   createHuntButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default FriendScreen;






