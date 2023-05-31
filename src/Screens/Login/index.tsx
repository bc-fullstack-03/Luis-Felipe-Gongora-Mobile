import { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';

import AuthForm from '../../components/AuthForm';
import { Context as AuthContext } from '../../context/AuthContext';
import Spacer from '../../components/Spacer';

function Login({ navigation }) {
  const { login, errorMessage } = useContext(AuthContext);
  return (
    <>
      <AuthForm
        authFormSubtitle='Faça login e começe a usar!'
        submitFormButtonText='Entrar'
        submitFormButtonAction={login}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>
      {errorMessage && (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      )}
    </>
  );
}

export default Login;
