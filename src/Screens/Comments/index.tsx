import React, { useContext, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { styles } from './styles';

import { THEME } from '../../theme';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { Context as PostContext } from '../../context/PostContext';
import PostItem from '../../components/PostItem';
import CommentsList from '../../components/Comments';

function Comments() {
  const { sendComments, post } = useContext(PostContext);

  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
        <PostItem postDetail post={post} />
        <View style={styles.heading}>
          <Text style={styles.title}>Comentários</Text>
          <Spacer>
            <Input.Root>
              <Input.Input
                value={description}
                onChangeText={setDescription}
                placeholder='Deixe seu comentário!'
                placeholderTextColor={THEME.COLORS.INPUT}
              />
            </Input.Root>
            <Spacer />
            <Button
              title='Comentar'
              onPress={() => {
                sendComments({ description, postId: post._id });
                setDescription('');
              }}
            />
          </Spacer>
        </View>
      </KeyboardAvoidingView>
      <FlatList
        data={post.comments}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => <CommentsList comment={item} />}
      />
    </View>
  );
}

export default Comments;
