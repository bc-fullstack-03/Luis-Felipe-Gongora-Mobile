import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostList from '../PostList';
import CreatePost from '../CreatePost';

import { Provider as PostProvider } from '../../context/PostContext';
import PostDetail from '../PostDetail';

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <PostProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}
      >
        <Stack.Screen name='PostList' component={PostList} />
        <Stack.Screen name='CreatePost' component={CreatePost} />
        <Stack.Screen name='Comments' component={PostDetail} />
      </Stack.Navigator>
    </PostProvider>
  );
}

export default Home;
