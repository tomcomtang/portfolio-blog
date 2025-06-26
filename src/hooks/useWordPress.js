import { useState, useEffect } from 'react'
import { 
  getProjects, 
  getSkills, 
  getPosts, 
  getPostsWithTags,
  getPostsWithWordPressTags,
  getCommentsPageConfig, 
  getContactPageConfig,
  getPageConfig,
  isWordPressConfigured 
} from '../services/wordpressApi'
import { 
  heroData, 
  aboutData, 
  projectsData, 
  skillsData, 
  siteSettingsData,
  postsData,
  commentsPageData,
  contactPageData
} from '../data/mockData'

// 通用数据获取hook
const useWordPressData = (fetchFunction, fallbackData) => {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!isWordPressConfigured()) {
        setData(fallbackData)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchFunction, fallbackData])

  return { data, loading, error }
}

// 获取首页数据
export const useHomePageData = () => {
  const [hero, setHero] = useState(heroData)
  const [about, setAbout] = useState(aboutData)
  const [projects, setProjects] = useState(projectsData)
  const [skills, setSkills] = useState(skillsData)
  const [siteSettings, setSiteSettings] = useState(siteSettingsData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHomePageData = async () => {
      if (!isWordPressConfigured()) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        // 获取首页配置
        const homeConfig = await getPageConfig('home')
        
        // 更新hero数据
        if (homeConfig.hero_title) {
          setHero(prev => ({
            ...prev,
            title: homeConfig.hero_title,
            subtitle: homeConfig.hero_subtitle,
            description: homeConfig.hero_description,
            buttonText: homeConfig.hero_button_text,
            buttonLink: homeConfig.hero_button_link,
            image: homeConfig.hero_image,
          }))
        }

        // 更新about数据
        if (homeConfig.about_title) {
          setAbout(prev => ({
            ...prev,
            title: homeConfig.about_title,
            description: homeConfig.about_description,
            image: homeConfig.about_image,
          }))
        }

        // 更新site settings
        if (homeConfig.site_title) {
          setSiteSettings(prev => ({
            ...prev,
            title: homeConfig.site_title,
            description: homeConfig.site_description,
            logo: homeConfig.site_logo,
          }))
        }

      } catch (err) {
        console.error('Error fetching home page data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHomePageData()
  }, [])

  return { hero, about, projects, skills, siteSettings, loading, error }
}

// 获取项目数据
export const useProjects = () => {
  return useWordPressData(getProjects, projectsData)
}

// 获取技能数据
export const useSkills = () => {
  return useWordPressData(getSkills, skillsData)
}

// 获取文章数据
export const usePosts = () => {
  return useWordPressData(getPosts, postsData)
}

// 获取带标签的完整文章数据（从WordPress API）
export const usePostsWithTags = () => {
  return useWordPressData(getPostsWithTags, postsData)
}

// 获取带WordPress标签的文章数据
export const usePostsWithWordPressTags = () => {
  return useWordPressData(getPostsWithWordPressTags, postsData)
}

// 获取评论页面配置
export const useCommentsPageConfig = () => {
  return useWordPressData(getCommentsPageConfig, commentsPageData)
}

// 获取联系页面配置
export const useContactPageConfig = () => {
  return useWordPressData(getContactPageConfig, contactPageData)
}

// 获取站点设置
export const useSiteSettings = () => {
  return useWordPressData(
    async () => {
      const homeConfig = await getPageConfig('home')
      return {
        hero: {
          name: homeConfig.hero_subtitle || siteSettingsData.hero.name,
          title: homeConfig.hero_title || siteSettingsData.hero.title,
          description: homeConfig.hero_description || siteSettingsData.hero.description,
          avatar: homeConfig.hero_image || siteSettingsData.hero.avatar,
          social_links: siteSettingsData.hero.social_links,
          buttons: siteSettingsData.hero.buttons,
        },
        about: {
          title: homeConfig.about_title || siteSettingsData.about.title,
          content: homeConfig.about_description || siteSettingsData.about.content,
          personal_info: siteSettingsData.about.personal_info,
        },
        site_info: {
          title: homeConfig.site_title || siteSettingsData.site_info.title,
          description: homeConfig.site_description || siteSettingsData.site_info.description,
          author: siteSettingsData.site_info.author,
          email: siteSettingsData.site_info.email,
          phone: siteSettingsData.site_info.phone,
          address: siteSettingsData.site_info.address,
          copyright: siteSettingsData.site_info.copyright,
        },
        social_media: siteSettingsData.social_media,
        navigation: siteSettingsData.navigation,
        theme: siteSettingsData.theme,
      }
    },
    siteSettingsData
  )
} 