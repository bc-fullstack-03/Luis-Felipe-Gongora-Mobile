import React, { useContext, useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';

import { styles } from './styles';

import PostItem from '../../components/PostItem';
import HomeHeader from '../../components/HomeHeader';
import { Context as PostContext } from '../../context/PostContext';
import { Context as AuthContext } from '../../context/AuthContext';

function PostList({ navigation }) {
  const { user } = useContext(AuthContext);
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} user={user} />
      <View style={styles.content}>
        <FlatList
          data={posts}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => <PostItem post={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default PostList;
