import './Comment.css';

export default function Comment({ comment }) {
    return (
        <div className="comment">
            <h4>{comment.user.fullName}</h4>
            <p>{comment.body}</p>
        </div>
    );
}