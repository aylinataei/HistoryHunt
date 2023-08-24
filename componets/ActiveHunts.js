// import React, { useRef, useState, useEffect } from 'react';
// import { Text, FlatList, Image, StyleSheet, View } from 'react-native';
// import * as http from '../util/http';


// const ActiveHunts = () => {
//   const [hunts, setHunts] = useState([]);

//   useEffect(() => {
//     async function fetchHunts() {
//       try {
//         const hunts = await http.getHunt();
//         console.log('Fetched Hunts:', hunts);
//         setHunts(hunts);
//       } catch (error) {
//         console.error('Error fetching Hunts:', error);
//       }
//     }

//     fetchHunts();

//   }, []);

//   const data = Object.keys(hunts).map(key => ({ id: key, ...hunts[key] }));
//   const filteredData = data.filter(item =>
//     item.username && item.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );





//   return (
//     // <FlatList
//     //   data={filteredData} // Use the hunts array as data for the FlatList
//     //   keyExtractor={item => item.id}// Assuming each hunt has an id
//     //   renderItem={({ item }) => (
//     //     <Text>{item.name}</Text> // Render some data from each hunt, adjust as needed
//     //   )}
//     // />
//     <View style={[styles.container, { width: 8, height: 8 }]}>
//       <Image source={source} style={styles.image} />
//     </View>
//   )

// }
// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 50, // Half of the width and height for a perfect circle
//     overflow: 'hidden', // Clip any overflow content to the border radius
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });
// export default ActiveHunts

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as http from '../util/http';

const ActiveHunts = () => {
  const [hunts, setHunts] = useState([]);

  useEffect(() => {
    async function fetchHunts() {
      try {
        const fetchedHunts = await http.getHunt();
        console.log('Fetched Hunts:', fetchedHunts);
        setHunts(fetchedHunts);
      } catch (error) {
        console.error('Error fetching Hunts:', error);
      }
    }

    fetchHunts();
  }, []);

  // Assuming you will use a search query
  const [searchQuery, setSearchQuery] = useState('');

  const data = Object.keys(hunts).map(key => ({ id: key, ...hunts[key] }));
  const filteredData = data.filter(item =>
    item.username && item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backgorundlogin.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40, // Half of the width and height for a perfect circle
    overflow: 'hidden', // Clip any overflow content to the border radius
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ActiveHunts;
