import React from 'react';
import './PostDetailModal.css';

const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  const formatDate = () => {
    return 'Monday, January 28th, 2020';
  };

  return (
    <div className="post-detail-overlay" onClick={onClose}>
      <div className="post-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="post-detail-header">
          <button className="post-detail-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="post-detail-content">
          <h1 className="post-detail-title">{post.title}</h1>

          <div className="post-detail-meta">
            <p className="post-detail-author">by User {post.userId}</p>
            <p className="post-detail-date">{formatDate()}</p>
          </div>

          {post.image && (
            <div className="post-detail-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div className="post-detail-body">
            {post.body.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="post-detail-footer">
            <div className="post-detail-info">
              <span className="post-detail-label">Post ID:</span>
              <span className="post-detail-value">#{post.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
