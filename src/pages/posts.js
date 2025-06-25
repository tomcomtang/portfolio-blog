import * as React from "react"
import { useState, useMemo } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

// 模拟文章数据
const postsData = [
  {
    id: 1,
    title: "Getting Started with Gatsby",
    subtitle: "A comprehensive guide to building fast websites with Gatsby",
    tags: ["Gatsby", "React", "Web Development"],
    readTime: "8 min read",
    date: "2024-01-15",
    excerpt: "Learn how to build blazing fast websites with Gatsby, React, and GraphQL. This guide covers everything from setup to deployment.",
    slug: "getting-started-with-gatsby"
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    subtitle: "Master modern CSS with Flexbox, Grid, and Custom Properties",
    tags: ["CSS", "Frontend", "Design"],
    readTime: "12 min read",
    date: "2024-01-15",
    excerpt: "Explore advanced CSS techniques including Flexbox, CSS Grid, and CSS Custom Properties to create modern, responsive layouts.",
    slug: "advanced-css-techniques"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    subtitle: "Tips and tricks to make your JavaScript code faster",
    tags: ["JavaScript", "Performance", "Web Development"],
    readTime: "15 min read",
    date: "2024-01-10",
    excerpt: "Discover proven techniques to optimize your JavaScript code for better performance and user experience.",
    slug: "javascript-performance-optimization"
  },
  {
    id: 4,
    title: "React Hooks Deep Dive",
    subtitle: "Understanding useState, useEffect, and custom hooks",
    tags: ["React", "JavaScript", "Frontend"],
    readTime: "10 min read",
    date: "2024-01-10",
    excerpt: "A deep dive into React Hooks, covering useState, useEffect, and how to create custom hooks for reusable logic.",
    slug: "react-hooks-deep-dive"
  },
  {
    id: 5,
    title: "SEO Best Practices for Developers",
    subtitle: "Technical SEO strategies for better search rankings",
    tags: ["SEO", "Web Development", "Marketing"],
    readTime: "14 min read",
    date: "2024-01-10",
    excerpt: "Learn technical SEO strategies that developers can implement to improve search engine rankings and user experience.",
    slug: "seo-best-practices-for-developers"
  },
  {
    id: 6,
    title: "Building REST APIs with Node.js",
    subtitle: "Create robust APIs using Express.js and MongoDB",
    tags: ["Node.js", "API", "Backend"],
    readTime: "18 min read",
    date: "2024-01-05",
    excerpt: "Step-by-step guide to building RESTful APIs with Node.js, Express.js, and MongoDB with best practices and security considerations.",
    slug: "building-rest-apis-with-nodejs"
  },
  {
    id: 7,
    title: "TypeScript for React Developers",
    subtitle: "Adding type safety to your React applications",
    tags: ["TypeScript", "React", "Frontend"],
    readTime: "11 min read",
    date: "2024-01-05",
    excerpt: "Learn how to integrate TypeScript with React to build more robust and maintainable applications.",
    slug: "typescript-for-react-developers"
  },
  {
    id: 8,
    title: "Modern JavaScript Features",
    subtitle: "ES6+ features every developer should know",
    tags: ["JavaScript", "ES6", "Frontend"],
    readTime: "9 min read",
    date: "2023-12-28",
    excerpt: "Explore modern JavaScript features including arrow functions, destructuring, and async/await.",
    slug: "modern-javascript-features"
  }
]

const PostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [expandedPosts, setExpandedPosts] = useState(new Set())

  // 获取所有唯一的标签
  const allTags = useMemo(() => {
    const tags = new Set()
    postsData.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // 筛选文章
  const filteredPosts = useMemo(() => {
    return postsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [searchTerm, selectedTags])

  // 按日期分组posts
  const groupedPosts = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      if (!groups[post.date]) groups[post.date] = [];
      groups[post.date].push(post);
    });
    // 保持日期降序
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  }, [filteredPosts]);

  // 切换标签选择
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // 切换文章展开状态
  const toggleExpanded = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 柳条装饰SVG组件
  const WillowDecoration = ({ isLeft = true }) => (
    <svg 
      width="40" 
      height="60" 
      viewBox="0 0 10 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)',
        opacity: 0.8
      }}
    >
      <path 
        d="M7.72727 15.2727C8.98227 15.2727 10 14.0515 10 12.5455V12H9.54545C8.79227 12 8.12955 12.4451 7.71591 13.122C7.7 12.6011 7.66136 12.084 7.59773 11.5718L7.67727 11.5462C8.88955 11.1562 9.60909 9.66109 9.28455 8.20582L9.16682 7.67891L8.72773 7.82018C7.99909 8.05473 7.45409 8.69127 7.20136 9.47564C7.07364 8.97818 6.925 8.48945 6.75318 8.01218L6.82545 7.962C7.91227 7.20873 8.285 5.54073 7.65727 4.23655L7.43 3.76418L7.03636 4.03691C6.38364 4.48909 5.995 5.27236 5.91955 6.10745C5.69045 5.66782 5.44182 5.24182 5.17273 4.83327L5.23 4.76455C6.11773 3.69927 6.11773 1.97291 5.23 0.907636L4.90864 0.522L4.58727 0.907636C4.05591 1.54527 3.84955 2.41964 3.95455 3.24764C3.95136 3.24436 3.94864 3.24055 3.94591 3.23727L3.62955 3.64636C3.55409 1.61836 2.16364 0 0.454545 0H0C0 2.10873 1.42455 3.81818 3.18182 3.81818H3.49727L3.34955 4.00909C2.65182 3.87164 1.91136 4.11982 1.37318 4.76564L1.05182 5.15127L1.37318 5.53691C2.23955 6.57655 3.62773 6.59345 4.51955 5.60345C4.73227 5.93291 4.93318 6.27273 5.11818 6.62345C4.485 6.30327 3.74136 6.32018 3.10045 6.76473L2.70682 7.03745L2.93409 7.50982C3.54636 8.78236 4.88182 9.22964 5.95591 8.55273C6.09046 8.93509 6.21091 9.32455 6.31454 9.72055C5.77227 9.216 5.05136 9.00273 4.33727 9.23182L3.89818 9.37309L4.01591 9.9C4.33273 11.3198 5.52727 12.1675 6.71136 11.8456C6.75909 12.2569 6.79136 12.6709 6.80591 13.0882C6.39136 12.4309 5.74 12 5 12H4.54545V12.5455C4.54545 14.0171 5.51864 15.2078 6.73364 15.2624C6.69091 15.6802 6.63136 16.0931 6.55636 16.5C6.29864 15.732 5.76091 15.1096 5.04318 14.8789L4.60409 14.7376L4.48636 15.2645C4.16864 16.6876 4.85364 18.1429 6.01864 18.5711C5.88682 18.9605 5.73864 19.3407 5.57591 19.7127C5.49318 18.8896 5.10773 18.12 4.46364 17.6738L4.07 17.4011L3.84273 17.8735C3.22954 19.1476 3.57591 20.7633 4.60591 21.5395C4.02818 22.4493 3.34818 23.2784 2.56909 24H3.97455C4.5 23.4136 4.97273 22.7749 5.39455 22.098L5.46182 22.1444C6.54864 22.8976 7.93864 22.4504 8.56636 21.1462L8.79364 20.6738L8.4 20.4011C7.75182 19.9522 6.99818 19.938 6.36045 20.2696C6.56182 19.8136 6.74227 19.3451 6.90045 18.8645L6.97091 18.8875C8.18318 19.2775 9.42955 18.414 9.75455 16.9587L9.87227 16.4318L9.43318 16.2905C8.70864 16.0576 7.97591 16.2791 7.43091 16.8005C7.52545 16.2993 7.59818 15.7893 7.64727 15.2722H7.72727V15.2727Z" 
        fill="url(#willowGradient)"
      />
      <defs>
        <linearGradient id="willowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#76cfc5" />
          <stop offset="50%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#ec6664" />
        </linearGradient>
      </defs>
    </svg>
  )

  return (
    <Layout>
      <Seo 
        title="Blog Posts" 
        description="Explore our collection of articles on web development, design, and technology."
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
          .posts-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
            /* background: white !important; */
          }
        `
      }} />
      
      <div className="posts-page-container">
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Blog Posts
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto' 
          }}>
            Explore our latest articles on web development, design, and technology
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: '#333',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              Filter by tags:
            </h3>
            <div style={{ flex: 1 }} />
            <div style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#76cfc5'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            width: '100%'
          }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '2px solid',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedTags.includes(tag) ? '#76cfc5' : 'transparent',
                  borderColor: selectedTags.includes(tag) ? '#76cfc5' : '#ddd',
                  color: selectedTags.includes(tag) ? 'white' : '#666'
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#76cfc5'
                    e.target.style.color = '#76cfc5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#ddd'
                    e.target.style.color = '#666'
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div style={{ marginTop: '2rem' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              No posts found matching your criteria.
            </div>
          ) : (
            groupedPosts.map(([date, posts]) => (
              <div key={date} style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '2.5rem',
                padding: '2.5rem 2rem 2rem 2rem',
                border: '1px solid #e9ecef',
              }}>
                <div style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#179b8e',
                  marginBottom: '2rem',
                  letterSpacing: '0.02em',
                }}>{formatDate(date)}</div>
                <div style={{
                  display: 'table',
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  {posts.map((post, index) => {
                    const isExpanded = expandedPosts.has(post.id);
                    return (
                      <React.Fragment key={post.id}>
                        <div style={{
                          display: 'table-row',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}>
                          {/* 标题列（带柳条装饰） */}
                          <div style={{
                            display: 'table-cell',
                            padding: '1.5rem 1rem',
                            verticalAlign: 'top'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0,
                              justifyContent: 'center',
                              minWidth: 0
                            }}>
                              <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-end', marginRight: '0.5rem' }}>
                                <WillowDecoration isLeft={false} />
                              </div>
                              <h3 style={{
                                fontSize: '1.6rem',
                                fontWeight: '600',
                                margin: '0',
                                color: '#333',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                                minWidth: 0
                              }}>
                                <a 
                                  href={post.slug} 
                                  style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'inline-block',
                                    maxWidth: '100%'
                                  }}
                                  onMouseEnter={(e) => e.target.style.color = '#76cfc5'}
                                  onMouseLeave={(e) => e.target.style.color = '#333'}
                                >
                                  {post.title}
                                </a>
                              </h3>
                              <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-start', marginLeft: '0.5rem' }}>
                                <WillowDecoration isLeft={true} />
                              </div>
                            </div>
                          </div>
                          {/* 标签列 */}
                          <div style={{
                            display: 'table-cell',
                            padding: '1.5rem 1rem',
                            verticalAlign: 'top',
                            width: 'auto',
                            minWidth: '150px'
                          }}>
                            {post.tags && post.tags.length > 0 && (
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                flexWrap: 'wrap'
                              }}>
                                {post.tags.map(tag => (
                                  <span key={tag} style={{
                                    background: '#edf2f7',
                                    color: '#4a5568',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '15px',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* 展开按钮列 */}
                          <div style={{
                            display: 'table-cell',
                            padding: '1.5rem 1rem',
                            verticalAlign: 'top',
                            width: '80px'
                          }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpanded(post.id);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                color: '#666',
                                transition: 'all 0.3s ease',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                              }}
                            >
                              <span style={{ fontSize: '1.2rem' }}>↓</span>
                            </button>
                          </div>
                        </div>
                        {/* 展开的详细内容 */}
                        {isExpanded && (
                          <div style={{
                            display: 'table-row',
                            background: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef'
                          }}>
                            <div style={{
                              display: 'table-cell',
                              padding: '0 1rem 2rem 1rem',
                              verticalAlign: 'top'
                            }} colSpan="3">
                              <div style={{
                                display: 'flex',
                                gap: '2rem',
                                alignItems: 'flex-start',
                                padding: '2rem',
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                              }}>
                                {/* 文章封面图 */}
                                <div style={{
                                  width: '200px',
                                  height: '150px',
                                  background: 'linear-gradient(135deg, #76cfc5 0%, #5bc0ae 100%)',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '3rem',
                                  fontWeight: 'bold'
                                }}>
                                  📄
                                </div>
                                {/* 文章介绍内容 */}
                                <div style={{ flex: '1' }}>
                                  <h4 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    margin: '0 0 1rem 0',
                                    color: '#333'
                                  }}>
                                    Article Preview
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    color: '#555',
                                    margin: '0 0 1rem 0'
                                  }}>
                                    {post.excerpt}
                                  </p>
                                  <a 
                                    href={post.slug}
                                    style={{
                                      display: 'inline-block',
                                      padding: '0.75rem 1.5rem',
                                      background: '#76cfc5',
                                      color: 'white',
                                      textDecoration: 'none',
                                      borderRadius: '8px',
                                      fontWeight: '600',
                                      transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = '#5bc0ae';
                                      e.target.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = '#76cfc5';
                                      e.target.style.transform = 'translateY(0)';
                                    }}
                                  >
                                    Read Full Article →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage 