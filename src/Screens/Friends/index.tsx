import { SafeAreaView, FlatList } from 'react-native';
import { useEffect, useState, useContext } from 'react';

import { styles } from './styles';

import { api } from '../../services/api';
import ProfileItem from '../../components/ProfileItem';
import { Context as AuthContext } from '../../context/AuthContext';

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
        const newProfiles = profiles.map((profile) => {
          if (profile._id == profileId) {
            !profile.followers.includes(profile) &&
              profile.followers.push(profile);
          }
          return { ...profile };
        });
        return [...newProfiles];
      });
    } catch (err) {
      alert('Erro ao seguir usuário');
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
