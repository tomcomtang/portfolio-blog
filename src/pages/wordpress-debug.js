import * as React from "react"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { debugWordPressAPI } from "../services/wordpressApi"

const WordPressDebugPage = () => {
  const [debugData, setDebugData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDebugData = async () => {
      try {
        setLoading(true)
        const data = await debugWordPressAPI()
        setDebugData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDebugData()
  }, [])

  if (loading) return <div>Loading debug data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Layout>
      <Seo title="WordPress Debug" />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>WordPress API Debug</h1>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>
    </Layout>
  )
}

export default WordPressDebugPage 