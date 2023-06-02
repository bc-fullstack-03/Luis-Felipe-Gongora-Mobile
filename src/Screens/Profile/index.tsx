import React, { useContext } from 'react';
import { UserCircle } from 'phosphor-react-native';
import { Text, View, SafeAreaView } from 'react-native';

import { styles } from './styles';

import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color='white' size={48} weight='thin' />
        <Text style={styles.userNameText}>{user}</Text>
      </View>
      <Button title='Sair' onPress={logout} />
    </SafeAreaView>
  );
}

export default Profile;
