import './BlogCard.css';

export default function BlogCard({ post }) {
    return (
        <div className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
        </div>
    )
}