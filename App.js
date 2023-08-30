import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/loginScreen';
import { SignUpScreen } from './screens/signUpScreen';
import { ProfileScreen } from './screens/profileScreen';
import { CreateHuntScreen } from './screens/createHuntScreen';
import { FriendScreen } from './screens/friendScreen';
import MapScreen from './screens/mapScreen';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="create" component={CreateHuntScreen} />
        <Stack.Screen name="inviteFriend" component={FriendScreen} />
        <Stack.Screen name="map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}







// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native'; // Add this import
// import { createStackNavigator } from '@react-navigation/stack'; // Add this import


// import { LoginScreen } from './screens/loginScreen';
// import { SignInScreen } from './screens/signInScreen';

// export default function App() {
//   const Stack = createStackNavigator(); // Create the stack navigator

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Start">
//         <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="SignUp" component={SignInScreen} />
//         {/* Add the Sign Up screen */}
//         {/* You can add more screens here if needed */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

