import styles from "./Posts.module.css";
import {
  getPosts,
  updatePostById,
  deletePostById,
  createPost,
} from "../../services/api/post.api";

import { useEffect, useReducer } from "react";

import Button from "../../shared/Button/Button";
import PostDeleteModal from "../../shared/PostDeleteModal";
import PostEditModal from "../../shared/PostEditModal";
import PostCreateModal from "../../shared/PostCreateModal/PostCreateModal";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  showDeleteModal: false,
  showEditModal: false,
  showCreateModal: false,
  selectedPost: null,
};

const TYPES = {
  FETCH_POSTS_START: "FETCH_POSTS_START",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_ERROR: "FETCH_POSTS_ERROR",

  OPEN_DELETE_MODAL: "OPEN_DELETE_MODAL",
  CLOSE_DELETE_MODAL: "CLOSE_DELETE_MODAL",

  OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL",
  CLOSE_EDIT_MODAL: "CLOSE_EDIT_MODAL",

  OPEN_CREATE_MODAL: "OPEN_CREATE_MODAL",
  CLOSE_CREATE_MODAL: "CLOSE_CREATE_MODAL",
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.FETCH_POSTS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case TYPES.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        posts: action.payload,
      };

    case TYPES.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case TYPES.OPEN_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: true,
        selectedPost: action.payload,
      };

    case TYPES.CLOSE_DELETE_MODAL:
      return {
        ...state,
        showDeleteModal: false,
        selectedPost: null,
      };

    case TYPES.OPEN_EDIT_MODAL:
      return {
        ...state,
        showEditModal: true,
        selectedPost: action.payload,
      };

    case TYPES.CLOSE_EDIT_MODAL:
      return {
        ...state,
        showEditModal: false,
        selectedPost: null,
      };

    case TYPES.OPEN_CREATE_MODAL:
      return {
        ...state,
        showCreateModal: true,
      };

    case TYPES.CLOSE_CREATE_MODAL:
      return {
        ...state,
        showCreateModal: false,
      };

    default:
      return state;
  }
}

export default function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    posts,
    loading,
    error,
    showDeleteModal,
    showEditModal,
    showCreateModal,
    selectedPost,
  } = state;

  const fetchPosts = async () => {
    dispatch({ type: TYPES.FETCH_POSTS_START });

    const response = await getPosts();

    if (response.result) {
      dispatch({
        type: TYPES.FETCH_POSTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({ type: TYPES.FETCH_POSTS_ERROR });
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenDeleteModal = (post) => {
    dispatch({
      type: TYPES.OPEN_DELETE_MODAL,
      payload: post,
    });
  };

  const handleCloseDeleteModal = () => {
    dispatch({ type: TYPES.CLOSE_DELETE_MODAL });
  };

  const handleOpenEditModal = (post) => {
    dispatch({
      type: TYPES.OPEN_EDIT_MODAL,
      payload: post,
    });
  };

  const handleCloseEditModal = () => {
    dispatch({ type: TYPES.CLOSE_EDIT_MODAL });
  };

  const handleOpenCreateModal = () => {
    dispatch({ type: TYPES.OPEN_CREATE_MODAL });
  };

  const handleCloseCreateModal = () => {
    dispatch({ type: TYPES.CLOSE_CREATE_MODAL });
  };

  const handleDeletePostById = async () => {
    if (!selectedPost) return;

    dispatch({ type: TYPES.FETCH_POSTS_START });

    const response = await deletePostById(selectedPost.id);

    if (response.result) {
      const filteredPosts = posts.filter((post) => post.id !== selectedPost.id);

      dispatch({
        type: TYPES.FETCH_POSTS_SUCCESS,
        payload: filteredPosts,
      });

      handleCloseDeleteModal();
    } else {
      dispatch({ type: TYPES.FETCH_POSTS_ERROR });
    }
  };

  const handleUpdatePostById = async (updatedData) => {
    if (!selectedPost) return;

    dispatch({ type: TYPES.FETCH_POSTS_START });

    const response = await updatePostById(selectedPost.id, updatedData);

    if (response.result) {
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? { ...post, ...updatedData } : post,
      );

      dispatch({
        type: TYPES.FETCH_POSTS_SUCCESS,
        payload: updatedPosts,
      });

      handleCloseEditModal();
    } else {
      dispatch({ type: TYPES.FETCH_POSTS_ERROR });
    }
  };

  const handleCreatePost = async (newPost) => {
    dispatch({ type: TYPES.FETCH_POSTS_START });

    const response = await createPost(newPost);

    if (response.result) {
      dispatch({
        type: TYPES.FETCH_POSTS_SUCCESS,
        payload: [response.data, ...posts],
      });

      handleCloseCreateModal();
    } else {
      dispatch({ type: TYPES.FETCH_POSTS_ERROR });
    }
  };

  return (
    <article className={styles.posts}>
      <Button
        text="Add Post"
        className={styles.addPostButton}
        onClick={handleOpenCreateModal}
      />

      <h2 className={styles.title}>Posts</h2>

      {loading && <p className={styles.loading}>Loading...</p>}

      {error && <p className={styles.error}>Error fetching posts.</p>}

      {!loading && !error && (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postBody}>{post.body}</p>

              <div className={styles.buttonGroup}>
                <Button
                  text="Delete"
                  onClick={() => handleOpenDeleteModal(post)}
                />

                <Button text="Edit" onClick={() => handleOpenEditModal(post)} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {showEditModal && selectedPost && (
        <PostEditModal
          show={showEditModal}
          title={selectedPost.title}
          body={selectedPost.body}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdatePostById}
        />
      )}

      {showDeleteModal && selectedPost && (
        <PostDeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeletePostById}
        />
      )}

      {showCreateModal && (
        <PostCreateModal
          show={showCreateModal}
          onClose={handleCloseCreateModal}
          onCreate={handleCreatePost}
        />
      )}
    </article>
  );
}
