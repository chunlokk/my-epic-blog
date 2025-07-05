import { useParams } from 'react-router-dom';
import WhyBestBlog from './blogs/WhyBestBlog';
import AboutAuthor from './blogs/AboutAuthor';
import Comments from '../components/Comments';

const blogComponents = {
  'why-best-blog': WhyBestBlog,
  'about-author': AboutAuthor,
};

export default function BlogPage() {
  const { slug } = useParams();
  const BlogComponent = blogComponents[slug];

  if (!BlogComponent) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-page">
      <BlogComponent />
      <Comments postId={BlogComponent.postId} />
    </div>
  );
}
