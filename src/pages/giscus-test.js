import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const GiscusTestPage = () => {
  const giscusVars = {
    GATSBY_GISCUS_REPO: process.env.GATSBY_GISCUS_REPO,
    GATSBY_GISCUS_REPO_ID: process.env.GATSBY_GISCUS_REPO_ID,
    GATSBY_GISCUS_CATEGORY_ID: process.env.GATSBY_GISCUS_CATEGORY_ID,
  };

  const isConfigured = giscusVars.GATSBY_GISCUS_REPO && 
                      giscusVars.GATSBY_GISCUS_REPO_ID && 
                      giscusVars.GATSBY_GISCUS_CATEGORY_ID;

  return (
    <Layout>
      <Seo title="Giscus Test" description="Test Giscus configuration" />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Giscus Configuration Test</h1>
        
        <div style={{ 
          background: isConfigured ? '#d4edda' : '#f8d7da', 
          border: `1px solid ${isConfigured ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: isConfigured ? '#155724' : '#721c24', margin: '0 0 1rem 0' }}>
            Status: {isConfigured ? '✅ Configured' : '❌ Not Configured'}
          </h3>
          <p style={{ color: isConfigured ? '#155724' : '#721c24', margin: 0 }}>
            {isConfigured 
              ? 'All required Giscus environment variables are set. Comments menu should be visible.'
              : 'Missing required Giscus environment variables. Comments menu will be hidden.'
            }
          </p>
        </div>

        <h3>Environment Variables:</h3>
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '1rem',
          fontFamily: 'monospace'
        }}>
          {Object.entries(giscusVars).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '0.5rem' }}>
              <strong>{key}:</strong> {value || '❌ Not set'}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Required Variables:</h3>
          <ul>
            <li><code>GATSBY_GISCUS_REPO</code> - Your repository name (e.g., "username/repo")</li>
            <li><code>GATSBY_GISCUS_REPO_ID</code> - Your repository ID</li>
            <li><code>GATSBY_GISCUS_CATEGORY_ID</code> - Your category ID</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>How to Set:</h3>
          <p>Create a <code>.env</code> file in your project root with:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '1rem',
            overflow: 'auto'
          }}>
{`GATSBY_GISCUS_REPO=your-username/your-repo-name
GATSBY_GISCUS_REPO_ID=your-repo-id
GATSBY_GISCUS_CATEGORY_ID=your-category-id`}
          </pre>
        </div>
      </div>
    </Layout>
  );
};

export default GiscusTestPage; 