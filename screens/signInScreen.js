import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as http from '../util/http';
import { useRoute } from '@react-navigation/native';



export function SignInScreen() {
  const [email, setEmail] = useState('');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const navigation = useNavigation();
  const [isAuthenticading, setIsAuthenticading] = useState(false)


  const authentitionHandler = async (email, password) => {
    console.log("authHandler", email, password)

    try {
      const istoken = await http.signupUser(email, password);
      await http.updateUser(name, istoken);

      console.log("resp", istoken);
      setToken(prevToken => istoken); // Use the callback form of setToken
      console.log("token", istoken); // Here istoken is the most up-to-date value

      const userData = {
        email: email,
        username: name, // Assuming 'name' is the username you want to store
      };

      await http.storeUser(userData); // Store the user data in Firebase
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };



  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {

    return password.length >= 6;
  };

  const handleSignIn = () => {
    if (!email || !name || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Invalid email format.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }


    authentitionHandler(email, password,)

    navigation.navigate('profile', { name: name, token: token }); // Pass the 'name' parameter here

  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../assets/historyhunt.jpg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.loginTitle}>Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} >

          <Text style={styles.loginButtonText}>SignUp</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>


          <Text style={styles.signInLink}>Login Here!</Text>


        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A39480',
    backgroundColor: 'white',
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#456268',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#456268',

    marginBottom: 20,

  },
});









// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export function SignInScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Sign Up Screen hello</Text>
//       {/* Add your Sign Up UI components here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


