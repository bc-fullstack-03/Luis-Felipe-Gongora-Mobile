import { SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';

import { styles } from './styles';

import { api } from '../../services/api';
import { Context as AuthContext } from '../../context/AuthContext';
import ProfileItem from '../../components/ProfileItem';

function Friends() {
  const { token, profile } = useContext(AuthContext);
  const [profilesList, setProfileList] = useState([]);
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await api.get('/profiles', authHeader);
        const filteredProfiles = data.filter((profiles) => {
          if (profiles._id === profile) {
            return false;
          }
          return true;
        });
        setProfileList(filteredProfiles);
      } catch (err) {
        alert('Erro ao obter lista de usuario');
      }
    };

    getProfiles();
  }, []);

  async function handleFollow(profileId: string) {
    try {
      await api.post(`/profiles/${profileId}/follow`, null, authHeader);
      setProfileList((profiles) => {
        const newProfileList = profiles.map((p) => {
          if (p.id === profileId) {
            !p.followers.includes(profile) && p.followers.push(profile);
          }
          return p;
        });
        return [...newProfileList];
      });
    } catch (err) {
      alert('Erro ao seguir usuario');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profilesList}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => (
          <ProfileItem
            profile={item}
            handleFollowAction={handleFollow}
            buttonDisabled={item.followers.includes(profile)}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default Friends;
