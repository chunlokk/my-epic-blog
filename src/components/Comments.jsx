import { useState, useEffect } from 'react';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({
        body: '',
        userId: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch(`https://dummyjson.com/comments/post/${postId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data.comments || []);
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
        if (!newComment.body || !newComment.userId) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://dummyjson.com/comments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: newComment.body,
                    postId: postId,
                    userId: Number(newComment.userId)
                })
            });
            const result = await response.json();
            if (!response.ok) {
                alert(`Failed to add comment. Please try again: ${result.message}`);
                setIsSubmitting(false);
                return;
            }
            // Add the new comment to the existing comments list
            setComments(prev => [result, ...prev]);
            // Reset form
            setNewComment({
                body: '',
                userId: ''
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
                        type="number"
                        name="userId"
                        placeholder="Your User ID"
                        value={newComment.userId}
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