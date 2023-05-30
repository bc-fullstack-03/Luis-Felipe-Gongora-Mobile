import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import AuthForm from '../../components/AuthForm';

function SignUp({ navigation }) {
  return (
    <>
      <AuthForm
        authFormSubtitle='Registre-se agora mesmo!'
        submitFormButtonText='Cadastrar'
        signUp
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.link}>Já é cadastro? Faça login agora!</Text>
      </TouchableOpacity>
    </>
  );
}

export default SignUp;
