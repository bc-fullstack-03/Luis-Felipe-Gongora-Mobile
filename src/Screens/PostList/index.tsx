import React, { useContext } from 'react';
import { PencilSimple, UserCircle } from 'phosphor-react-native';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { Context as AuthContext } from '../../context/AuthContext';

function PostList({ navigation }) {
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color='white' size={48} weight='thin' />
        <Text style={styles.userNameText}>{user}</Text>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <PencilSimple color='white' size={40} weight='thin' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PostList;
