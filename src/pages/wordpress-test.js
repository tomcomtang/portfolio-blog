import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { getPostsWithWordPressTags } from "../services/wordpressApi"

const WordPressTestPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true)
        const data = await getPostsWithWordPressTags()
        console.log('API Test Result:', data)
        setPosts(data)
      } catch (err) {
        console.error('API Test Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testAPI()
  }, [])

  if (loading) return <div>Testing WordPress API...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Layout>
      <Seo title="WordPress API Test" />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>WordPress API Test</h1>
        <p>Found {posts.length} posts</p>
        
        {posts.map(post => (
          <div key={post.id} style={{ 
            border: '1px solid #ddd', 
            padding: '1rem', 
            margin: '1rem 0',
            borderRadius: '8px'
          }}>
            <h3>{post.title}</h3>
            <p><strong>Slug:</strong> {post.slug}</p>
            <p><strong>Date:</strong> {post.date}</p>
            <p><strong>Content Length:</strong> {post.content ? post.content.length : 0} characters</p>
            <p><strong>Excerpt:</strong> {post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'No excerpt'}</p>
            <p><strong>Tags:</strong> {post.tags ? post.tags.join(', ') : 'No tags'}</p>
            <p><strong>Featured Media:</strong> {post.featured_media || 'No featured media'}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default WordPressTestPage 