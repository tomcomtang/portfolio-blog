import { useState, useEffect } from 'react'
import { getSiteSettings, getProjects, getSkills, getPosts, getCommentsPageConfig, getContactPageConfig } from '../services/wordpressApi'
import { siteSettingsData, projectsData, skillsData, postsData, commentsPageData, contactPageData } from '../data/mockData'

// 使用站点设置的 Hook
export const useSiteSettings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const wordpressSettings = await getSiteSettings()
        
        if (wordpressSettings) {
          setSettings(wordpressSettings)
        } else {
          // 使用 mock 数据
          setSettings(siteSettingsData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setSettings(siteSettingsData)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error }
}

// 使用项目数据的 Hook
export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const wordpressProjects = await getProjects()
        
        if (wordpressProjects && wordpressProjects.length > 0) {
          setProjects(wordpressProjects)
        } else {
          // 使用 mock 数据
          setProjects(projectsData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setProjects(projectsData)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}

// 使用技能数据的 Hook
export const useSkills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const wordpressSkills = await getSkills()
        
        if (wordpressSkills && wordpressSkills.length > 0) {
          setSkills(wordpressSkills)
        } else {
          // 使用 mock 数据
          setSkills(skillsData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setSkills(skillsData)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { skills, loading, error }
}

// 使用文章数据的 Hook
export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const wordpressPosts = await getPosts()
        
        if (wordpressPosts && wordpressPosts.length > 0) {
          setPosts(wordpressPosts)
        } else {
          // 使用 mock 数据
          setPosts(postsData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setPosts(postsData)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

// 使用评论页面配置的 Hook
export const useCommentsPageConfig = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const wordpressConfig = await getCommentsPageConfig()
        
        if (wordpressConfig) {
          setConfig(wordpressConfig)
        } else {
          // 使用 mock 数据
          setConfig(commentsPageData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setConfig(commentsPageData)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return { config, loading, error }
}

// 使用联系页面配置的 Hook
export const useContactPageConfig = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const wordpressConfig = await getContactPageConfig()
        
        if (wordpressConfig) {
          setConfig(wordpressConfig)
        } else {
          // 使用 mock 数据
          setConfig(contactPageData)
        }
      } catch (err) {
        setError(err)
        // 出错时使用 mock 数据
        setConfig(contactPageData)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return { config, loading, error }
} 