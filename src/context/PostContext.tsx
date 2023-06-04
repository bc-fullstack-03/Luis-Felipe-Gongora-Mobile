import React, { useReducer, ReactNode, createContext } from 'react';

import { api } from '../services/api';
import { Post } from '../Screens/Model/Post';
import { getProfile, getAuthHeader } from '../services/auth';

interface PostContext {
  posts: Post[];
  getPosts?: () => void;
  likePost?: ({ postId }: { postId: string }) => void;
  unlikePost?: ({ postId }: { postId: string }) => void;
}

const defaultValue = {
  posts: [],
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

  const likePost = async ({ postId }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/like`, null, authHeader);
      const profile = await getProfile();
      dispatch({
        type: 'like_post',
        payload: { id: postId, profile },
      });
    } catch (err) {}
  };

  const unlikePost = async ({ postId }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/unlike`, null, authHeader);
      const profile = await getProfile();
      dispatch({
        type: 'unlike_post',
        payload: { id: postId, profile },
      });
    } catch (err) {
      alert('erro no unlike');
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getPosts,
        likePost,
        unlikePost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
