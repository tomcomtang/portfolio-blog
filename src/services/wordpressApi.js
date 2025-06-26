// WordPress API 服务
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL

// 检查是否配置了 WordPress URL
const isWordPressConfigured = () => {
  return WORDPRESS_URL && WORDPRESS_URL.trim() !== ''
}

// 获取站点设置
export const getSiteSettings = async () => {
  if (!isWordPressConfigured()) {
    return null
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=home`)
    const pages = await response.json()
    
    if (pages && pages.length > 0) {
      const page = pages[0]
      return {
        hero: {
          name: page.acf?.hero_name || "Tom Tang",
          title: page.acf?.hero_title || "I'm",
          description: page.acf?.hero_description || "I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.\nWelcome to my portfolio blog!",
          avatar: page.acf?.hero_avatar || "https://avatars.githubusercontent.com/u/20943608?v=4",
          social_links: page.acf?.social_links || [],
          buttons: page.acf?.hero_buttons || []
        },
        about: {
          title: page.acf?.about_title || "About Me",
          content: page.acf?.about_content || "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
          personal_info: {
            name: page.acf?.personal_name || "Tom Tang",
            bio: page.acf?.personal_bio || "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
            avatar: page.acf?.personal_avatar || "https://avatars.githubusercontent.com/u/20943608?v=4"
          }
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// 获取项目数据
export const getProjects = async () => {
  if (!isWordPressConfigured()) {
    return []
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/projects?per_page=10&_embed`)
    const projects = await response.json()
    
    return projects.map(project => ({
      id: project.id,
      title: project.title.rendered,
      description: project.excerpt.rendered,
      technologies: project.acf?.technologies || [],
      link: project.acf?.live_url || '',
      github: project.acf?.github_url || '',
      svg: project.acf?.project_icon || null
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// 获取技能数据
export const getSkills = async () => {
  if (!isWordPressConfigured()) {
    return []
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/skills?per_page=20`)
    const skills = await response.json()
    
    return skills.map(skill => ({
      id: skill.id,
      name: skill.title.rendered,
      percentage: skill.acf?.percentage || 0,
      color: skill.acf?.color || '#76cfc5',
      icon: skill.acf?.icon || '💻'
    }))
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
} 