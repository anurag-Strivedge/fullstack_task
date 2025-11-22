import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Card.css';

const Card = ({ post }) => {
  const { removePost, isGridView, openPostDetail } = useAppContext();

  const handleRemove = (e) => {
    e.stopPropagation();
    removePost(post.id);
  };

  const handleCardClick = () => {
    openPostDetail(post);
  };

  const formatDate = () => {
    return 'Mon, 21 Dec 2020 14:57 GMT';
  };

  if (isGridView) {
    return (
      <div className="card grid-card" onClick={handleCardClick}>
        <button className="close-btn" onClick={handleRemove}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="card-image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="card-content">
          <h3 className="card-title">{post.title}</h3>
          <p className="card-description">{post.body}</p>
          <p className="card-date">{formatDate()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card list-card" onClick={handleCardClick}>
      <div className="list-card-left">
        <div className="list-avatar">
          <img src={`https://i.pravatar.cc/50?img=${post.id}`} alt="Avatar" />
        </div>
        <div className="list-content">
          <h3 className="list-title">{post.title}</h3>
          <p className="list-description">{post.body}</p>
          <p className="list-date">{formatDate()}</p>
        </div>
      </div>
      <button className="list-close-btn" onClick={handleRemove}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Card;
