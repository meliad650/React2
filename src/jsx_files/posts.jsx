import React, { useState, useEffect } from 'react';
import '../css_files/posts.css';
import { data } from 'react-router-dom';

const Posts = ({ userName }) => {
  const current = JSON.parse(localStorage.getItem("loggedInUser"));
  const [posts, setPosts] = useState([]);
  const [comments, setComment] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState(10);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [search, setSearch] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newCommentTitle, setNewCommentTitle] = useState('');
  // Fetch posts from server
  useEffect(() => {
    fetch('http://localhost:3000/posts?_embed=comments')
      .then(response => response.json())
      .then(data => {
        const sortedPosts = data.sort((a, b) => a.id - b.id); // Sort posts by ID (newest first)
        setPosts(sortedPosts);
        setDisplayedPosts(sortedPosts.slice(0, postsToShow));
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Fetch comments from server
  useEffect(() => {
    fetch('http://localhost:3000/comments')
      .then(response => response.json())
      .then(data => {
        const sortedcomments = data.sort((a, b) => b.id - a.id); // Sort posts by ID (newest first)
        setComment(sortedcomments);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Load more posts
  const loadMorePosts = () => {
    const nextPosts = posts.slice(displayedPosts.length, displayedPosts.length + postsToShow);
    setDisplayedPosts(prev => [...prev, ...nextPosts]);

    if (displayedPosts.length + nextPosts.length >= posts.length) {
      setAllPostsLoaded(true);
    }
  };

  // Toggle post expansion
  const toggleExpandPost = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };


  // Add comment to a post
  const handleAddComment = (postId) => {
    fetch('http://localhost:3000/comments')
      .then(response => response.json())
      .then(comments => {
        const maxCommentId = comments.reduce((maxId, comment) => Math.max(maxId, comment.id), 0); // Find max ID
        const newCommentId = maxCommentId + 1;

        const comment = {
          postId: postId,
          id: newCommentId,
          name: newCommentTitle,
          email: current.email,
          body: newComment,
        };

        return fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(comment),
        });
      })
      .then(response => response.json())
      .then(newCommentData => {
        setPosts(prevPosts => {
          return prevPosts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                comments: [...(post.comments || []), newCommentData],
              };
            }
            return post;
          });
        });
        setNewComment('');
        setNewCommentTitle('');
      })
      .catch(error => console.error('Error adding comment:', error));
  };




  const handleAddPost = () => {
    // Find the highest existing ID in the posts array
    const highestId = posts.reduce((maxId, post) => Math.max(maxId, parseInt(post.id, 10)), 0);
    const newPostId = highestId + 1;
    console.log(newPostId);
    // Prepare the new post data
    const newPostData = {
      userId: current.id,
      id: newPostId.toString(),
      title: newPost.title,
      body: newPost.body,
    };

    // Save the new post to the server
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostData),
    })
      .then(response => response.json())
      .then(data => {
        // Update the posts state with the new post
        const updatedPosts = [data, ...posts];
        setPosts(updatedPosts);
        setDisplayedPosts(updatedPosts.slice(0, displayedPosts.length + 1));
        setNewPost({ title: '', body: '' });
      })
      .catch(error => console.error('Error adding post:', error));
  };




  const deletePost = async (id) => {
    try {
      // שליחת בקשת DELETE לשרת
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // עדכון ה-state לאחר המחיקה
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts); // עדכון המצב של כל הפוסטים
        setDisplayedPosts(updatedPosts.slice(0, displayedPosts.length)); // עדכון הפוסטים המוצגים
  
        alert("Post deleted successfully!");
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  };

  
  const updateBody = async (id, newBody) => {
    if (!newBody.trim()) {
      alert("Please enter a valid body.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: newBody }),
      });

      if (response.ok) {
        // עדכון התצוגה בזמן אמת
        setPosts((prevData) =>
          prevData.map((post) =>
            post.id === id ? { ...post, body: newBody } : post
          )
        );
        alert("post Body updated successfully!");
      } else {
        alert("Failed to update body on the server. Please try again.");
      }
    } catch (error) {
      console.error("Error updating body:", error);
      alert("An error occurred while updating the body.");
    }
  };




  // Search posts
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedPosts(filtered.slice(0, postsToShow));
  };


  return (
    <div>
      <h2 style={headingStyle}>פוסטים</h2>
      <input
        type="text"
        placeholder="חפש פוסט לפי כותרת"
        value={search}
        onChange={handleSearch}
        style={searchStyle}
      />

      <div style={addPostStyle}>
        <h3>הוספת פוסט חדש</h3>
        <input
          type="text"
          placeholder="כותרת"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="תוכן הפוסט"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          style={textareaStyle}
        />
        <button onClick={handleAddPost} style={buttonStyle}>
          הוסף פוסט
        </button>
      </div>

      <div id="posts-container">
        {displayedPosts.map(post => (
          <div key={post.id} style={postStyle}>
            <div style={postHeaderStyle}>
              <p style={textStyle}>#{post.id} - {post.title}</p>
              <button onClick={() => toggleExpandPost(post.id)} style={expandButtonStyle}>
                {expandedPostId === post.id ? 'צמצם' : 'הרחב'}
              </button>
            </div>
            {expandedPostId === post.id && (
              <div style={expandedPostStyle}>
                <p style={textStyle}>{post.body}</p>
                <h4>תגובות:</h4>
                <ul>
                  {comments
                    ?.filter(comment => comment.postId == post.id) // סינון לפי post.id
                    .map(comment => (
                      <li key={comment.id} style={commentStyle}>
                        <h5>{comment.name}</h5>
                        <p id="comP">{comment.body}</p>
                      </li>
                    ))}
                </ul>

                <input type="text"
                  value={newCommentTitle}
                  onChange={(e) => setNewCommentTitle(e.target.value)}
                  placeholder="כותרת תגובה"
                />
                <textarea
                  placeholder="תוכן תגובה"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={textareaStyle}
                />
                <button onClick={() => handleAddComment(post.id)} style={buttonStyle}>
                  הוסף תגובה
                </button>

                {post.userId == current.id && (
                  <>
                  <button onClick={() => deletePost(post.id)} style={buttonStyle}>
                    מחיקת פוסט
                  </button>
                  <button
                  onClick={() => {
                    const newBody = prompt('Enter new title:', post.name);
                    if (newBody) updateBody(post.id, newBody);
                  }}
                >
                  ערוך פוסט
                </button></>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!allPostsLoaded ? (
        <button onClick={loadMorePosts} style={buttonStyle}>
          טען עוד פוסטים
        </button>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'black' }}>אין עוד פוסטים</p>
      )}
    </div>
  );
};

export default Posts;

const headingStyle = {
  color: 'black',
  textAlign: 'center',
  marginBottom: '20px',
};

const searchStyle = {
  display: 'block',
  width: '80%',
  margin: '0 auto 20px',
  padding: '10px',
  fontSize: '16px',
};

const addPostStyle = {
  width: '50%',
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

const postStyle = {
  width: '50%',
  margin: '10px auto',
  padding: '10px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
};

const postHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const expandedPostStyle = {
  marginTop: '10px',
  paddingTop: '10px',
  borderTop: '1px solid #ccc',
};

const textStyle = {
  color: 'black',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  fontSize: '16px',
};

const textareaStyle = {
  display: 'block',
  width: '100%',
  height: '50px',
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px 10px',
  backgroundColor: '#6200ea',
  color: '#fff',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  margin: '1px',

};

const expandButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f0f0f0',
  color: 'black',
  marginLeft: '10px',
  width: '70px',
};

const commentStyle = {

  color: 'black',
  marginBottom: '5px',
};
