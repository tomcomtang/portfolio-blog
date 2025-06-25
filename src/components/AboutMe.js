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
  background: '#ECB993',
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
  width: '1000px',
  background: '#fff',
  borderRadius: '16px',
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
      <div style={thirdSection}></div>
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