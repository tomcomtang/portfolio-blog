import * as React from "react"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加表单提交逻辑
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
  }

  return (
  <Layout>
      <Seo 
        title="Contact Me" 
        description="Get in touch with me for collaborations, questions, or just to say hello."
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background: linear-gradient(120deg, #fffaf5 0%, #fff5f0 50%, #fff0eb 100%) !important;
            min-height: 100vh;
          }
          :root {
            --size-content: 1200px !important;
          }
          .contact-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
          }
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 3rem;
          }
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            .contact-page-container {
              padding: 0 1rem !important;
            }
            .contact-title {
              font-size: 2rem !important;
            }
            .contact-subtitle {
              font-size: 1.1rem !important;
            }
          }
        `
      }} />
      
      <div className="contact-page-container">
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="contact-title" style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Get In Touch
          </h1>
          <p className="contact-subtitle" style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto',
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        {/* 主要内容区域 */}
        <div className="contact-grid">
          {/* 左侧：联系表单 */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#333',
              textAlign: 'center'
            }}>
              Send Message
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.95rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#76cfc5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(118,207,197,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.95rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#76cfc5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(118,207,197,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.95rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#76cfc5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(118,207,197,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.95rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#76cfc5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(118,207,197,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)',
                  color: '#fff',
                  border: '2px solid #b0c4cc',
                  padding: '0.9rem 2.2rem',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  borderRadius: '2rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
                  marginTop: '0.3rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(90deg, #76cfc5 0%, #ffe9b2 100%)';
                  e.target.style.transform = 'scale(1.06)';
                  e.target.style.boxShadow = '0 4px 16px rgba(94,194,182,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* 右侧：联系信息 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* 联系信息卡片 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef',
              flex: 1
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#333',
                textAlign: 'center'
              }}>
                Contact Info
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  background: 'rgba(118,207,197,0.05)',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem'
                  }}>
                    <svg width="20" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Email</div>
                    <a 
                      href="mailto:tom@example.com?subject=Hello from your portfolio&body=Hi Tom,%0D%0A%0D%0AI saw your portfolio and would like to get in touch.%0D%0A%0D%0ABest regards,"
                      style={{
                        fontSize: '1.1rem',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'color 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#76cfc5'}
                      onMouseLeave={(e) => e.target.style.color = '#333'}
                      onClick={(e) => {
                        // 添加点击反馈
                        e.target.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.target.style.transform = 'none';
                        }, 150);
                      }}
                    >
                      tom@example.com
                    </a>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  background: 'rgba(118,207,197,0.05)',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Phone</div>
                    <a 
                      href="tel:+1234567890"
                      style={{
                        fontSize: '1.1rem',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'color 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#76cfc5'}
                      onMouseLeave={(e) => e.target.style.color = '#333'}
                      onClick={(e) => {
                        // 添加点击反馈
                        e.target.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.target.style.transform = 'none';
                        }, 150);
                      }}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  background: 'rgba(118,207,197,0.05)',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Location</div>
                    <div style={{
                      fontSize: '1.1rem',
                      color: '#333',
                      fontWeight: '600'
                    }}>
                      San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 社交媒体链接 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '1.2rem',
                color: '#333',
                textAlign: 'center'
              }}>
                Follow Me
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem'
              }}>
                {[
                  { name: 'Twitter', icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                      </g>
                    </svg>
                  ), url: 'https://twitter.com/your_twitter' },
                  { name: 'LinkedIn', icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                        <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                      </g>
                    </svg>
                  ), url: 'https://www.linkedin.com/in/your_linkedin' },
                  { name: 'Facebook', icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                        <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                      </g>
                    </svg>
                  ), url: 'https://facebook.com/your_facebook' },
                  { name: 'GitHub', icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <circle cx="12" cy="12" r="10.5" fill="#6C63FF"/>
                        <path d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5 0 1.98 1.28 3.65 3.18 4.19.23.04.32-.1.32-.22v-.86c-1.29.28-1.56-.62-1.56-.62-.21-.54-.52-.68-.52-.68-.43-.29.03-.28.03-.28.48.03.74.5.74.5.42.72 1.1.51 1.37.39.04-.3.16-.51.29-.63-1.03-.12-2.12-.52-2.12-2.23 0-.49.17-.89.46-1.2-.05-.12-.2-.61.04-1.27 0 0 .39-.13 1.3.5.38-.11.78-.16 1.18-.16.4 0 .8.05 1.18.16.91-.63 1.3-.5 1.3-.5.24.66.09 1.15.04 1.27.29.31.46.71.46 1.2 0 1.71-1.09 2.11-2.13 2.23.17.15.32.44.32.89v1.32c0 .12.09.26.32.22C15.22 15.65 16.5 13.98 16.5 12c0-2.485-2.015-4.5-4.5-4.5z" fill="#fff"/>
                      </g>
                    </svg>
                  ), url: 'https://github.com/tomcomtang' }
                ].map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 0,
                      background: 'none',
                      color: '#222',
                      fontSize: '2.2rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ec6664';
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) {
                        svg.style.transform = 'scale(1.18)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#222';
                      const svg = e.currentTarget.querySelector('svg');
                      if (svg) {
                        svg.style.transform = 'scale(1)';
                      }
                    }}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: '#666',
          fontSize: '1rem',
          lineHeight: 1.6
        }}>
          <p style={{ marginBottom: '1rem' }}>
            I typically respond to messages within 24 hours during business days.
          </p>
          <p>
            Looking forward to hearing from you! 🚀
          </p>
        </div>
      </div>
  </Layout>
)
}

export default ContactPage 