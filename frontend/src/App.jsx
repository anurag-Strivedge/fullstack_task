import React from 'react';
import { useAppContext } from './context/AppContext';
import Loading from './components/Loading.jsx';
import Sidebar from './components/Sidebar.jsx';
import Card from './components/Card.jsx';
import Pagination from './components/Pagination.jsx';
import PostDetailModal from './components/PostDetailModal.jsx';
import './App.css';

function App() {
  const { loading, getCurrentPosts, isGridView, selectedPost, closePostDetail, showFeedback } = useAppContext();

  if (loading) {
    return <Loading />;
  }

  const currentPosts = getCurrentPosts();

  return (
    <div className="app">
      <Sidebar />
      <div className={`main-content ${showFeedback ? 'blurred' : ''}`}>
        <div className={`cards-container ${isGridView ? 'grid-view' : 'list-view'}`}>
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
              <Card key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>No posts available</p>
            </div>
          )}
        </div>
        <Pagination />
      </div>
      <PostDetailModal post={selectedPost} onClose={closePostDetail} />
    </div>
  );
}

export default App;
