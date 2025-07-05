import { useState, useEffect } from 'react';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        body: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setLoading(false);
            });
    }, [postId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.name || !newComment.email || !newComment.body) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    postId: postId,
                    name: newComment.name,
                    email: newComment.email,
                    body: newComment.body
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            
            const result = await response.json();
            
            // Add the new comment to the existing comments list
            const newCommentWithId = {
                ...newComment,
                id: result.id || Date.now(), // Use returned ID or timestamp as fallback
                postId: postId
            };
            
            setComments(prev => [newCommentWithId, ...prev]);
            
            // Reset form
            setNewComment({
                name: '',
                email: '',
                body: ''
            });
            
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            
            {/* Add Comment Form */}
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={newComment.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={newComment.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="body"
                        placeholder="Write your comment..."
                        value={newComment.body}
                        onChange={handleInputChange}
                        className="form-textarea"
                        rows="4"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="add-comment-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Comment...' : 'Add Comment'}
                </button>
            </form>

            {/* Comments List */}
            <div className="comments-list">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}