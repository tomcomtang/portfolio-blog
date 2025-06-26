import { useState, useEffect } from 'react'
import { getSiteSettings, getProjects, getSkills } from '../services/wordpressApi'
import { siteSettingsData, projectsData, skillsData } from '../data/mockData'

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