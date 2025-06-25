import * as React from "react"
import { useEffect, useRef, useState } from "react"

// 技能配置数组
const skillsData = [
  { percentage: 95, color: '#61dafb', icon: 'R', name: 'React' },
  { percentage: 90, color: '#f7df1e', icon: 'JS', name: 'JavaScript' },
  { percentage: 88, color: '#3178c6', icon: 'TS', name: 'TypeScript' },
  { percentage: 85, color: '#e34c26', icon: 'H', name: 'HTML5' },
  { percentage: 92, color: '#1572b6', icon: 'C', name: 'CSS3' },
  { percentage: 87, color: '#563d7c', icon: 'B', name: 'Bootstrap' },
  { percentage: 89, color: '#000000', icon: 'N', name: 'Node.js' },
  { percentage: 83, color: '#339933', icon: 'G', name: 'Git' },
  { percentage: 91, color: '#ff6b35', icon: 'P', name: 'Python' },
  { percentage: 86, color: '#7952b3', icon: 'V', name: 'Vue.js' },
  { percentage: 94, color: '#00d8ff', icon: 'G', name: 'Gatsby' },
  { percentage: 82, color: '#f05032', icon: 'G', name: 'GitHub' }
]

// 项目配置数组
const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    svg: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" rx="20" fill="#4299e1"/>
        <path d="M50 80h100v40H50z" fill="#fff"/>
        <circle cx="70" cy="100" r="8" fill="#4299e1"/>
        <circle cx="90" cy="100" r="8" fill="#4299e1"/>
        <circle cx="110" cy="100" r="8" fill="#4299e1"/>
        <rect x="50" y="130" width="60" height="20" rx="10" fill="#fff"/>
        <rect x="120" y="130" width="30" height="20" rx="10" fill="#fff"/>
      </svg>
    ),
    link: '#',
    github: '#'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
    svg: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" rx="20" fill="#38b2ac"/>
        <rect x="40" y="60" width="120" height="20" rx="10" fill="#fff"/>
        <rect x="40" y="90" width="100" height="20" rx="10" fill="#fff"/>
        <rect x="40" y="120" width="80" height="20" rx="10" fill="#fff"/>
        <circle cx="170" cy="70" r="8" fill="#38b2ac"/>
        <circle cx="150" cy="100" r="8" fill="#38b2ac"/>
        <circle cx="130" cy="130" r="8" fill="#38b2ac"/>
      </svg>
    ),
    link: '#',
    github: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Gatsby and styled-components. Features smooth animations and SEO optimization.',
    technologies: ['Gatsby', 'Styled-components', 'GraphQL', 'Netlify'],
    svg: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="280" rx="20" fill="#ed8936"/>
        <rect x="50" y="50" width="100" height="60" rx="8" fill="#fff"/>
        <rect x="60" y="60" width="80" height="8" rx="4" fill="#ed8936"/>
        <rect x="60" y="75" width="60" height="8" rx="4" fill="#ed8936"/>
        <rect x="60" y="90" width="40" height="8" rx="4" fill="#ed8936"/>
        <circle cx="80" cy="130" r="15" fill="#fff"/>
        <circle cx="120" cy="130" r="15" fill="#fff"/>
      </svg>
    ),
    link: '#',
    github: '#'
  }
]

const aboutSection = {
  background: 'linear-gradient(135deg, #6dd5c7 0%, #5bc0ae 50%, #4db09e 100%)',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0 8rem 0',
}

const newSection = {
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0',
  height: '460px',
  boxSizing: 'border-box',
}

const thirdSection = {
  background: 'linear-gradient(135deg, #f0a868 0%, #ecb993 50%, #e8a87c 100%)',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0',
  marginTop: '-140px',
}

const fourthSection = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0',
}

const fifthSection = {
  background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  width: '100vw',
  minWidth: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '4rem 0',
}

const projectsContent = {
  maxWidth: '1200px',
  margin: '0 auto',
  color: '#fff',
  textAlign: 'center',
}

const projectsTitle = {
  fontSize: '2.5rem',
  fontWeight: 800,
  marginBottom: '3rem',
  marginTop: '120px',
  letterSpacing: '0.01em',
  color: '#fff',
}

const projectsGrid = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  marginTop: '2rem',
}

const projectRow = {
  display: 'flex',
  gap: '3rem',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0',
  maxWidth: '800px',
  margin: '0 auto',
}

const projectRowHover = {
  // 移除hover效果
}

const projectContent = {
  flex: '1 1 50%',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const projectImageContainer = {
  flex: '1 1 50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '320px',
  minWidth: '320px',
}

const projectImage = {
  width: '100%',
  maxWidth: '400px',
  height: '250px',
  borderRadius: '12px',
  objectFit: 'cover',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

const projectTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '1.2rem',
}

const projectDescription = {
  fontSize: '1.25rem',
  color: '#f0f0f0',
  lineHeight: 1.7,
  marginBottom: '1.2rem',
}

const projectTechnologies = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1.5rem',
  justifyContent: 'flex-start',
}

const technologyTag = {
  background: '#edf2f7',
  color: '#4a5568',
  padding: '0.35rem 1rem',
  borderRadius: '20px',
  fontSize: '1rem',
  fontWeight: 500,
}

const projectLinks = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '1rem',
}

const projectLink = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.15rem',
  fontWeight: 600,
  transition: 'color 0.3s, transform 0.3s',
  padding: '0.7rem 0',
  cursor: 'pointer',
}

const projectLinkHover = {
  color: '#f0f0f0',
  transform: 'translateX(10px)',
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
  fontSize: '1.25rem',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: 1.9,
  textAlign: 'center',
}

const cardStyle = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '1200px',
  background: '#fff',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  zIndex: 10,
  top: 'calc(100vh + 330px + 70px)',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '630px',
}

const cardTitle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: '#ec6664',
  marginBottom: '2rem',
  textAlign: 'center',
}

const skillsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
  width: '100%',
  flex: 1,
  justifyContent: 'flex-start',
  paddingBottom: '4rem',
}

const skillRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1.8rem',
}

const skillItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: 1,
}

const skillItemRight = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: 1,
  flexDirection: 'row-reverse',
}

const skillLogo = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  color: '#fff',
  fontWeight: 'bold',
}

const progressContainer = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}

const progressContainerLeft = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'flex-end',
}

const progressBar = {
  width: '100%',
  height: '12px',
  background: '#f0f0f0',
  borderRadius: '6px',
  overflow: 'hidden',
}

const progressBarLeft = {
  width: '100%',
  height: '12px',
  background: '#f0f0f0',
  borderRadius: '6px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'flex-end',
}

const progressFill = {
  height: '100%',
  background: 'linear-gradient(90deg, #76cfc5 0%, #ec6664 100%)',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
}

const progressFillLeft = {
  height: '100%',
  background: 'linear-gradient(90deg, #ec6664 0%, #76cfc5 100%)',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
  marginLeft: 'auto',
}

const skillPercentage = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#333',
  minWidth: '50px',
  textAlign: 'center',
}

const AboutMe = () => {
  const cardRef = useRef(null)
  const [newSectionHeight, setNewSectionHeight] = useState(630)
  const [cardVisible, setCardVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)

  // 延迟显示卡片，避免布局计算导致的闪现
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardVisible(true)
    }, 500) // 等待500ms后开始显示
    
    return () => clearTimeout(timer)
  }, [])

  // 将技能数据分成两列
  const leftSkills = skillsData.filter((_, index) => index % 2 === 0)
  const rightSkills = skillsData.filter((_, index) => index % 2 === 1)

  const dynamicNewSection = {
    ...newSection,
    height: `${newSectionHeight}px`,
  }

  const finalCardStyle = {
    ...cardStyle,
    opacity: cardVisible ? 1 : 0,
    transition: 'opacity 1.5s ease-in-out',
    border: '2px solid transparent',
    background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #dddddd, #eeeeee, #dddddd) border-box',
  }

  return (
    <>
      <div style={aboutSection}>
        <div style={aboutContent}>
          <h2 style={aboutTitle}>About Me</h2>
          <p style={aboutText}>
            Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.
          </p>
        </div>
      </div>
      <div style={dynamicNewSection}></div>
      <div style={thirdSection}>
        <div style={projectsContent}>
          <h2 style={projectsTitle}>Projects</h2>
          <div style={projectsGrid}>
            <div 
              key={projectsData[0].title} 
              style={projectRow}
            >
              <div style={projectImageContainer}>
                {projectsData[0].svg}
              </div>
              <div style={projectContent}>
                <h3 style={projectTitle}>{projectsData[0].title}</h3>
                <p style={projectDescription}>{projectsData[0].description}</p>
                <div style={projectTechnologies}>
                  {projectsData[0].technologies.map((technology) => (
                    <span key={technology} style={technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={projectLinks}>
                  {projectsData[0].link && (
                    <a 
                      href={projectsData[0].link} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '0-live' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('0-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {projectsData[0].github && (
                    <a 
                      href={projectsData[0].github} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '0-github' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('0-github')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={fourthSection}>
        <div style={projectsContent}>
          <div style={projectsGrid}>
            <div 
              key={projectsData[1].title} 
              style={projectRow}
            >
              <div style={projectContent}>
                <h3 style={projectTitle}>{projectsData[1].title}</h3>
                <p style={projectDescription}>{projectsData[1].description}</p>
                <div style={projectTechnologies}>
                  {projectsData[1].technologies.map((technology) => (
                    <span key={technology} style={technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={projectLinks}>
                  {projectsData[1].link && (
                    <a 
                      href={projectsData[1].link} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '1-live' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('1-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {projectsData[1].github && (
                    <a 
                      href={projectsData[1].github} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '1-github' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('1-github')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
              <div style={projectImageContainer}>
                {projectsData[1].svg}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={fifthSection}>
        <div style={projectsContent}>
          <div style={projectsGrid}>
            <div 
              key={projectsData[2].title} 
              style={projectRow}
            >
              <div style={projectImageContainer}>
                {projectsData[2].svg}
              </div>
              <div style={projectContent}>
                <h3 style={projectTitle}>{projectsData[2].title}</h3>
                <p style={projectDescription}>{projectsData[2].description}</p>
                <div style={projectTechnologies}>
                  {projectsData[2].technologies.map((technology) => (
                    <span key={technology} style={technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={projectLinks}>
                  {projectsData[2].link && (
                    <a 
                      href={projectsData[2].link} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '2-live' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('2-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {projectsData[2].github && (
                    <a 
                      href={projectsData[2].github} 
                      style={{
                        ...projectLink,
                        ...(hoveredProject === '2-github' && projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('2-github')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={cardRef} style={finalCardStyle}>
        <h3 style={cardTitle}>Proficiency</h3>
        <div style={skillsContainer}>
          {leftSkills.map((skill, index) => (
            <div key={skill.name} style={skillRow}>
              <div style={skillItem}>
                <div style={skillPercentage}>{skill.percentage}%</div>
                <div style={progressContainerLeft}>
                  <div style={progressBarLeft}>
                    <div style={{...progressFillLeft, width: `${skill.percentage}%`}}></div>
                  </div>
                </div>
                <div style={{...skillLogo, background: skill.color}}>{skill.icon}</div>
              </div>
              {rightSkills[index] && (
                <div style={skillItemRight}>
                  <div style={skillPercentage}>{rightSkills[index].percentage}%</div>
                  <div style={progressContainer}>
                    <div style={progressBar}>
                      <div style={{...progressFill, width: `${rightSkills[index].percentage}%`}}></div>
                    </div>
                  </div>
                  <div style={{...skillLogo, background: rightSkills[index].color}}>{rightSkills[index].icon}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutMe 