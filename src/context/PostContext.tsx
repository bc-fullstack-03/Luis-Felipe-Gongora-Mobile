import * as SecureStore from 'expo-secure-store';
import React, { useReducer, ReactNode, createContext } from 'react';

import { Environment } from '../env';
import { Post } from '../Model/Post';
import { api } from '../services/api';
import { navigate } from '../RootNavigation';
import { Comment } from '../Model/Comment';
import { getProfile, getAuthHeader, getUser } from '../services/auth';

interface PostContext {
  posts: Post[];
  getPosts?: () => void;
  likePost?: ({ postId, profile }: { postId: string; profile: string }) => void;
  unlikePost?: ({
    postId,
    profile,
  }: {
    postId: string;
    profile: string;
  }) => void;
  createPost?: (postData) => void;
  getPost?: (postId: string) => void;
  sendComments?: ({
    description,
    postId,
  }: {
    description: string;
    postId: string;
  }) => void;
  handleLikeComment?: (
    comments: Comment,
    commentId: string,
    postId: string
  ) => void;
  post?: Post;
}

const defaultValue = {
  posts: [],
  post: null,
};

const Context = createContext<PostContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'show_posts':
        return {
          ...state,
          posts: action.payload,
        };
      case 'like_post':
        const newPostsLike = state.posts;
        const [postLiked, ..._] = newPostsLike.filter(
          (post) => post._id === action.payload.id
        );
        postLiked.likes.push(action.payload.profile);
        return {
          posts: [...newPostsLike],
        };
      case 'unlike_post':
        const newPostsUnlike = state.posts;
        const [postUnliked, ...rest] = newPostsUnlike.filter(
          (post) => post._id === action.payload.id
        );
        const index = postUnliked.likes.indexOf(action.payload.profile);
        postUnliked.likes.splice(index, 1);
        return {
          posts: [...newPostsUnlike],
        };
      case 'create_post':
        return { posts: [action.payload, ...state.posts] };
      case 'get_post':
        return { ...state, post: action.payload };
      case 'send_comments':
        return { ...state };
      case 'handle_like_comment':
        return { ...state };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPosts = async () => {
    try {
      const authHeader = await getAuthHeader();
      const { data } = await api.get('/feed', authHeader);

      dispatch({ type: 'show_posts', payload: data });
    } catch (err) {
      alert('Erro ao obter o feed');
    }
  };

  const likePost = async ({ postId, profile }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/like`, null, authHeader);
      dispatch({
        type: 'like_post',
        payload: { id: postId, profile: profile },
      });
    } catch (err) {
      console.log('Erro no like');
    }
  };

  const unlikePost = async ({ postId, profile }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/unlike`, null, authHeader);
      const profile = await getProfile();
      dispatch({
        type: 'unlike_post',
        payload: { id: postId, profile: profile },
      });
    } catch (err) {
      console.log('erro no unlike');
    }
  };

  const createPost = async ({ title, description, image }) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const user = await getUser();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', image);

      const { data } = await api.post('posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const correctData = {
        ...data,
        description: image
          ? `http://${Environment.IP}:9000/${data.description}`
          : data.description,
        profile: { name: user },
      };

      dispatch({
        type: 'create_post',
        payload: { ...correctData },
      });
      navigate('PostList');
    } catch (err) {
      console.log(err);
    }
  };

  const getPost = async (_postId: string) => {
    try {
      const authHeader = await getAuthHeader();
      const { data } = await api.get(`/posts/${_postId}`, authHeader);
      dispatch({
        type: 'get_post',
        payload: data,
      });
      navigate('Comments');
    } catch (err) {
      console.log(err);
    }
  };

  const sendComments = async ({ description, postId }) => {
    try {
      const authHeader = await getAuthHeader();

      const data = {
        description: description,
      };

      await api.post(`/posts/${postId}/comments`, data, authHeader);
      getPost(postId);
      getPosts();
      dispatch({
        type: 'send_comments',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeComment = async (comments, commentId, postId) => {
    try {
      const authHeader = await getAuthHeader();
      const profile = await getProfile();

      if (!comments.likes.includes(profile)) {
        await api.post(
          `/posts/${postId}/comments/${commentId}/like`,
          null,
          authHeader
        );
        getPost(postId);
        getPosts();
      } else {
        await api.post(
          `/posts/${postId}/comments/${commentId}/unlike`,
          null,
          authHeader
        );
        getPost(postId);
        getPosts();
      }
      dispatch({
        type: 'handle_like_comment',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getPosts,
        likePost,
        unlikePost,
        createPost,
        getPost,
        sendComments,
        handleLikeComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
