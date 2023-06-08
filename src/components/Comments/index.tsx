import React, { useContext, useState, useEffect } from 'react';
import { Heart, UserCircle } from 'phosphor-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { getProfile } from '../../services/auth';

import { Comment } from '../../Model/Comment';
import { Context as PostContext } from '../../context/PostContext';

interface PostItemProps {
  comment: Comment;
  postId: string;
}

export default function CommentsList({ comment, postId }: PostItemProps) {
  const { handleLikeComment } = useContext(PostContext);
  const [profile, setProfile] = useState('');

  const fetchProfile = async () => {
    const userProfile = await getProfile();
    setProfile(userProfile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerComments}>
        <View style={styles.comments}>
          <UserCircle color='white' size={32} weight='thin' />
          <Text style={styles.commentsName}>{comment.profile.name}</Text>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.commentsDescription}>{comment.description}</Text>
          <TouchableOpacity
            onPress={() => {
              handleLikeComment(comment, comment._id, postId);
            }}
          >
            {comment.likes.includes(profile) ? (
              <Heart size={24} color='red' weight='fill' />
            ) : (
              <Heart size={24} color='white' weight='thin' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
