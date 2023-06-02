import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

import { THEME } from '../../theme';

interface TextInputRootProps {
  children: React.ReactNode;
}

function TextInputRoot(props: TextInputRootProps) {
  return <View style={styles.container}>{props.children}</View>;
}

interface TextInputInputProps extends TextInputProps {}

function TextInputInput(props: TextInputInputProps) {
  return (
    <TextInput
      style={styles.input}
      {...props}
      placeholderTextColor={THEME.COLORS.INPUT}
    ></TextInput>
  );
}

interface TextInputIconProps {
  children: React.ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
  return <>{props.children}</>;
}

export const Input = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
