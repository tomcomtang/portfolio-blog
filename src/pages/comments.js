import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useCommentsPageConfig } from "../hooks/useWordPress"
import { commentsPageStyles } from "../styles/commentsStyles"

// 引入 Giscus React 组件
import Giscus from '@giscus/react';

// 渲染图标的辅助函数
const renderIcon = (iconType) => {
  switch (iconType) {
    case 'circle':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="9" cy="9" r="3.2" fill="#fff" />
        </svg>
      )
    case 'square':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <rect x="5.2" y="5.2" width="7.6" height="7.6" rx="2" fill="#fff" />
        </svg>
      )
    case 'triangle':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <polygon points="9,5.2 12.8,12.8 5.2,12.8" fill="#fff" />
        </svg>
      )
    case 'pentagon':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <polygon points="9,5 13.2,8 11.8,13 6.2,13 4.8,8" fill="#fff" />
        </svg>
      )
    case 'star':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <polygon points="9,5 10,8 13.2,8.3 10.8,10.3 11.6,13.5 9,11.7 6.4,13.5 7.2,10.3 4.8,8.3 8,8" fill="#fff" />
        </svg>
      )
    case 'heart':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <path d="M9 14.5s-3.5-2.5-3.5-4.7A2.2 2.2 0 0 1 9 7.5a2.2 2.2 0 0 1 3.5 2.3c0 2.2-3.5 4.7-3.5 4.7z" fill="#fff" />
        </svg>
      )
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="9" cy="9" r="3.2" fill="#fff" />
        </svg>
      )
  }
}

const CommentsPage = () => {
  const { config, loading, error } = useCommentsPageConfig()

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <Layout>
        <Seo 
          title="Comments & Discussion"
          description="Share your thoughts, questions, or suggestions here. Let's connect and discuss!"
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading comments page...
        </div>
      </Layout>
    )
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <Layout>
        <Seo 
          title="Comments & Discussion"
          description="Share your thoughts, questions, or suggestions here. Let's connect and discuss!"
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          fontSize: '1.2rem',
          color: '#ec6664'
        }}>
          Error loading comments page. Please try again later.
        </div>
      </Layout>
    )
  }

  // 使用配置数据或默认值
  const pageConfig = config || {
    title: "Comments & Discussion",
    description: "Share your thoughts, questions, or suggestions here. Let's connect and discuss!",
    subtitle: "💬 Join the Discussion",
    subtitle_description: "Have something to say or ask? Leave your comment below!",
    giscus_config: {
      repo: "tomcomtang/portfolio-blog",
      repoId: "R_kgDOPBDz5Q",
      category: "Ideas",
      categoryId: "DIC_kwDOPBDz5c4Cr_AK",
      mapping: "pathname",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      theme: "noborder_light",
      lang: "en",
      loading: "lazy"
    },
    community_guidelines: [
      {
        text: "Be respectful and constructive in your comments",
        color: "#76cfc5",
        icon: "circle"
      },
      {
        text: "No spam, self-promotion, or advertising allowed",
        color: "#ffb400", 
        icon: "square"
      },
      {
        text: "No personal attacks, hate speech, or harassment",
        color: "#ec6664",
        icon: "triangle"
      },
      {
        text: "Stay on topic and keep discussions relevant",
        color: "#b4b8f8",
        icon: "pentagon"
      },
      {
        text: "No inappropriate, offensive, or illegal content",
        color: "#76cfc5",
        icon: "star"
      },
      {
        text: "Use clear, friendly, and inclusive language",
        color: "#ffb400",
        icon: "heart"
      }
    ]
  }

  return (
    <Layout>
      <Seo 
        title={pageConfig.title}
        description={pageConfig.description}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: commentsPageStyles
      }} />
      
      <div className="comments-page-container">
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="comments-title" style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #b4b8f8 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {pageConfig.title}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto',
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            {pageConfig.description}
          </p>
          {/* 彩色分割线 */}
          <div style={{
            height: '6px',
            width: '120px',
            margin: '1.5rem auto 2rem',
            borderRadius: '3px',
            background: 'linear-gradient(90deg, #76cfc5 0%, #b4b8f8 100%)'
          }} />
          <ul style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem 1.5rem',
            listStyle: 'none',
            padding: 0,
            margin: '0 auto',
            maxWidth: '700px',
            textAlign: 'left',
            justifyContent: 'center',
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: 1.7
          }}>
            {pageConfig.community_guidelines.map((guideline, index) => (
              <li key={index} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: guideline.color,
                  marginRight: '0.7em',
                  verticalAlign: 'middle',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  {renderIcon(guideline.icon)}
                </span>
                {guideline.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Area */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#333',
            textAlign: 'center'
          }}>
            {pageConfig.subtitle}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '2rem',
            textAlign: 'center',
            lineHeight: 1.6,
            display: 'block',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {pageConfig.subtitle_description}
          </p>
          
          {/* Giscus 评论系统集成 */}
          <div style={{
            textAlign: 'center',
            padding: '0',
            background: 'none',
            borderRadius: '12px',
            border: 'none'
          }}>
            <Giscus
              id="comments"
              repo={pageConfig.giscus_config.repo}
              repoId={pageConfig.giscus_config.repoId}
              category={pageConfig.giscus_config.category}
              categoryId={pageConfig.giscus_config.categoryId}
              mapping={pageConfig.giscus_config.mapping}
              reactionsEnabled={pageConfig.giscus_config.reactionsEnabled}
              emitMetadata={pageConfig.giscus_config.emitMetadata}
              inputPosition={pageConfig.giscus_config.inputPosition}
              theme={pageConfig.giscus_config.theme}
              lang={pageConfig.giscus_config.lang}
              loading={pageConfig.giscus_config.loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CommentsPage 