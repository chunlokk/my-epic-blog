import './Blog.css';

export default function Blog({ children }) {
    return (
        <article className="blog-post">
            {children}
        </article>
    )
}