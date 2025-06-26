import * as React from "react"
import { Link } from "gatsby"
import { useSiteSettings, useSocialMediaFromCategory } from '../hooks/useWordPress'
import { siteSettingsData } from '../data/mockData'
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
  const { settings, loading: settingsLoading } = useSiteSettings()
  const { data: socialMedia, loading: socialMediaLoading, error: socialMediaError } = useSocialMediaFromCategory()

  // 获取 hero 数据，添加安全检查
  const hero = settings?.hero

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
            {socialMedia && socialMedia.length > 0 && socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.val} 
                style={heroStyles.socialIconBtn} 
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