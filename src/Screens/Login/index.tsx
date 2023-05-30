import { Text, View, Button } from 'react-native';

function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button
        title='SignUp'
        onPress={() => navigation.navigate('SignUp')}
      ></Button>
    </View>
  );
}

export default Login;
