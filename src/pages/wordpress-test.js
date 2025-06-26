import React, { useState, useEffect } from 'react'
import { getPageConfig, getSkills, getPosts, getPostsWithTags, getPostsWithWordPressTags, isWordPressConfigured } from '../services/wordpressApi'
import { usePostsWithTags, usePostsWithWordPressTags } from "../hooks/useWordPress"

const WordPressTest = () => {
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState(false)
  const { data: postsWithTags, loading: postsLoading, error: postsError } = usePostsWithTags()
  const { data: postsWithWPTags, loading: wpPostsLoading, error: wpPostsError } = usePostsWithWordPressTags()

  const runTests = async () => {
    setLoading(true)
    setTestResults({})

    const results = {}

    try {
      // 测试1: 检查WordPress配置
      results.config = {
        status: 'success',
        message: `WordPress URL: ${process.env.GATSBY_WORDPRESS_URL || 'Not configured'}`,
        configured: isWordPressConfigured()
      }

      if (!isWordPressConfigured()) {
        setTestResults(results)
        setLoading(false)
        return
      }

      // 测试2: 获取首页配置
      try {
        const homeConfig = await getPageConfig('home')
        results.homeConfig = {
          status: 'success',
          message: 'Home page config fetched successfully',
          data: homeConfig
        }
      } catch (error) {
        results.homeConfig = {
          status: 'error',
          message: error.message
        }
      }

      // 测试3: 获取技能数据
      try {
        const skills = await getSkills()
        results.skills = {
          status: 'success',
          message: `Found ${skills.length} skills`,
          data: skills
        }
      } catch (error) {
        results.skills = {
          status: 'error',
          message: error.message
        }
      }

      // 测试4: 获取文章数据
      try {
        const posts = await getPosts()
        results.posts = {
          status: 'success',
          message: `Found ${posts.length} posts`,
          data: posts
        }
      } catch (error) {
        results.posts = {
          status: 'error',
          message: error.message
        }
      }

    } catch (error) {
      results.general = {
        status: 'error',
        message: error.message
      }
    }

    setTestResults(results)
    setLoading(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            WordPress API 测试
          </h1>
          
          <div className="mb-6">
            <button
              onClick={runTests}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? '测试中...' : '运行测试'}
            </button>
          </div>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-4">
              {Object.entries(testResults).map(([testName, result]) => (
                <div key={testName} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 capitalize">
                    {testName.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className={`font-medium ${getStatusColor(result.status)}`}>
                    {result.status === 'success' ? '✅' : '❌'} {result.message}
                  </div>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                        查看详细数据
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-64">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2>Posts with WordPress Tags + Mock Data Test</h2>
          {wpPostsLoading && <p>Loading posts with WordPress tags and mock data...</p>}
          {wpPostsError && <p style={{ color: 'red' }}>Error loading posts with WordPress tags: {wpPostsError}</p>}
          {postsWithWPTags && (
            <div>
              <h3>Posts from WordPress API + Mock Data:</h3>
              <ul>
                {postsWithWPTags.map(post => (
                  <li key={post.id}>
                    <strong>{post.title}</strong>
                    <br />
                    <small>Subtitle: {post.subtitle}</small>
                    <br />
                    <small>Date: {new Date(post.date).toLocaleDateString()}</small>
                    <br />
                    <small>Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</small>
                    <br />
                    <small>Read Time: {post.readTime}</small>
                    <br />
                    <small>Author: {post.author}</small>
                    {post.excerpt && (
                      <p style={{ marginLeft: '20px', color: '#666' }}>
                        {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2>Posts with Tags Test</h2>
          {postsLoading && <p>Loading posts with tags...</p>}
          {postsError && <p style={{ color: 'red' }}>Error loading posts with tags: {postsError}</p>}
          {postsWithTags && (
            <div>
              <h3>Posts from WordPress API with Tags:</h3>
              <ul>
                {postsWithTags.map(post => (
                  <li key={post.id}>
                    <strong>{post.title}</strong>
                    <br />
                    <small>Date: {new Date(post.date).toLocaleDateString()}</small>
                    <br />
                    <small>Tags: {post.tags ? post.tags.join(', ') : 'No tags'}</small>
                    <br />
                    <small>Author: {post.author}</small>
                    {post.excerpt && (
                      <p style={{ marginLeft: '20px', color: '#666' }}>
                        {post.excerpt.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2>Tags Test</h2>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">使用说明</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 确保在 .env 文件中设置了 GATSBY_WORDPRESS_URL</li>
              <li>• 确保WordPress站点可以公开访问</li>
              <li>• 确保WordPress REST API已启用</li>
              <li>• 如果测试失败，请检查WordPress站点设置</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordPressTest 