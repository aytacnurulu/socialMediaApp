import styles from "./Posts.module.css";
import {
  getPosts,
  updatePostById,
  deletePostById,
  createPost,
} from "../../services/api/post.api";
import { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import PostDeleteModal from "../../shared/PostDeleteModal";
import PostEditModal from "../../shared/PostEditModal";
import PostCreateModal from "../../shared/PostCreateModal/PostCreateModal";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);

      const response = await getPosts();

      if (response.result) {
        setPosts(response.data);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleOpenDeleteModal = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPost(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPost(null);
  };

  const handleDeletePostById = async () => {
    if (!selectedPost) return;

    setLoading(true);

    const response = await deletePostById(selectedPost.id);

    if (response.result) {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== selectedPost.id),
      );

      handleCloseDeleteModal();
    } else {
      setError(true);
    }

    setLoading(false);
  };

  const handleUpdatePostById = async (updatedData) => {
    if (!selectedPost) return;

    setLoading(true);

    const response = await updatePostById(selectedPost.id, updatedData);

    if (response.result) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id ? { ...post, ...updatedData } : post,
        ),
      );

      handleCloseEditModal();
    } else {
      setError(true);
    }

    setLoading(false);
  };

  const handleCreatePost = async (newPost) => {
    const response = await createPost(newPost);

    if (response.result) {
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setShowCreateModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <article className={styles.posts}>
      <Button
        text="Add Post"
        className={styles.addPostButton}
        onClick={() => setShowCreateModal(true)}
      />

      <h2 className={styles.title}></h2>
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
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePost}
        />
      )}
    </article>
  );
}
