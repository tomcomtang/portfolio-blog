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

// 获取文章数据
export const getPosts = async () => {
  if (!isWordPressConfigured()) {
    return []
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=20&_embed`)
    const posts = await response.json()
    
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      subtitle: post.acf?.subtitle || '',
      tags: post.acf?.tags || [],
      readTime: post.acf?.read_time || '5 min read',
      date: post.date.split('T')[0], // 只取日期部分
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // 移除HTML标签
      slug: post.slug
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// 获取评论页面配置
export const getCommentsPageConfig = async () => {
  if (!isWordPressConfigured()) {
    return null
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=comments`)
    const pages = await response.json()
    
    if (pages && pages.length > 0) {
      const page = pages[0]
      return {
        title: page.acf?.comments_title || "Comments & Discussion",
        description: page.acf?.comments_description || "Share your thoughts, questions, or suggestions here. Let's connect and discuss!",
        subtitle: page.acf?.comments_subtitle || "💬 Join the Discussion",
        subtitle_description: page.acf?.comments_subtitle_description || "Have something to say or ask? Leave your comment below!",
        giscus_config: {
          repo: page.acf?.giscus_repo || "tomcomtang/portfolio-blog",
          repoId: page.acf?.giscus_repo_id || "R_kgDOPBDz5Q",
          category: page.acf?.giscus_category || "Ideas",
          categoryId: page.acf?.giscus_category_id || "DIC_kwDOPBDz5c4Cr_AK",
          mapping: page.acf?.giscus_mapping || "pathname",
          reactionsEnabled: page.acf?.giscus_reactions_enabled || "1",
          emitMetadata: page.acf?.giscus_emit_metadata || "0",
          inputPosition: page.acf?.giscus_input_position || "top",
          theme: page.acf?.giscus_theme || "noborder_light",
          lang: page.acf?.giscus_lang || "en",
          loading: page.acf?.giscus_loading || "lazy"
        },
        community_guidelines: page.acf?.community_guidelines || []
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching comments page config:', error)
    return null
  }
}

// 获取联系页面配置
export const getContactPageConfig = async () => {
  if (!isWordPressConfigured()) {
    return null
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=contact`)
    const pages = await response.json()
    
    if (pages && pages.length > 0) {
      const page = pages[0]
      return {
        title: page.acf?.contact_title || "Get In Touch",
        description: page.acf?.contact_description || "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
        contact_info: {
          email: {
            label: page.acf?.email_label || "Email",
            value: page.acf?.email_value || "tom@example.com",
            icon: page.acf?.email_icon || "email",
            gradient: page.acf?.email_gradient || "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)"
          },
          phone: {
            label: page.acf?.phone_label || "Phone",
            value: page.acf?.phone_value || "+1 (234) 567-890",
            icon: page.acf?.phone_icon || "phone",
            gradient: page.acf?.phone_gradient || "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
          },
          location: {
            label: page.acf?.location_label || "Location",
            value: page.acf?.location_value || "San Francisco, CA",
            icon: page.acf?.location_icon || "location",
            gradient: page.acf?.location_gradient || "linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)"
          }
        },
        social_media: page.acf?.social_media || [],
        bottom_info: {
          response_time: page.acf?.response_time || "I typically respond to messages within 24 hours during business days.",
          closing_message: page.acf?.closing_message || "Looking forward to hearing from you! 🚀"
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching contact page config:', error)
    return null
  }
} 