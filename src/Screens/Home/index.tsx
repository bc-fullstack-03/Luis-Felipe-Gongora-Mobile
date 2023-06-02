import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostList from '../PostList';
import CreatePost from '../CreatePost';

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}
    >
      <Stack.Screen name='PostList' component={PostList} />
      <Stack.Screen name='CreatePost' component={CreatePost} />
    </Stack.Navigator>
  );
}

export default Home;
