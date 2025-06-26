import * as React from "react"
import { Link } from "gatsby"
import { useSiteSettings } from '../hooks/useWordPress'
import { heroStyles } from '../styles/homeStyles'

function handleBtnMouseOver(e) {
  Object.assign(e.target.style, heroStyles.btnHover);
}
function handleBtnMouseOut(e) {
  e.target.style.background = heroStyles.btn.background;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.btn.boxShadow;
}
function handleBtnAltMouseOver(e) {
  Object.assign(e.target.style, heroStyles.btnAltHover);
}
function handleBtnAltMouseOut(e) {
  e.target.style.background = heroStyles.btnAlt.background;
  e.target.style.color = heroStyles.btnAlt.color;
  e.target.style.border = heroStyles.btnAlt.border;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.btn.boxShadow;
}

function handleSocialIconMouseOver(e) {
  e.currentTarget.style.color = heroStyles.socialIconHover.color;
  const svg = e.currentTarget.querySelector('svg');
  if (svg) {
    Object.assign(svg.style, heroStyles.svgHover);
  }
}
function handleSocialIconMouseOut(e) {
  e.currentTarget.style.color = heroStyles.socialIconBtn.color;
  const svg = e.currentTarget.querySelector('svg');
  if (svg) {
    svg.style.transform = 'scale(1)';
  }
}
function handleAvatarMouseOver(e) {
  Object.assign(e.target.style, heroStyles.avatarHover);
}
function handleAvatarMouseOut(e) {
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.avatarStyle.boxShadow;
  e.target.style.borderColor = heroStyles.avatarStyle.border;
}

const HeroSection = () => {
  const { settings, loading } = useSiteSettings()
  
  // 如果正在加载，显示默认内容
  if (loading) {
    return (
      <div style={heroStyles.heroSection}>
        <div style={heroStyles.contentWrapper}>
          <div style={heroStyles.leftCol}>
            <p style={heroStyles.normalText}>I'm</p>
            <h1 style={heroStyles.bigText}>Tom Tang</h1>
            <p style={heroStyles.introText}>
              I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.<br/>
              Welcome to my portfolio blog!
            </p>
            <div style={heroStyles.btnRow}>
              <Link to="/posts" style={heroStyles.btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut} onFocus={handleBtnMouseOver} onBlur={handleBtnMouseOut}>View Posts</Link>
              <Link to="/contact" style={heroStyles.btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut} onFocus={handleBtnAltMouseOver} onBlur={handleBtnAltMouseOut}>Contact Me</Link>
            </div>
          </div>
          <div style={heroStyles.rightCol}>
            <img src="https://avatars.githubusercontent.com/u/20943608?v=4" alt="avatar" style={heroStyles.avatarStyle} onMouseOver={handleAvatarMouseOver} onMouseOut={handleAvatarMouseOut} />
            <div style={heroStyles.socialList}>
              <a href="https://twitter.com/your_twitter" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Twitter" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                  </g>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/your_linkedin" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="LinkedIn" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                    <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="https://facebook.com/your_facebook" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Facebook" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                    <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/tomcomtang" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="GitHub" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <circle cx="12" cy="12" r="10.5" fill="#6C63FF"/>
                    <path d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5 0 1.98 1.28 3.65 3.18 4.19.23.04.32-.1.32-.22v-.86c-1.29.28-1.56-.62-1.56-.62-.21-.54-.52-.68-.52-.68-.43-.29.03-.28.03-.28.48.03.74.5.74.5.42.72 1.1.51 1.37.39.04-.3.16-.51.29-.63-1.03-.12-2.12-.52-2.12-2.23 0-.49.17-.89.46-1.2-.05-.12-.2-.61.04-1.27 0 0 .39-.13 1.3.5.38-.11.78-.16 1.18-.16.4 0 .8.05 1.18.16.91-.63 1.3-.5 1.3-.5.24.66.09 1.15.04 1.27.29.31.46.71.46 1.2 0 1.71-1.09 2.11-2.13 2.23.17.15.32.44.32.89v1.32c0 .12.09.26.32.22C15.22 15.65 16.5 13.98 16.5 12c0-2.485-2.015-4.5-4.5-4.5z" fill="#fff"/>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 获取 hero 数据，添加安全检查
  const hero = settings?.hero

  // 如果hero数据不存在，使用默认数据
  if (!hero) {
    return (
      <div style={heroStyles.heroSection}>
        <div style={heroStyles.contentWrapper}>
          <div style={heroStyles.leftCol}>
            <p style={heroStyles.normalText}>I'm</p>
            <h1 style={heroStyles.bigText}>Tom Tang</h1>
            <p style={heroStyles.introText}>
              I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.<br/>
              Welcome to my portfolio blog!
            </p>
            <div style={heroStyles.btnRow}>
              <Link to="/posts" style={heroStyles.btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut} onFocus={handleBtnMouseOver} onBlur={handleBtnMouseOut}>View Posts</Link>
              <Link to="/contact" style={heroStyles.btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut} onFocus={handleBtnAltMouseOver} onBlur={handleBtnAltMouseOut}>Contact Me</Link>
            </div>
          </div>
          <div style={heroStyles.rightCol}>
            <img src="https://avatars.githubusercontent.com/u/20943608?v=4" alt="avatar" style={heroStyles.avatarStyle} onMouseOver={handleAvatarMouseOver} onMouseOut={handleAvatarMouseOut} />
            <div style={heroStyles.socialList}>
              <a href="https://twitter.com/your_twitter" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Twitter" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                  </g>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/your_linkedin" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="LinkedIn" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                    <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="https://facebook.com/your_facebook" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Facebook" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                    <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/tomcomtang" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="GitHub" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <circle cx="12" cy="12" r="10.5" fill="#6C63FF"/>
                    <path d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5 0 1.98 1.28 3.65 3.18 4.19.23.04.32-.1.32-.22v-.86c-1.29.28-1.56-.62-1.56-.62-.21-.54-.52-.68-.52-.68-.43-.29.03-.28.03-.28.48.03.74.5.74.5.42.72 1.1.51 1.37.39.04-.3.16-.51.29-.63-1.03-.12-2.12-.52-2.12-2.23 0-.49.17-.89.46-1.2-.05-.12-.2-.61.04-1.27 0 0 .39-.13 1.3.5.38-.11.78-.16 1.18-.16.4 0 .8.05 1.18.16.91-.63 1.3-.5 1.3-.5.24.66.09 1.15.04 1.27.29.31.46.71.46 1.2 0 1.71-1.09 2.11-2.13 2.23.17.15.32.44.32.89v1.32c0 .12.09.26.32.22C15.22 15.65 16.5 13.98 16.5 12c0-2.485-2.015-4.5-4.5-4.5z" fill="#fff"/>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 渲染社交媒体图标
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case 'twitter':
        return (
          <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
            </g>
          </svg>
        )
      case 'linkedin':
        return (
          <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
              <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
            </g>
          </svg>
        )
      case 'facebook':
        return (
          <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
              <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
            </g>
          </svg>
        )
      case 'github':
        return (
          <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="12" cy="12" r="10.5" fill="#6C63FF"/>
              <path d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5 0 1.98 1.28 3.65 3.18 4.19.23.04.32-.1.32-.22v-.86c-1.29.28-1.56-.62-1.56-.62-.21-.54-.52-.68-.52-.68-.43-.29.03-.28.03-.28.48.03.74.5.74.5.42.72 1.1.51 1.37.39.04-.3.16-.51.29-.63-1.03-.12-2.12-.52-2.12-2.23 0-.49.17-.89.46-1.2-.05-.12-.2-.61.04-1.27 0 0 .39-.13 1.3.5.38-.11.78-.16 1.18-.16.4 0 .8.05 1.18.16.91-.63 1.3-.5 1.3-.5.24.66.09 1.15.04 1.27.29.31.46.71.46 1.2 0 1.71-1.09 2.11-2.13 2.23.17.15.32.44.32.89v1.32c0 .12.09.26.32.22C15.22 15.65 16.5 13.98 16.5 12c0-2.485-2.015-4.5-4.5-4.5z" fill="#fff"/>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div style={heroStyles.heroSection}>
      <div style={heroStyles.contentWrapper}>
        <div style={heroStyles.leftCol}>
          <p style={heroStyles.normalText}>{hero.title}</p>
          <h1 style={heroStyles.bigText}>{hero.name}</h1>
          <p style={heroStyles.introText}>
            {hero.description}
          </p>
          <div style={heroStyles.btnRow}>
            {hero.buttons && hero.buttons.length > 0 ? (
              hero.buttons.map((button, index) => (
                <Link 
                  key={index}
                  to={button.link} 
                  style={button.type === 'primary' ? heroStyles.btn : heroStyles.btnAlt} 
                  onMouseOver={button.type === 'primary' ? handleBtnMouseOver : handleBtnAltMouseOver} 
                  onMouseOut={button.type === 'primary' ? handleBtnMouseOut : handleBtnAltMouseOut} 
                  onFocus={button.type === 'primary' ? handleBtnMouseOver : handleBtnAltMouseOver} 
                  onBlur={button.type === 'primary' ? handleBtnMouseOut : handleBtnAltMouseOut}
                >
                  {button.text}
                </Link>
              ))
            ) : (
              <>
                <Link to="/posts" style={heroStyles.btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut} onFocus={handleBtnMouseOver} onBlur={handleBtnMouseOut}>View Posts</Link>
                <Link to="/contact" style={heroStyles.btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut} onFocus={handleBtnAltMouseOver} onBlur={handleBtnAltMouseOut}>Contact Me</Link>
              </>
            )}
          </div>
        </div>
        <div style={heroStyles.rightCol}>
          <img src={hero.avatar} alt="avatar" style={heroStyles.avatarStyle} onMouseOver={handleAvatarMouseOver} onMouseOut={handleAvatarMouseOut} />
          <div style={heroStyles.socialList}>
            {hero.social_links && hero.social_links.length > 0 ? (
              hero.social_links.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  style={heroStyles.socialIconBtn} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={social.title} 
                  onMouseOver={handleSocialIconMouseOver} 
                  onMouseOut={handleSocialIconMouseOut}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))
            ) : (
              <>
                <a href="https://twitter.com/your_twitter" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Twitter" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                  <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                    </g>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/your_linkedin" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="LinkedIn" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                  <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                      <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                    </g>
                  </svg>
                </a>
                <a href="https://facebook.com/your_facebook" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="Facebook" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                  <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                      <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                    </g>
                  </svg>
                </a>
                <a href="https://github.com/tomcomtang" style={heroStyles.socialIconBtn} target="_blank" rel="noopener noreferrer" title="GitHub" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
                  <svg style={heroStyles.svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <circle cx="12" cy="12" r="10.5" fill="#6C63FF"/>
                      <path d="M12 7.5c-2.485 0-4.5 2.015-4.5 4.5 0 1.98 1.28 3.65 3.18 4.19.23.04.32-.1.32-.22v-.86c-1.29.28-1.56-.62-1.56-.62-.21-.54-.52-.68-.52-.68-.43-.29.03-.28.03-.28.48.03.74.5.74.5.42.72 1.1.51 1.37.39.04-.3.16-.51.29-.63-1.03-.12-2.12-.52-2.12-2.23 0-.49.17-.89.46-1.2-.05-.12-.2-.61.04-1.27 0 0 .39-.13 1.3.5.38-.11.78-.16 1.18-.16.4 0 .8.05 1.18.16.91-.63 1.3-.5 1.3-.5.24.66.09 1.15.04 1.27.29.31.46.71.46 1.2 0 1.71-1.09 2.11-2.13 2.23.17.15.32.44.32.89v1.32c0 .12.09.26.32.22C15.22 15.65 16.5 13.98 16.5 12c0-2.485-2.015-4.5-4.5-4.5z" fill="#fff"/>
                    </g>
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 