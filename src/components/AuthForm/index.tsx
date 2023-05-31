import {
  EnvelopeSimple,
  Lock,
  IdentificationCard,
} from 'phosphor-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Image } from 'react-native';

import Spacer from '../Spacer';
import Button from '../Button';
import { Input } from '../Input';
import Heading from '../Heading';
import { styles } from './styles';
import { THEME } from '../../theme';

import logo from '../../../assets/images/parrot-logo.png';
import { Auth } from '../../Screens/Model/Auth';

interface AuthFormProps {
  authFormSubtitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
  signUp?: boolean;
}

function AuthForm(props: AuthFormProps) {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      contentContainerStyle={styles.containerPosition}
    >
      <Image source={logo} resizeMethod='scale' />
      <Heading title='Sysmap Show-Us' subtitle={props.authFormSubtitle} />
      <Input.Root>
        <Input.Icon>
          <EnvelopeSimple color={THEME.COLORS.INPUT} />
          <Input.Input
            value={user}
            onChangeText={setUser}
            autoCorrect={false}
            placeholder='Digite seu e-mail'
            autoCapitalize='none'
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      {props.signUp && (
        <>
          <Input.Root>
            <Input.Icon>
              <IdentificationCard color={THEME.COLORS.INPUT} />
              <Input.Input
                value={name}
                onChangeText={setName}
                placeholder='Digite seu nome'
                autoCapitalize='words'
                autoCorrect={false}
              />
            </Input.Icon>
          </Input.Root>
          <Spacer />
        </>
      )}
      <Input.Root>
        <Input.Icon>
          <Lock color={THEME.COLORS.INPUT} />
          <Input.Input
            value={password}
            onChangeText={setPassword}
            placeholder='********'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Button
        title={props.submitFormButtonText}
        onPress={() => {
          props.signUp
            ? props.submitFormButtonAction({ user, name, password })
            : props.submitFormButtonAction({ user, password });
        }}
      />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
