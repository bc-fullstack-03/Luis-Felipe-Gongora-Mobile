import {
  EnvelopeSimple,
  Lock,
  IdentificationCard,
} from 'phosphor-react-native';
import { KeyboardAvoidingView, Platform, Image } from 'react-native';

import Spacer from '../Spacer';
import Button from '../Button';
import { Input } from '../Input';
import Heading from '../Heading';
import { styles } from './styles';
import { THEME } from '../../theme';

import logo from '../../../assets/images/parrot-logo.png';

interface AuthFormProps {
  authFormSubtitle: string;
  submitFormButtonText: string;
  signUp?: boolean;
}

function AuthForm(props: AuthFormProps) {
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
          <Input.Input placeholder='Digite seu e-mail' autoCapitalize='none' />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      {props.signUp && (
        <>
          <Input.Root>
            <Input.Icon>
              <IdentificationCard color={THEME.COLORS.INPUT} />
              <Input.Input
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
            placeholder='********'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
          />
        </Input.Icon>
      </Input.Root>
      <Spacer />
      <Button title={props.submitFormButtonText} onPress={() => {}} />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
