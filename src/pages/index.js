import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const pageStyle = {
  background: '#fafdff',
  minHeight: '100vh',
  fontFamily: 'var(--font-sans)',
}
const contentWrapper = {
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '3rem 2rem',
  gap: '2rem',
}
const leftCol = {
  flex: 8,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
  height: '100%',
}
const rightCol = {
  flex: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.5rem',
}
const avatarStyle = {
  width: '280px',
  height: '280px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  marginBottom: '1.2rem',
  border: '4px solid #76cfc5',
  transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
}
const avatarHover = {
  transform: 'scale(1.06)',
  boxShadow: '0 8px 32px rgba(118,207,197,0.18)',
  borderColor: '#ec6664',
}
const socialList = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.5rem',
}
const socialIconBtn = {
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
  boxShadow: 'none',
}
const svgStyle = {
  width: '36px',
  height: '36px',
  display: 'block',
  transition: 'transform 0.2s',
}
const socialIconHover = {
  color: '#ec6664',
}
const svgHover = {
  transform: 'scale(1.18)',
}
const normalText = {
  fontSize: '1.25rem',
  margin: 0,
  color: '#179b8e',
  fontWeight: 600,
  letterSpacing: '0.01em',
}
const bigText = {
  fontSize: '3rem',
  fontWeight: 800,
  margin: 0,
  lineHeight: 1.1,
  background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  zIndex: 1,
}
const introText = {
  fontSize: '1.18rem',
  margin: 0,
  color: '#444',
  lineHeight: 1.8,
  fontWeight: 400,
}
const btnRow = {
  display: 'flex',
  gap: '1.5rem',
  marginTop: '2.5rem',
  alignItems: 'center',
}
const btn = {
  padding: '0.9rem 2.2rem',
  fontSize: '1.15rem',
  fontWeight: 700,
  borderRadius: '2rem',
  border: '2px solid #b0c4cc',
  background: 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}
const btnHover = {
  background: 'linear-gradient(90deg, #76cfc5 0%, #ffe9b2 100%)',
  transform: 'scale(1.06)',
  boxShadow: '0 4px 16px rgba(94,194,182,0.18)',
}
const btnAlt = {
  ...btn,
  background: 'linear-gradient(90deg, #eaf6fa 0%, #c7e6f5 100%)',
  color: '#179b8e',
  border: '2px solid #b0c4cc',
}
const btnAltHover = {
  background: 'linear-gradient(90deg, #c7e6f5 0%, #eaf6fa 100%)',
  color: '#179b8e',
  border: '2px solid #b0c4cc',
  transform: 'scale(1.06)',
  boxShadow: '0 4px 16px rgba(94,194,182,0.10)',
}

function handleBtnMouseOver(e) {
  Object.assign(e.target.style, btnHover);
}
function handleBtnMouseOut(e) {
  e.target.style.background = btn.background;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = btn.boxShadow;
}
function handleBtnAltMouseOver(e) {
  Object.assign(e.target.style, btnAltHover);
}
function handleBtnAltMouseOut(e) {
  e.target.style.background = btnAlt.background;
  e.target.style.color = btnAlt.color;
  e.target.style.border = btnAlt.border;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = btn.boxShadow;
}

function handleSocialIconMouseOver(e) {
  e.currentTarget.style.color = socialIconHover.color;
  const svg = e.currentTarget.querySelector('svg');
  if (svg) Object.assign(svg.style, svgHover);
}
function handleSocialIconMouseOut(e) {
  e.currentTarget.style.color = socialIconBtn.color;
  const svg = e.currentTarget.querySelector('svg');
  if (svg) svg.style.transform = 'scale(1)';
}

function handleAvatarMouseOver(e) {
  Object.assign(e.target.style, avatarHover);
}
function handleAvatarMouseOut(e) {
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = avatarStyle.boxShadow;
  e.target.style.borderColor = avatarStyle.border.split(' ')[2];
}

const HomePage = () => (
  <Layout>
    <div style={pageStyle}>
      <div style={contentWrapper}>
        <div style={leftCol}>
          <p style={normalText}>I'm</p>
          <h1 style={bigText}>Tom Tang</h1>
          <p style={introText}>
            I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.<br/>
            Welcome to my portfolio blog!
          </p>
          <div style={btnRow}>
            <Link to="/posts" style={btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut} onFocus={handleBtnMouseOver} onBlur={handleBtnMouseOut}>View Posts</Link>
            <Link to="/contact" style={btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut} onFocus={handleBtnAltMouseOver} onBlur={handleBtnAltMouseOut}>Contact Me</Link>
          </div>
        </div>
        <div style={rightCol}>
          <img src="https://avatars.githubusercontent.com/u/20943608?v=4" alt="avatar" style={avatarStyle} onMouseOver={handleAvatarMouseOver} onMouseOut={handleAvatarMouseOut} />
          <div style={socialList}>
            <a href="https://twitter.com/your_twitter" style={socialIconBtn} target="_blank" rel="noopener noreferrer" title="Twitter" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
              <svg style={svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.03c0 .352.04.695.116 1.022A12.72 12.72 0 0 1 3.11 5.13a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2 3.732a4.47 4.47 0 0 1-2.03-.56v.057c0 2.172 1.545 3.984 3.6 4.396a4.5 4.5 0 0 1-2.025.077c.57 1.78 2.23 3.075 4.2 3.11A9 9 0 0 1 2 19.54a12.72 12.72 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#00C4CC"/>
                </g>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/your_linkedin" style={socialIconBtn} target="_blank" rel="noopener noreferrer" title="LinkedIn" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
              <svg style={svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#FFB400"/>
                  <path d="M8.225 17.25V10.5H5.75v6.75h2.475zm-1.238-7.725c.793 0 1.287-.527 1.287-1.188-.015-.675-.494-1.188-1.272-1.188-.778 0-1.287.513-1.287 1.188 0 .661.494 1.188 1.257 1.188h.015zm2.013 7.725h2.475v-3.75c0-.201.014-.402.074-.547.163-.402.535-.819 1.159-.819.818 0 1.145.618 1.145 1.525v3.591h2.475v-3.85c0-2.063-1.101-3.025-2.57-3.025-1.188 0-1.72.656-2.018 1.118h.015v-1.025H9v6.757z" fill="#fff"/>
                </g>
              </svg>
            </a>
            <a href="https://facebook.com/your_facebook" style={socialIconBtn} target="_blank" rel="noopener noreferrer" title="Facebook" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
              <svg style={svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="#FF5A5F"/>
                  <path d="M15.5 8.5h-1.5a.5.5 0 0 0-.5.5v1.5h2l-.25 2h-1.75v5h-2.25v-5H8.5v-2h1.25V9a2.25 2.25 0 0 1 2.25-2.25h1.5v1.75z" fill="#fff"/>
                </g>
              </svg>
            </a>
            <a href="https://github.com/tomcomtang" style={socialIconBtn} target="_blank" rel="noopener noreferrer" title="GitHub" onMouseOver={handleSocialIconMouseOver} onMouseOut={handleSocialIconMouseOut}>
              <svg style={svgStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  </Layout>
)

export default HomePage
