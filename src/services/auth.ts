import * as SecureStore from 'expo-secure-store';

async function getAuthHeader() {
  const token = await SecureStore.getItemAsync('token');

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return authHeader;
}

async function getProfile() {
  const profile = await SecureStore.getItemAsync('profile');
  return profile;
}

export { getAuthHeader, getProfile };
