import * as React from "react"

const aboutSection = {
  background: '#68d1bf',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0',
}

const aboutContent = {
  maxWidth: '1200px',
  margin: '0 auto',
  color: '#fff',
  textAlign: 'center',
}

const aboutTitle = {
  fontSize: '2.5rem',
  fontWeight: 800,
  marginBottom: '2rem',
  letterSpacing: '0.01em',
}

const aboutText = {
  fontSize: '1.15rem',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.9,
  textAlign: 'center',
}

const AboutMe = () => (
  <div style={aboutSection}>
    <div style={aboutContent}>
      <h2 style={aboutTitle}>About Me</h2>
      <p style={aboutText}>
        Hi, I'm Tom Tang, a passionate web developer and blogger who loves to explore new technologies and share knowledge with the community. With years of experience in building modern, user-friendly web applications, I enjoy turning ideas into reality through clean code and creative design. <br/><br/>
        On this blog, you'll find my thoughts on web development, tutorials, project showcases, and insights from my journey in tech. I believe in continuous learning and open sharing, and I hope my content can inspire and help others in their own coding adventures.
      </p>
    </div>
  </div>
)

export default AboutMe 