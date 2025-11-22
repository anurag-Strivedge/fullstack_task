import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 6;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Add placeholder images to posts
        const postsWithImages = data.map((post, index) => ({
          ...post,
          image: `https://picsum.photos/400/300?random=${index}`
        }));

        setPosts(postsWithImages);
        setDisplayedPosts(postsWithImages);

        // Show loading screen for 5 seconds
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchPosts();
  }, []);

  // Get current posts for pagination
  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return displayedPosts.slice(indexOfFirstPost, indexOfLastPost);
  };

  // Get total pages
  const getTotalPages = () => {
    return Math.ceil(displayedPosts.length / postsPerPage);
  };

  // Remove post and adjust pagination
  const removePost = (postId) => {
    const updatedPosts = displayedPosts.filter(post => post.id !== postId);
    setDisplayedPosts(updatedPosts);

    // Adjust current page if necessary
    const newTotalPages = Math.ceil(updatedPosts.length / postsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  // Toggle view
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle feedback modal
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  // Post detail modal handlers
  const openPostDetail = (post) => {
    setSelectedPost(post);
  };

  const closePostDetail = () => {
    setSelectedPost(null);
  };

  const value = {
    posts,
    displayedPosts,
    loading,
    currentPage,
    isGridView,
    showFeedback,
    selectedPost,
    postsPerPage,
    getCurrentPosts,
    getTotalPages,
    removePost,
    toggleView,
    goToPage,
    nextPage,
    prevPage,
    toggleFeedback,
    openPostDetail,
    closePostDetail
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
