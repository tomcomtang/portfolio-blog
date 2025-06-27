import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { getPostsWithWordPressTags } from "../../services/wordpressApi"
import { postsData } from "../../data/mockData"

// 模拟文章详情数据
const postDetails = {
  "getting-started-with-gatsby": {
    id: 1,
    title: "Getting Started with Gatsby",
    subtitle: "A comprehensive guide to building fast websites with Gatsby",
    author: "Tom Tang",
    authorAvatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
    tags: ["Gatsby", "React", "Web Development"],
    readTime: "8 min read",
    date: "2024-01-15",
    excerpt: "Learn how to build blazing fast websites with Gatsby, React, and GraphQL. This guide covers everything from setup to deployment.",
    content: `
      <h2>Introduction</h2>
      <p>Gatsby is a powerful static site generator that uses React and GraphQL to create blazing fast websites. In this comprehensive guide, we'll explore how to get started with Gatsby and build your first website.</p>
      
      <h2>Why Choose Gatsby?</h2>
      <p>Gatsby offers several advantages for modern web development:</p>
      <ul>
        <li><strong>Performance:</strong> Gatsby generates static sites that load incredibly fast</li>
        <li><strong>SEO Friendly:</strong> Static sites are naturally SEO-optimized</li>
        <li><strong>Developer Experience:</strong> Hot reloading, GraphQL data layer, and rich plugin ecosystem</li>
        <li><strong>Scalability:</strong> Can handle sites with thousands of pages</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Gatsby site, you'll need Node.js installed on your system. Then run:</p>
      <pre><code>npm install -g gatsby-cli
gatsby new my-gatsby-site
cd my-gatsby-site
gatsby develop</code></pre>
      
      <h2>Project Structure</h2>
      <p>A typical Gatsby project has the following structure:</p>
      <ul>
        <li><code>src/pages/</code> - React components that become pages</li>
        <li><code>src/components/</code> - Reusable React components</li>
        <li><code>src/templates/</code> - Page templates for dynamic content</li>
        <li><code>gatsby-config.js</code> - Site configuration</li>
        <li><code>gatsby-node.js</code> - Node.js APIs for customizing build process</li>
      </ul>
      
      <h2>Data Layer</h2>
      <p>Gatsby uses GraphQL as its data layer, allowing you to query data from various sources:</p>
      <ul>
        <li>Markdown files</li>
        <li>CMS systems (WordPress, Contentful, etc.)</li>
        <li>APIs</li>
        <li>Databases</li>
      </ul>
      
      <h2>Deployment</h2>
      <p>Gatsby sites can be deployed to various platforms:</p>
      <ul>
        <li><strong>Netlify:</strong> Drag and drop deployment</li>
        <li><strong>Vercel:</strong> Git-based deployment</li>
        <li><strong>GitHub Pages:</strong> Free hosting for open source projects</li>
        <li><strong>AWS S3:</strong> Scalable cloud hosting</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Gatsby is an excellent choice for building modern, performant websites. Its static site generation capabilities combined with React's component-based architecture make it a powerful tool for developers.</p>
      
      <p>In the next article, we'll dive deeper into Gatsby's data layer and learn how to work with GraphQL queries.</p>
    `
  },
  "advanced-css-techniques": {
    id: 2,
    title: "Advanced CSS Techniques",
    subtitle: "Master modern CSS with Flexbox, Grid, and Custom Properties",
    author: "Tom Tang",
    authorAvatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
    tags: ["CSS", "Frontend", "Design"],
    readTime: "12 min read",
    date: "2024-01-15",
    excerpt: "Explore advanced CSS techniques including Flexbox, CSS Grid, and CSS Custom Properties to create modern, responsive layouts.",
    content: `
      <h2>Modern CSS Landscape</h2>
      <p>CSS has evolved significantly over the years, introducing powerful layout systems and features that make web development more efficient and flexible.</p>
      
      <h2>CSS Flexbox</h2>
      <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. It's perfect for:</p>
      <ul>
        <li>Navigation menus</li>
        <li>Card layouts</li>
        <li>Form layouts</li>
        <li>Centering content</li>
      </ul>
      
      <h3>Basic Flexbox Example</h3>
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}</code></pre>
      
      <h2>CSS Grid</h2>
      <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.</p>
      
      <h3>Grid Layout Example</h3>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}</code></pre>
      
      <h2>CSS Custom Properties</h2>
      <p>CSS Custom Properties (CSS Variables) allow you to store and reuse values throughout your stylesheet.</p>
      
      <h3>Using CSS Variables</h3>
      <pre><code>:root {
  --primary-color: #76cfc5;
  --secondary-color: #ffb400;
  --text-color: #333;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: var(--spacing-unit);
}</code></pre>
      
      <h2>Responsive Design</h2>
      <p>Modern CSS makes responsive design easier than ever with media queries and flexible units.</p>
      
      <h3>Responsive Breakpoints</h3>
      <pre><code>/* Mobile first approach */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
  }
}</code></pre>
      
      <h2>CSS Animations</h2>
      <p>CSS animations and transitions can enhance user experience and make interfaces more engaging.</p>
      
      <h3>Simple Animation Example</h3>
      <pre><code>.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}</code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use semantic HTML as the foundation</li>
        <li>Follow a mobile-first approach</li>
        <li>Keep CSS organized and maintainable</li>
        <li>Use CSS Custom Properties for consistency</li>
        <li>Test across different browsers and devices</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Modern CSS provides powerful tools for creating beautiful, responsive, and maintainable websites. By mastering Flexbox, Grid, and Custom Properties, you can build layouts that were once impossible or extremely difficult to achieve.</p>
    `
  }
}

const PostPage = ({ pageContext }) => {
  const { slug } = pageContext
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 尝试从WordPress API获取文章数据
        const posts = await getPostsWithWordPressTags()
        const wpPost = posts.find(p => p.slug === slug)
        
        if (wpPost) {
          setPost(wpPost)
        } else {
          // 如果WordPress没有找到，使用mock数据
          const mockPost = postsData.find(p => p.slug === slug)
          if (mockPost) {
            setPost(mockPost)
          } else {
            setError('Post not found')
          }
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        // 回退到mock数据
        const mockPost = postsData.find(p => p.slug === slug)
        if (mockPost) {
          setPost(mockPost)
        } else {
          setError('Post not found')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ color: '#666', marginBottom: '1rem' }}>Loading...</h1>
          <p style={{ color: '#999' }}>Loading article from WordPress...</p>
        </div>
      </Layout>
    )
  }

  if (error || !post) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ color: '#666', marginBottom: '1rem' }}>Article Not Found</h1>
          <p style={{ color: '#999' }}>The article you're looking for doesn't exist.</p>
        </div>
      </Layout>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout>
      <Seo 
        title={post.title}
        description={post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) : post.subtitle}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background: linear-gradient(120deg, #f8fafc 0%, #e6f7f4 100%) !important;
            min-height: 100vh;
          }
          :root {
            --size-content: 1200px !important;
          }
          .post-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
          }
          .post-content {
            line-height: 1.8;
            color: #333;
          }
          .post-content h2 {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 2.5rem 0 1rem 0;
            color: #333;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 0.5rem;
          }
          .post-content h3 {
            font-size: 1.4rem;
            font-weight: 600;
            margin: 2rem 0 1rem 0;
            color: #444;
          }
          .post-content p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }
          .post-content ul, .post-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }
          .post-content li {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }
          .post-content pre {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          .post-content code {
            background: #f1f3f4;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 0.9em;
          }
          .post-content pre code {
            background: none;
            padding: 0;
          }
          @media (max-width: 768px) {
            .post-page-container {
              padding: 0 1rem !important;
            }
            .post-content h2 {
              font-size: 1.6rem;
            }
            .post-content h3 {
              font-size: 1.3rem;
            }
            .post-content p, .post-content li {
              font-size: 1rem;
            }
          }
        `
      }} />
      
      <div className="post-page-container">
        {/* 返回按钮 */}
        <div style={{ marginBottom: '2rem' }}>
          <a 
            href="/posts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#76cfc5',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#5bc0ae'}
            onMouseLeave={(e) => e.target.style.color = '#76cfc5'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Posts
          </a>
        </div>

        {/* 文章头部 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '3rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          {/* 标签和作者信息在同一行 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {/* 标签 */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
          }}>
            {post.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '2px solid #76cfc5',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(118,207,197,0.1)',
                  color: '#76cfc5'
                }}
              >
                {tag}
              </span>
            ))}
            </div>

            {/* 作者信息和元数据 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <img 
                src={post.authorAvatar} 
                alt={post.author}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #76cfc5',
                  flexShrink: 0,
                  display: 'block',
                  verticalAlign: 'middle',
                  margin: 0
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#333',
                  lineHeight: 1.2
                }}>
                  {post.author}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  lineHeight: 1.2
                }}>
                  {formatDate(post.date)} • {post.readTime}
                </div>
              </div>
            </div>
          </div>

          {/* 标题 */}
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '2rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.2
          }}>
            {post.title}
          </h1>

          {/* 摘要 */}
          <div style={{
            padding: '0 0 1.5rem 0',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: '#555',
              margin: 0,
              fontStyle: 'italic',
              lineHeight: 1.6
            }}>
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* 文章内容 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* 文章底部 */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginTop: '3rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Enjoyed this article?
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              margin: 0,
              flex: 1
          }}>
            Share it with your network or explore more articles in our blog.
          </p>
            
            {/* 分享链接 */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginLeft: '2rem'
            }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#179b8e',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec6664';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#179b8e';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1)';
                }}
              >
                <svg style={{
                  width: '36px',
                  height: '36px',
                  display: 'block',
                  transition: 'transform 0.2s'
                }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                  </g>
                </svg>
              </a>
              
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#179b8e',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec6664';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#179b8e';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1)';
                }}
              >
                <svg style={{
                  width: '36px',
                  height: '36px',
                  display: 'block',
                  transition: 'transform 0.2s'
                }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                    <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#179b8e',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec6664';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#179b8e';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.style.transform = 'scale(1)';
                }}
              >
                <svg style={{
                  width: '36px',
                  height: '36px',
                  display: 'block',
                  transition: 'transform 0.2s'
                }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                    <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                  </g>
                </svg>
              </a>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <a 
              href="/posts"
              style={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '2rem',
                border: '2px solid #76cfc5',
                background: 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'all 0.3s',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #76cfc5 0%, #ffe9b2 100%)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              View All Posts
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage 