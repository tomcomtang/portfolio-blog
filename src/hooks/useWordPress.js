import { useState, useEffect, useCallback } from 'react'
import { 
  getProjects, 
  getSkills, 
  getPosts, 
  getPostsWithTags,
  getPostsWithWordPressTags,
  getCommentsPageConfig, 
  getContactPageConfig,
  getPageConfig,
  isWordPressConfigured,
  getProjectsFromPage,
  getSkillsFromCategory,
  getProjectsFromCategory,
  getSocialMediaFromCategory,
  getHeroFromCategory,
  getAboutFromCategory
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
import React from 'react'

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
  const [settings, setSettings] = useState(siteSettingsData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      if (!isWordPressConfigured()) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        // 获取首页配置
        const homeConfig = await getPageConfig('home')

        setSettings({
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
          navigation: siteSettingsData.navigation,
          theme: siteSettingsData.theme,
        })
      } catch (err) {
        console.error('Error fetching site settings:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error }
}

// 获取首页项目数据（优先WordPress页面内容，失败则用mockData）
export const useProjectsFromPage = () => {
  return useWordPressData(getProjectsFromPage, projectsData)
}

// 新增：通过 public-api 获取 skills 页内容
export const useSkillsFromPage = () => {
  const fetchSkills = React.useCallback(async () => {
    const siteName = (process.env.GATSBY_WORDPRESS_URL || 'https://tomchild5.wordpress.com')
      .replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/pages?slug=Skills`);
    const pages = await response.json();
    if (!pages || !pages.length) throw new Error('No skills page found');
    const page = pages[0];
    const content = page.content && page.content.rendered;
    if (!content) throw new Error('No content in skills page');
    // 尝试提取和解析JSON数组
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in skills page content');
    const jsonString = jsonMatch[0]
      .replace(/‘/g, "'")
      .replace(/’/g, "'")
      .replace(/“/g, '"')
      .replace(/”/g, '"');
    let skills = [];
    try {
      // eslint-disable-next-line no-eval
      skills = eval('(' + jsonString + ')');
    } catch (e) {
      throw new Error('Failed to parse JSON from skills page: ' + e.message);
    }
    return skills;
  }, []);
  return useWordPressData(fetchSkills, skillsData);
}

// 新增：通过分类 description 获取 skills
export const useSkillsFromCategory = () => {
  return useWordPressData(getSkillsFromCategory, skillsData)
}

// 新增：通过分类 description 获取 projects
export const useProjectsFromCategory = () => {
  return useWordPressData(getProjectsFromCategory, projectsData)
}

// 从分类获取社交媒体数据的 Hook
export const useSocialMediaFromCategory = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSocialMediaFromCategory();
        setSocialMedia(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return { socialMedia, loading, error };
};

// 从分类获取Hero数据的 Hook
export const useHeroFromCategory = () => {
  const [heroData, setHeroData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHeroFromCategory();
        setHeroData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return { heroData, loading, error };
};

// 专门请求aboutData的Hook
export const useAboutFromCategory = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAboutFromCategory();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return { aboutData, loading, error };
}; 