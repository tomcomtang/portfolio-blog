import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { isWordPressConfigured, getPostsWithWordPressTags } from "../services/wordpressApi"

const WordPressDebugPage = () => {
  const [debugInfo, setDebugInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const runDebug = async () => {
      const info = {
        isConfigured: isWordPressConfigured(),
        wordpressUrl: process.env.GATSBY_WORDPRESS_URL,
        allEnvVars: Object.keys(process.env).filter(key => key.startsWith('GATSBY_')),
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }

      if (info.isConfigured) {
        try {
          console.log('Testing WordPress API...')
          const posts = await getPostsWithWordPressTags()
          info.postsCount = posts.length
          info.posts = posts.slice(0, 2) // 只显示前2篇文章
          info.success = true
        } catch (error) {
          info.error = error.message
          info.success = false
          console.error('WordPress API Error:', error)
        }
      }

      setDebugInfo(info)
      setLoading(false)
    }

    runDebug()
  }, [])

  if (loading) {
    return (
      <Layout>
        <Seo title="WordPress Debug" />
        <div style={{ padding: '2rem' }}>
          <h1>WordPress Debug</h1>
          <p>Loading debug information...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title="WordPress Debug" />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>WordPress Debug Information</h1>
        
        <h2>Configuration</h2>
        <ul>
          <li><strong>WordPress URL:</strong> {debugInfo.wordpressUrl || 'Not set'}</li>
          <li><strong>Is Configured:</strong> {debugInfo.isConfigured ? 'Yes' : 'No'}</li>
          <li><strong>Node Environment:</strong> {debugInfo.nodeEnv}</li>
          <li><strong>GATSBY_ Environment Variables:</strong> {debugInfo.allEnvVars ? debugInfo.allEnvVars.join(', ') : 'None found'}</li>
          <li><strong>Timestamp:</strong> {debugInfo.timestamp}</li>
        </ul>

        {debugInfo.isConfigured && (
          <>
            <h2>API Test Results</h2>
            <ul>
              <li><strong>Success:</strong> {debugInfo.success ? 'Yes' : 'No'}</li>
              {debugInfo.error && (
                <li><strong>Error:</strong> <span style={{ color: 'red' }}>{debugInfo.error}</span></li>
              )}
              {debugInfo.postsCount !== undefined && (
                <li><strong>Posts Count:</strong> {debugInfo.postsCount}</li>
              )}
            </ul>

            {debugInfo.posts && debugInfo.posts.length > 0 && (
              <>
                <h2>Sample Posts</h2>
                <ul>
                  {debugInfo.posts.map(post => (
                    <li key={post.id}>
                      <strong>{post.title}</strong>
                      <br />
                      <small>ID: {post.id}, Slug: {post.slug}</small>
                      <br />
                      <small>Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</small>
                      <br />
                      <small>Date: {new Date(post.date).toLocaleDateString()}</small>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {!debugInfo.isConfigured && (
          <div style={{ color: 'orange', padding: '1rem', border: '1px solid orange', borderRadius: '4px' }}>
            <h3>Configuration Issue</h3>
            <p>WordPress is not properly configured. Please check your .env file and ensure GATSBY_WORDPRESS_URL is set correctly.</p>
            
            <h4>Manual Test</h4>
            <button 
              onClick={async () => {
                try {
                  console.log('Testing with hardcoded URL...')
                  const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/tomchild5.wordpress.com/posts?_embed&per_page=5')
                  const posts = await response.json()
                  console.log('Manual test result:', posts)
                  alert(`Manual test successful! Found ${posts.length} posts. Check console for details.`)
                } catch (error) {
                  console.error('Manual test failed:', error)
                  alert(`Manual test failed: ${error.message}`)
                }
              }}
              style={{ padding: '0.5rem 1rem', margin: '0.5rem 0' }}
            >
              Test WordPress API Manually
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default WordPressDebugPage 