import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import Home from './src/Screens/Home';
import Friends from './src/Screens/Friends';
import Profile from './src/Screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Friends' component={Friends} />
          <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
