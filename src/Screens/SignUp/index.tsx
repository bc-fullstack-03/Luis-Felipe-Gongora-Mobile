import { Text, View, Button } from 'react-native';

function SignUp({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up</Text>
      <Button title='SignUp' onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default SignUp;
