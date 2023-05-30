import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import AuthForm from '../../components/AuthForm';

function Login({ navigation }) {
  return (
    <>
      <AuthForm
        authFormSubtitle='Faça login e começe a usar!'
        submitFormButtonText='Entrar'
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>
    </>
  );
}

export default Login;
