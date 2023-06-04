import { useContext } from 'react';
import { Chat, Heart, UserCircle } from 'phosphor-react-native';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Spacer from '../Spacer';
import { styles } from './styles';

import { Post } from '../../Screens/Model/Post';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { profile } = useContext(AuthContext);
  const { likePost, unlikePost } = useContext(PostContext);

  function handleLike() {
    if (post.likes.includes(profile)) {
      unlikePost({ postId: post._id });
    } else {
      likePost({ postId: post._id });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color='white' size={48} weight='thin' />
        <Text style={styles.profileName}>{post.profile.name}</Text>
      </View>
      <Spacer>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Spacer />
        {post.image ? (
          <Image source={{ uri: post.description }} style={styles.image} />
        ) : (
          <Text style={styles.description}>{post.description}</Text>
        )}
      </Spacer>
      <View style={styles.footer}>
        <Chat size={24} color='white' weight='thin' />
        <Text style={styles.number}>{post.comments.length}</Text>
        <TouchableOpacity onPress={handleLike}>
          {post.likes.includes(profile) ? (
            <Heart size={24} color='red' weight='fill' />
          ) : (
            <Heart size={24} color='white' weight='thin' />
          )}
        </TouchableOpacity>
        <Text style={styles.number}>{post.likes.length}</Text>
      </View>
    </View>
  );
}
