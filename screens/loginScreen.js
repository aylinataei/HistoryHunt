import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as http from '../util/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../componets/ContextAuth';

export function LoginScreen({ route }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);

  const authentitionHandler = async (email, password) => {
    try {
      console.log('email', email);
      console.log('password', password);

      const resp = await http.signinUser(email, password); // resp är token

      authCtx.authenticate(resp, email);

      console.log("authContext TOKEN", authCtx.token);

      console.log('API Response:', resp); // Logga hela API-svaret
      return resp;
    } catch (error) {
      console.error('API Error:', error); // Logga eventuella fel
      throw error; // Kasta om felet för att hantera det senare
    }
  };

  const storeUserData = async (name, token) => {
    try {
      await AsyncStorage.setItem('username', name);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const handleLogin = async () => {
    const { name } = route.params || {};
    console.log('TEST', name)

    const isAuthenticated = await authentitionHandler(username, password);
    console.log("AUTHENTICATE", isAuthenticated);

    if (isAuthenticated) {
      const token = isAuthenticated.token; // Retrieve the token from the returned data
      storeUserData(name, token);
      navigation.navigate('profile', { name: username });
      console.log('namnet', name);
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/historyhunt.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>History Hunter</Text>
          <Text style={styles.loginTitle}>Welcome back!</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <View style={styles.linkContainer}>
              <Text style={styles.signInLink}>Need to create an account?</Text>
              <Text style={styles.signUpLink}>Sign Up Here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EFE7',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#456268',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#456268',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  signInLink: {
    color: 'black',
    fontSize: 18,
    marginTop: 1,
    marginBottom: 5,
    textAlign: 'center',
  },
  signUpLink: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;




// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, Text, ImageBackground, Animated, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet } from 'react-native';
// import * as http from '../util/http';
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export function LoginScreen({ route }) {
//   const [isAuthenticading, setIsAuthenticading] = useState(false);
//   const [useremail, setUseremail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();
//   const headerAnimation = new Animated.Value(0);

//   const authentitionHandler = async (email, password) => {
//     console.log("authHandler", email, password);
//     const data = await http.signinUser(email, password);
//     console.log(data);
//     return data;
//   };

//   const handleLogin = async () => {
//     const { name } = route.params || {};

//     const storeUserData = async (name, token) => {
//       try {
//         await AsyncStorage.setItem('username', name);
//         await AsyncStorage.setItem('token', token);
//       } catch (error) {
//         console.error('Error storing user data:', error);
//       }
//     };

//     const isAuthenticated = await authentitionHandler(useremail, password);
//     console.log("AUTHENTICATE", isAuthenticated);

//     if (isAuthenticated) {
//       const token = isAuthenticated.token; // Retrieve the token from the returned data
//       storeUserData(name, token);
//       navigation.navigate('profile', { name: name });
//       console.log('namnet', name);
//     } else {
//       console.log(isAuthenticading);
//       Alert.alert('Login Failed', 'Invalid email or password.');
//     }
//   };

//   useEffect(() => {
//     Animated.timing(headerAnimation, {
//       toValue: 1,
//       duration: 1000, // Adjust the duration to your preference
//       useNativeDriver: false,
//     }).start();
//   }, []);

//   return (
    // <View style={styles.container}>
    //   <ImageBackground
    //     source={require('../assets/historyhunt.jpg')}
    //     style={styles.backgroundImage}
    //   >
//         <Text style={styles.headerText}>HistoryHunt</Text>
//         <Text style={styles.loginTitle}>LOGIN</Text>
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={useremail}
//             onChangeText={(text) => setUseremail(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />
//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Continue</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//             <View style={styles.linkContainer}>
//               <Text style={styles.signInLink}>Need to create an account?</Text>
//               <Text style={styles.signUpLink}>Sign Up Here</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }






// Your styles here


// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, ImageBackground, Animated, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet } from 'react-native';
// import * as http from '../util/http';
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export function LoginScreen({ route }) {
//   const [isAuthenticading, setIsAuthenticading] = useState(false)

//   const authentitionHandler = async (email, password) => {
//     console.log("authHandler", email, password)
//     const data = await http.signinUser(email, password)
//     console.log(data)
//     return data;

//   }

//   const [useremail, setUseremail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();


//   const headerAnimation = new Animated.Value(0);




//   const handleLogin = async (data) => {
//     const { name } = route.params || {};


//     // const storeUserData = async (name, token) => {
//     //   try {

//     //     await AsyncStorage.setItem('token', token);
//     //   } catch (error) {
//     //     console.error('Error storing user data:', error);
//     //   }
//     //   console.log('token', token)
//     // };

//     const isAuthenticated = await authentitionHandler(useremail, password);
//     console.log("AUTHENTICATE", isAuthenticated)

//     if (isAuthenticated) {
//       const token = data.token;
//       storeUserData(name, token);
//       navigation.navigate('profile', { name: name });
//       console.log('namnet', name)
//     } else {
//       console.log(isAuthenticading)
//       Alert.alert('Login Failed', 'Invalid email or password.');
//     }

//     const userData = {
//       email: useremail,
//       username: name, // Assuming 'name' is the username you want to store
//     };

//     await http.storeUser(userData); // Store the user data in Firebase
//   }


//   const storeUserData = async (name, token) => {
//     try {
//       await AsyncStorage.setItem('username', name);
//       await AsyncStorage.setItem('token', token);
//     } catch (error) {
//       console.error('Error storing user data:', error);
//     }
//   };
//   ;
//   React.useEffect(() => {
//     Animated.timing(headerAnimation, {
//       toValue: 1,
//       duration: 1000, // Adjust the duration to your preference
//       useNativeDriver: false,
//     }).start();
//   }, []);



//   return (
//     <View style={styles.container}>

//       <ImageBackground
//         source={require('../assets/historyhunt.jpg')}
//         style={styles.backgroundImage}
//       >
//         <Text style={styles.headerText}>HistoryHunt</Text>
//         <Text style={styles.loginTitle}>LOGIN</Text>
//         <View style={styles.formContainer}>

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={useremail}
//             onChangeText={(text) => setUseremail(text)}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />
//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Continue</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//             <View style={styles.linkContainer}>
//               <Text style={styles.signInLink}>Need to create an account?</Text>
//               <Text style={styles.signUpLink}>Sign Up Here</Text>
//             </View>
//           </TouchableOpacity>

//         </View>
//       </ImageBackground>
//     </View>
//   );
// }









// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3EFE7',
//   },
//   header: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 100,
//   },
//   headerText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#456268',
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#456268', // Header text color
//   },
//   formContainer: {
//     padding: 20,
//   },
//   input: {
//     width: 250,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#A39480',
//     backgroundColor: 'white',
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     fontSize: 18,
//   },
//   loginButton: {
//     width: 200,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#456268',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',

//   },
//   loginTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',

//     marginBottom: 20,

//   },


//   signInLink: {
//     color: '#456268',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 5,
//     textShadowColor: 'black', // Text shadow color
//     textShadowOffset: { width: 0, height: 1 }, // Text shadow offset
//     textShadowRadius: 2, // Text shadow blur radius
//   },
//   signUpLink: {
//     color: '#32474b',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     textShadowColor: 'black', // Text shadow color
//     textShadowOffset: { width: 0, height: 1 }, // Text shadow offset
//     textShadowRadius: 2, // Text shadow blur radius
//   },
// });









