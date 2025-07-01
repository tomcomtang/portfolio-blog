import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const EnvTestPage = () => {
  return (
    <Layout>
      <Seo title="Environment Variables Test" description="Test environment variables" />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Environment Variables Test</h1>
        
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '1rem',
          fontFamily: 'monospace',
          marginBottom: '2rem'
        }}>
          <h3>All GATSBY_ Environment Variables:</h3>
          {Object.keys(process.env)
            .filter(key => key.startsWith('GATSBY_'))
            .map(key => (
              <div key={key} style={{ marginBottom: '0.5rem' }}>
                <strong>{key}:</strong> {process.env[key] || '❌ Not set'}
              </div>
            ))}
        </div>

        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '1rem',
          fontFamily: 'monospace'
        }}>
          <h3>Specific Variables:</h3>
          <div><strong>GATSBY_WORDPRESS_URL:</strong> {process.env.GATSBY_WORDPRESS_URL || '❌ Not set'}</div>
          <div><strong>GATSBY_GISCUS_REPO:</strong> {process.env.GATSBY_GISCUS_REPO || '❌ Not set'}</div>
          <div><strong>GATSBY_GISCUS_REPO_ID:</strong> {process.env.GATSBY_GISCUS_REPO_ID || '❌ Not set'}</div>
          <div><strong>GATSBY_GISCUS_CATEGORY_ID:</strong> {process.env.GATSBY_GISCUS_CATEGORY_ID || '❌ Not set'}</div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Debug Info:</h3>
          <div><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</div>
          <div><strong>GATSBY_VERSION:</strong> {process.env.GATSBY_VERSION}</div>
        </div>
      </div>
    </Layout>
  );
};

export default EnvTestPage; 