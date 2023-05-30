import { View } from 'react-native';

import { styles } from './styles';

interface SpacerProps {
  children?: React.ReactNode;
}

function Spacer(props: SpacerProps) {
  return <View style={styles.container}>{props.children}</View>;
}

export default Spacer;
