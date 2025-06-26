import * as React from "react"
import { Link } from "gatsby"
import { useHeroFromCategory, useSocialMediaFromCategory } from '../hooks/useWordPress'
import { heroSectionConfig } from '../data/mockData'
import { heroStyles } from '../styles/homeStyles'

// 鼠标悬停事件处理函数
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
  const img = e.currentTarget.querySelector('img');
  if (img) {
    Object.assign(img.style, heroStyles.svgHover);
  }
}
function handleSocialIconMouseOut(e) {
  e.currentTarget.style.color = heroStyles.socialIconBtn.color;
  const img = e.currentTarget.querySelector('img');
  if (img) {
    img.style.transform = 'scale(1)';
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
  // 从WordPress API获取Hero数据
  const { heroData, loading: heroLoading, error: heroError } = useHeroFromCategory()
  // 从WordPress API获取社交媒体数据
  const { socialMedia, loading: socialMediaLoading, error: socialMediaError } = useSocialMediaFromCategory()

  // Hero内容的动画样式
  const heroContentStyle = {
    opacity: heroData && heroData.basic ? 1 : 0,
    transform: heroData && heroData.basic ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 头像图片的动画样式 - 在社交媒体列表开始渲染时才显示
  const avatarStyle = {
    ...heroStyles.avatarStyle,
    opacity: socialMedia && socialMedia.length > 0 ? 1 : 0,
    transform: socialMedia && socialMedia.length > 0 ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 社交媒体列表的样式，包含淡入动画
  const socialListStyle = {
    ...heroStyles.socialList,
    opacity: socialMedia && socialMedia.length > 0 ? 1 : 0,
    transform: socialMedia && socialMedia.length > 0 ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 社交媒体图标的动画样式
  const getSocialIconStyle = (index) => ({
    ...heroStyles.socialIconBtn,
    opacity: socialMedia && socialMedia.length > 0 ? 1 : 0,
    transform: socialMedia && socialMedia.length > 0 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
    transition: `opacity 1s ease-out ${index * 0.15}s, transform 1s ease-out ${index * 0.15}s`
  });

  // 如果出错，使用默认配置
  if (heroError) {
    console.error('Error loading hero data:', heroError);
    const { basic, buttons } = heroSectionConfig;
    
    return (
      <div style={heroStyles.heroSection}>
        <div style={heroStyles.contentWrapper}>
          <div style={heroStyles.leftCol}>
            <p style={heroStyles.normalText}>{basic.title}</p>
            <h1 style={heroStyles.bigText}>{basic.name}</h1>
            <p style={heroStyles.introText}>
              {basic.description}
            </p>
            <div style={heroStyles.btnRow}>
              {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
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
            <img src={basic.avatar} alt="avatar" style={avatarStyle} onMouseOver={handleAvatarMouseOver} onMouseOut={handleAvatarMouseOut} />
            <div style={socialListStyle}>
              {socialMedia && socialMedia.length > 0 && socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.val} 
                  style={getSocialIconStyle(index)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={social.name} 
                  onMouseOver={handleSocialIconMouseOver} 
                  onMouseOut={handleSocialIconMouseOut}
                >
                  <img src={`/svg/${social.svg}`} alt={social.name} style={heroStyles.svgStyle} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 使用从API获取的数据，如果没有数据则使用默认配置
  const data = heroData || heroSectionConfig;
  const { basic, buttons } = data;

  // 安全检查，确保basic存在
  if (!basic) {
    return (
      <div style={heroStyles.heroSection}>
        <div style={heroStyles.contentWrapper}>
          <div style={heroStyles.leftCol}>
            <div style={heroContentStyle}>
              <p style={heroStyles.normalText}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={heroStyles.heroSection}>
      <div style={heroStyles.contentWrapper}>
        <div style={heroStyles.leftCol}>
          <div style={heroContentStyle}>
            <p style={heroStyles.normalText}>{basic.title}</p>
            <h1 style={heroStyles.bigText}>{basic.name}</h1>
            <p style={heroStyles.introText}>
              {basic.description}
            </p>
            <div style={heroStyles.btnRow}>
              {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
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
        </div>
        <div style={heroStyles.rightCol}>
          <img 
            src={basic.avatar} 
            alt="avatar" 
            style={avatarStyle} 
            onMouseOver={handleAvatarMouseOver} 
            onMouseOut={handleAvatarMouseOut} 
          />
          <div style={socialListStyle}>
            {socialMedia && socialMedia.length > 0 && socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.val} 
                style={getSocialIconStyle(index)}
                target="_blank" 
                rel="noopener noreferrer" 
                title={social.name} 
                onMouseOver={handleSocialIconMouseOver} 
                onMouseOut={handleSocialIconMouseOut}
              >
                <img src={`/svg/${social.svg}`} alt={social.name} style={heroStyles.svgStyle} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 