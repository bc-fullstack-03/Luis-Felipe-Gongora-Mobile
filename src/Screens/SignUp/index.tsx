import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';

import Spacer from '../../components/Spacer';
import AuthForm from '../../components/AuthForm';
import { Context as AuthContext } from '../../context/AuthContext';

function SignUp({ navigation }) {
  const { register, errorMessage } = useContext(AuthContext);
  return (
    <>
      <AuthForm
        authFormSubtitle='Registre-se agora mesmo!'
        submitFormButtonText='Cadastrar'
        signUp
        submitFormButtonAction={register}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.link}>Já é cadastro? Faça login agora!</Text>
      </TouchableOpacity>
      {errorMessage && (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      )}
    </>
  );
}

export default SignUp;
