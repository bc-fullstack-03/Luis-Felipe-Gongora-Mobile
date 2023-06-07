import React from 'react';
import { UserCircle } from 'phosphor-react-native';
import { View, Text } from 'react-native';

import { styles } from './styles';

import { Comment } from '../../Model/Comment';

interface PostItemProps {
  comment: Comment;
}

export default function CommentsList({ comment }: PostItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.containerComments}>
        <View style={styles.comments}>
          <UserCircle color='white' size={32} weight='thin' />
          <Text style={styles.commentsName}>{comment.profile.name}</Text>
        </View>
        <Text style={styles.commentsDescription}>{comment.description}</Text>
      </View>
    </View>
  );
}
