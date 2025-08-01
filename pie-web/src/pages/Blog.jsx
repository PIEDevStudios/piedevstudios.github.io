import useBlogPosts from "../hooks/useBlogPosts";
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate(); 
  const { blogs, loading, error } = useBlogPosts();

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (blogs.length === 0) return <div>No blogs found</div>;

  return (
    <div className="bg-beige min-h-screen">
      <div className="margin">
        <h1>Blogs</h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {blogs.map((blog, index) => (
            <article 
              key={index} 
              role="button"
              onClick={() => navigate(`/IndvBlog/${blog.slug}`)}
              className="border border-white p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              {blog.frontmatter.thumbnail && (
                <img 
                  src={blog.frontmatter.thumbnail} 
                  alt={blog.frontmatter.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error('Failed to load image:', blog.frontmatter.thumbnail);
                  }}
                />
              )}
              <h2>{blog.frontmatter.title}</h2>
              <p>{new Date(blog.frontmatter.date).toLocaleDateString()} {" "} {new Date(blog.timestamp).toLocaleTimeString()}</p>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;