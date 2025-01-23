import React, { useState, useEffect } from 'react';
import '../css_files/posts.css'
const Posts = ({ userName }) => {
    const username=localStorage.getItem("loggedInUser").username;
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [newComment, setNewComment] = useState('');
 
    // שליפת הפוסטים מהשרת
    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    // חיפוש פוסטים לפי מספר מזהה או כותרת
    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filtered = posts.filter(post =>
            post.id.toString().includes(e.target.value) ||
            post.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    // הוספת פוסט חדש
    const handleAddPost = () => {
        const newPostData = { title: newPost.title, body: newPost.body, userId: 1 }; // הוספת userId בהתאם למידע שלך
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPostData),
        })
            .then(response => response.json())
            .then(data => {
                setPosts([...posts, data]);
                setFilteredPosts([...posts, data]);
                setNewPost({ title: '', body: '' }); // אפס את הנתונים
            })
            .catch(error => console.error('Error adding post:', error));
    };

    // עדכון פוסט
    const handleUpdatePost = (postId) => {
        const updatedPost = { ...selectedPost, title: selectedPost.title, body: selectedPost.body };
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
            .then(response => response.json())
            .then(data => {
                setPosts(posts.map(post => post.id === postId ? data : post));
                setFilteredPosts(posts.map(post => post.id === postId ? data : post));
                setSelectedPost(null); // סיום עריכת פוסט
            })
            .catch(error => console.error('Error updating post:', error));
    };

    // מחיקת פוסט
    const handleDeletePost = (postId) => {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setPosts(posts.filter(post => post.id !== postId));
                setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
            })
            .catch(error => console.error('Error deleting post:', error));
    };


    const handleAddComment = (postId) => { 
        // מכינים את התגובה שנרצה להוסיף בפורמט המבוקש
        const comment = {
            postId: postId,        // מזהה הפוסט שאליו התגובה שייכת
            id: Date.now().toString(), // מזהה ייחודי לתגובה (אפשר להשתמש בתאריך או UUID)
            name: 'User Name',     // שם המשתמש (ניתן לשנות בהתאם לדרישות)
            email: 'user@example.com', // אימייל המשתמש (ניתן לשנות בהתאם לדרישות)
            body: newComment,      // התגובה עצמה
        };
    
        // שולפים את התגובות הקיימות מהשרת
        fetch('http://localhost:3000/comments')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return response.json();
            })
            .then(allComments => {
                // סינון התגובות לפי postId
                const filteredComments = allComments.filter(c => c.postId === postId);
    
                // הוספת התגובה החדשה לשרת
                return fetch('http://localhost:3000/comments', {
                    method: 'POST', // פעולה של הוספה
                    headers: {
                        'Content-Type': 'application/json', // אנחנו שולחים נתונים בפורמט JSON
                    },
                    body: JSON.stringify(comment), // הופכים את התגובה למחרוזת JSON
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add new comment');
                    }
                    return response.json().then(newComment => ({ filteredComments, newComment }));
                });
            })
            .then(({ filteredComments, newComment }) => {
                // עדכון הפוסט עם כל התגובות
                const updatedPost = {
                    ...selectedPost, // שומרים את כל הנתונים הקיימים בפוסט
                    comments: [...filteredComments, newComment], // מוסיפים את התגובה החדשה
                };
    
                // מעדכנים את הסטייט עם הפוסט המעודכן
                setSelectedPost(updatedPost);
    
                // מאפסים את שדה התגובה אחרי הוספה
                setNewComment('');
            })
            .catch(error => {
                // במקרה של שגיאה במהלך הוספת התגובה או שליפת התגובות
                console.log('Error handling comments:', error);
            });
    };
    

    // הצגת התגובות של הפוסט הנבחר
    const handleShowComments = (postId) => {
        fetch(`http://localhost:3000/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => {
                setSelectedPost({
                    ...selectedPost,
                    comments: data,
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    // הצגת פוסט נבחר ועריכת תוכן
    const handleSelectPost = (post) => {
        setSelectedPost(post);
    };

    return (
        <div>
            <h2>פוסטים של {userName}</h2>




            {/* הצגת הפוסטים */}
            {/* <ul> */}
            {/* חיפוש */}
            <input id="search"
                type="text"
                placeholder="חפש פוסט לפי מזהה או כותרת"
                value={search}
                onChange={handleSearch}
            />
            <div id="posts-container">

                {filteredPosts.map(post => (
                    // <li key={post.id}>
                    <div id="singlePost">
                        <p id="postcontent">#{post.id} - {post.title}</p>
                        <button id="chackPost" onClick={() => handleSelectPost(post)}>בחר פוסט</button>
                        <button id="deletPost" onClick={() => handleDeletePost(post.id)}>מחק</button>
                    </div>
                    // </li>
                ))}
            </div>

            {/* </ul> */}


            <div id="selectad-post">
                {/* הופת פוסט חדש */}
                <div id="addpost">
                    <input
                        type="text"
                        placeholder="כותרת"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <textarea
                        placeholder="תוכן הפוסט"
                        value={newPost.body}
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    />
                    <button onClick={handleAddPost}>הוסף פוסט</button>

                </div>

                {/* הצגת פוסט נבחר */}
                {selectedPost && (
                    <div>
                        <div>
                            <h3>{selectedPost.title}</h3>
                            <p>{selectedPost.body}</p>
                            {/* הוספת/עדכון פוסט */}
                            <div>
                                <input
                                    type="text"
                                    value={selectedPost.title}
                                    onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                                />
                                <textarea
                                    value={selectedPost.body}
                                    onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
                                />
                                <button onClick={() => handleUpdatePost(selectedPost.id)}>עדכן פוסט</button>
                            </div>
                        </div>
                        {/* הצגת תגובות */}
                        <button onClick={() => handleShowComments(selectedPost.id)}>הצג תגובות</button>
                        <div id="Show-comments">
                            {selectedPost.comments && selectedPost.comments.map(comment => (
                                <div key={comment.id}>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                        </div>

                        {/* הוספת תגובה */}
                        <div>
                            <textarea
                                placeholder="הוסף תגובה"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={() => handleAddComment(selectedPost.id)}>הוסף תגובה</button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Posts;
