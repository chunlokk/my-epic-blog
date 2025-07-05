import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import './Blogs.css';

const posts = [
  {
    slug: 'why-best-blog',
    title: 'Why This is the Best Blog',
    excerpt: 'This is the best blog ever because it does not use Wordpress. The end.',
  },
  {
    slug: 'about-author',
    title: 'About the Author',
    excerpt: 'A short bio of the author.',
  },
];

export default function Blogs() {
  return (
    <div className="blogs-container">
      <h1>Blogs</h1>
      <div className="blog-list">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blogs/${post.slug}`} className="blog-card-link">
            <BlogCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}