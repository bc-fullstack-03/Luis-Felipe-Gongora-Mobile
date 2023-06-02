import React from 'react';
import { Text, View } from 'react-native';
import { UserCircle } from 'phosphor-react-native';

import Button from '../Button';
import { styles } from './styles';

interface ProfileItemProps {
  profile: Profile;
  handleFollowAction: (profileId: string) => void;
  buttonDisabled: boolean;
}

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

function ProfileItem({
  profile,
  handleFollowAction,
  buttonDisabled,
}: ProfileItemProps) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileIdentification}>
        <UserCircle color='white' weight='thin' size={32} />
        <Text style={styles.profileNameText}>{profile.name}</Text>
      </View>
      <Text
        style={styles.followers}
      >{`${profile.followers.length} Seguidores`}</Text>
      <Text
        style={styles.following}
      >{`Seguindo ${profile.following.length}`}</Text>

      {buttonDisabled ? (
        <Button
          title='Você já segue esse usuário!'
          onPress={() => handleFollowAction(profile._id)}
          disabled={buttonDisabled}
        />
      ) : (
        <Button
          title='Seguir'
          onPress={() => handleFollowAction(profile._id)}
          disabled={buttonDisabled}
        />
      )}
    </View>
  );
}

export default ProfileItem;
