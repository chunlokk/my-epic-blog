import './App.css';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const featuredPost = {
  slug: 'why-best-blog',
  title: 'Why This is the Best Blog',
  excerpt: 'This is the best blog ever because it does not use Wordpress. The end.',
};

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="main-content">
          <div className="welcome-section">
            <h1>Welcome to My Cool Blog</h1>
            <p>Testimonials: 5/5 stars</p>
          </div>
          <div className="featured-post">
            <h2>Featured Post</h2>
            <Link to={`/blogs/${featuredPost.slug}`} className="blog-card-link">
              <BlogCard post={featuredPost} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
