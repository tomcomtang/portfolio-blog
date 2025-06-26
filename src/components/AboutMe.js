import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { useSiteSettings, useProjects, useSkills } from '../hooks/useWordPress'
import { projectsData, skillsData } from '../data/mockData'
import { aboutStyles } from '../styles/homeStyles'

const AboutMe = () => {
  const cardRef = useRef(null)
  const [newSectionHeight, setNewSectionHeight] = useState(630)
  const [cardVisible, setCardVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState(null)

  // 获取数据
  const { settings, loading: settingsLoading } = useSiteSettings()
  const { projects, loading: projectsLoading } = useProjects()
  const { skills, loading: skillsLoading } = useSkills()

  // 延迟显示卡片，避免布局计算导致的闪现
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardVisible(true)
    }, 500) // 等待500ms后开始显示
    
    return () => clearTimeout(timer)
  }, [])

  // 如果正在加载，显示加载状态
  if (settingsLoading || projectsLoading || skillsLoading) {
    return (
      <div style={aboutStyles.aboutSection}>
        <div style={aboutStyles.aboutContent}>
          <h2 style={aboutStyles.aboutTitle}>Loading...</h2>
        </div>
      </div>
    )
  }

  // 获取数据，如果没有则使用默认值
  const aboutData = settings?.about

  // 使用 WordPress 数据或默认数据
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : projectsData.slice(0, 3)
  const displaySkills = skills.length > 0 ? skills : skillsData

  // 将技能数据分成两列
  const leftSkills = displaySkills.filter((_, index) => index % 2 === 0)
  const rightSkills = displaySkills.filter((_, index) => index % 2 === 1)

  const dynamicNewSection = {
    ...aboutStyles.newSection,
    height: `${newSectionHeight}px`,
  }

  const finalCardStyle = {
    ...aboutStyles.cardStyle,
    opacity: cardVisible ? 1 : 0,
    transition: 'opacity 1.5s ease-in-out',
    border: '2px solid transparent',
    background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #dddddd, #eeeeee, #dddddd) border-box',
  }

  return (
    <>
      <div style={aboutStyles.aboutSection}>
        <div style={aboutStyles.aboutContent}>
          <h2 style={aboutStyles.aboutTitle}>{aboutData.title}</h2>
          <p style={aboutStyles.aboutText}>
            {aboutData.content}
          </p>
        </div>
      </div>
      <div style={dynamicNewSection}></div>
      <div style={aboutStyles.thirdSection}>
        <div style={aboutStyles.projectsContent}>
          <h2 style={aboutStyles.projectsTitle}>Projects</h2>
          <div style={aboutStyles.projectsGrid}>
            <div 
              key={displayProjects[0]?.title || displayProjects[0]?.title?.rendered} 
              style={aboutStyles.projectRow}
            >
              <div style={aboutStyles.projectImageContainer}>
                {displayProjects[0]?.svg || projectsData[0].svg}
              </div>
              <div style={aboutStyles.projectContent}>
                <h3 style={aboutStyles.projectTitle}>{displayProjects[0]?.title || displayProjects[0]?.title?.rendered}</h3>
                <p style={aboutStyles.projectDescription}>{displayProjects[0]?.description || displayProjects[0]?.excerpt?.rendered}</p>
                <div style={aboutStyles.projectTechnologies}>
                  {(displayProjects[0]?.technologies || displayProjects[0]?.acf?.technologies || []).map((technology) => (
                    <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={aboutStyles.projectLinks}>
                  {(displayProjects[0]?.link || displayProjects[0]?.acf?.live_url) && (
                    <a 
                      href={displayProjects[0]?.link || displayProjects[0]?.acf?.live_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '0-live' && aboutStyles.projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('0-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {(displayProjects[0]?.github || displayProjects[0]?.acf?.github_url) && (
                    <a 
                      href={displayProjects[0]?.github || displayProjects[0]?.acf?.github_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '0-github' && aboutStyles.projectLinkHover)
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
      <div style={aboutStyles.fourthSection}>
        <div style={aboutStyles.projectsContent}>
          <div style={aboutStyles.projectsGrid}>
            <div 
              key={displayProjects[1]?.title || displayProjects[1]?.title?.rendered} 
              style={aboutStyles.projectRow}
            >
              <div style={aboutStyles.projectContent}>
                <h3 style={aboutStyles.projectTitle}>{displayProjects[1]?.title || displayProjects[1]?.title?.rendered}</h3>
                <p style={aboutStyles.projectDescription}>{displayProjects[1]?.description || displayProjects[1]?.excerpt?.rendered}</p>
                <div style={aboutStyles.projectTechnologies}>
                  {(displayProjects[1]?.technologies || displayProjects[1]?.acf?.technologies || []).map((technology) => (
                    <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={aboutStyles.projectLinks}>
                  {(displayProjects[1]?.link || displayProjects[1]?.acf?.live_url) && (
                    <a 
                      href={displayProjects[1]?.link || displayProjects[1]?.acf?.live_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '1-live' && aboutStyles.projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('1-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {(displayProjects[1]?.github || displayProjects[1]?.acf?.github_url) && (
                    <a 
                      href={displayProjects[1]?.github || displayProjects[1]?.acf?.github_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '1-github' && aboutStyles.projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('1-github')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
              <div style={aboutStyles.projectImageContainer}>
                {displayProjects[1]?.svg || projectsData[1].svg}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={aboutStyles.fifthSection}>
        <div style={aboutStyles.projectsContent}>
          <div style={aboutStyles.projectsGrid}>
            <div 
              key={displayProjects[2]?.title || displayProjects[2]?.title?.rendered} 
              style={aboutStyles.projectRow}
            >
              <div style={aboutStyles.projectImageContainer}>
                {displayProjects[2]?.svg || projectsData[2].svg}
              </div>
              <div style={aboutStyles.projectContent}>
                <h3 style={aboutStyles.projectTitle}>{displayProjects[2]?.title || displayProjects[2]?.title?.rendered}</h3>
                <p style={aboutStyles.projectDescription}>{displayProjects[2]?.description || displayProjects[2]?.excerpt?.rendered}</p>
                <div style={aboutStyles.projectTechnologies}>
                  {(displayProjects[2]?.technologies || displayProjects[2]?.acf?.technologies || []).map((technology) => (
                    <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                  ))}
                </div>
                <div style={aboutStyles.projectLinks}>
                  {(displayProjects[2]?.link || displayProjects[2]?.acf?.live_url) && (
                    <a 
                      href={displayProjects[2]?.link || displayProjects[2]?.acf?.live_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '2-live' && aboutStyles.projectLinkHover)
                      }}
                      onMouseEnter={() => setHoveredProject('2-live')}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      Live <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                  )}
                  {(displayProjects[2]?.github || displayProjects[2]?.acf?.github_url) && (
                    <a 
                      href={displayProjects[2]?.github || displayProjects[2]?.acf?.github_url} 
                      style={{
                        ...aboutStyles.projectLink,
                        ...(hoveredProject === '2-github' && aboutStyles.projectLinkHover)
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
        <h3 style={aboutStyles.cardTitle}>Proficiency</h3>
        <div style={aboutStyles.skillsContainer}>
          {leftSkills.map((skill, index) => (
            <div key={skill.id || skill.name || index} style={aboutStyles.skillRow}>
              <div style={aboutStyles.skillItem}>
                <div style={aboutStyles.skillPercentage}>{skill.percentage || skill.acf?.percentage}%</div>
                <div style={aboutStyles.progressContainerLeft}>
                  <div style={aboutStyles.progressBarLeft}>
                    <div style={{...aboutStyles.progressFillLeft, width: `${skill.percentage || skill.acf?.percentage}%`}}></div>
                  </div>
                </div>
                <div style={{...aboutStyles.skillLogo, background: skill.color || skill.acf?.color}}>{skill.icon || skill.acf?.icon}</div>
              </div>
              {rightSkills[index] && (
                <div style={aboutStyles.skillItemRight}>
                  <div style={aboutStyles.skillPercentage}>{rightSkills[index].percentage || rightSkills[index].acf?.percentage}%</div>
                  <div style={aboutStyles.progressContainer}>
                    <div style={aboutStyles.progressBar}>
                      <div style={{...aboutStyles.progressFill, width: `${rightSkills[index].percentage || rightSkills[index].acf?.percentage}%`}}></div>
                    </div>
                  </div>
                  <div style={{...aboutStyles.skillLogo, background: rightSkills[index].color || rightSkills[index].acf?.color}}>{rightSkills[index].icon || rightSkills[index].acf?.icon}</div>
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