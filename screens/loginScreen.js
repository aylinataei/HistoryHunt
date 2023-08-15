

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import * as http from '../util/http';

export function LoginScreen() {
  const [isAuthenticading, setIsAuthenticading] = useState(false)

  const authentitionHandler = async (email, password) => {
    console.log("authHandler", email, password)
    const data = await http.signinUser(email, password)
    console.log(data)
    return data;
   
  }




  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const headerAnimation = new Animated.Value(0);

  const handleLogin = async (data) => {
    const isAuthenticated = await authentitionHandler(username, password);
    console.log("AUTHENTICATE", isAuthenticated)
    if (isAuthenticated) {
      navigation.navigate('profile');
    } else {
      console.log(isAuthenticading)
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  
   
    
  };
  ;
  React.useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 1000, // Adjust the duration to your preference
      useNativeDriver: false,
    }).start();
  }, []);

  

  return (
    <View style={styles.container}>
     
      <ImageBackground
        source={require('../assets/historyhunt.jpg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.headerText}>HistoryHunt</Text>
        <Text style={styles.loginTitle}>LOGIN</Text>
        <View style={styles.formContainer}>
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
            <Text style={styles.loginButtonText}>Continue</Text>
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
    backgroundColor: '#F3EFE7', 
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#456268', 
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#456268', // Header text color
  },
  formContainer: {
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
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
   
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
   
    marginBottom: 20,
  
  },

  linkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'black', // Text shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Android shadow elevation
  },
  signInLink: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'black', // Text shadow color
    textShadowOffset: { width: 0, height: 1 }, // Text shadow offset
    textShadowRadius: 2, // Text shadow blur radius
  },
  signUpLink: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black', // Text shadow color
    textShadowOffset: { width: 0, height: 1 }, // Text shadow offset
    textShadowRadius: 2, // Text shadow blur radius
  },
});









// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground, Image, Animated } from 'react-native';

// export function LoginScreen() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const headerAnimation = new Animated.Value(0);

//   const handleLogin = () => {
//     // Perform your login/authentication logic here.
//     // You can check the username and password against your backend, or do it locally for this example.

//     // For this example, let's consider a simple validation.
//     if (username === 'your_username' && password === 'your_password') {
//       Alert.alert('Login Successful');
//     } else {
//       Alert.alert('Login Failed', 'Invalid username or password.');
//     }
//   };

//   // Start header animation on component mount
//   React.useEffect(() => {
//     Animated.timing(headerAnimation, {
//       toValue: 1,
//       duration: 1000, // Adjust the duration to your preference
//       useNativeDriver: false,
//     }).start();
//   }, []);

//   // Interpolate header animation values for scaling effect
//   const headerScale = headerAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.5, 1],
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ ...styles.header, transform: [{ scale: headerScale }] }}>
//         <Text style={styles.headerText}>HistoryHunt</Text>
//       </Animated.View>
//       <ImageBackground
//         source={require('../assets/backgorundlogin.jpg')}
//         style={styles.backgroundImage}
//       >
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Username"
//             value={username}
//             onChangeText={(text) => setUsername(text)}
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
//             <Text style={styles.signUpLink}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }













// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';

// export function LoginScreen() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Perform your login/authentication logic here.
//     // You can check the username and password against your backend, or do it locally for this example.

//     // For this example, let's consider a simple validation.
//     if (username === 'your_username' && password === 'your_password') {
//       Alert.alert('Login Successful');
//     } else {
//       Alert.alert('Login Failed', 'Invalid username or password.');
//     }
//   };

//   return (
    
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3EFE7', // Earthy background color
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   input: {
//     width: 250,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#A39480', // Subtle border color
//     backgroundColor: 'white', // Muted color for the input field
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     fontSize: 18,
//   },
//   loginButton: {
//     width: 200,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#456268', // Bold color for the login button
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 30,
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     width: 200,
//     height: 40,
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//   },
// });
