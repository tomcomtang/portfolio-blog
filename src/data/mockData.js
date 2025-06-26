import * as React from "react"

// 首页 Hero Section 数据
export const heroData = {
  name: "Tom Tang",
  title: "I'm",
  description: "I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.\nWelcome to my portfolio blog!",
  avatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
  social_links: [
    {
      platform: "twitter",
      url: "https://twitter.com/your_twitter",
      title: "Twitter",
      icon: "twitter"
    },
    {
      platform: "linkedin", 
      url: "https://www.linkedin.com/in/your_linkedin",
      title: "LinkedIn",
      icon: "linkedin"
    },
    {
      platform: "facebook",
      url: "https://facebook.com/your_facebook", 
      title: "Facebook",
      icon: "facebook"
    },
    {
      platform: "github",
      url: "https://github.com/tomcomtang",
      title: "GitHub", 
      icon: "github"
    }
  ],
  buttons: [
    {
      text: "View Posts",
      link: "/posts",
      type: "primary"
    },
    {
      text: "Contact Me", 
      link: "/contact",
      type: "secondary"
    }
  ]
}

// About Me 数据
export const aboutData = {
  title: "About Me",
  content: "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
  personal_info: {
    name: "Tom Tang",
    bio: "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
    avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
  }
}

// 项目数据
export const projectsData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

// 技能数据 - 12个技能，使用原来的纯色圆圈图标样式
export const skillsData = [
  { id: 1, percentage: 95, color: '#61dafb', icon: 'R', name: 'React' },
  { id: 2, percentage: 90, color: '#f7df1e', icon: 'JS', name: 'JavaScript' },
  { id: 3, percentage: 88, color: '#3178c6', icon: 'TS', name: 'TypeScript' },
  { id: 4, percentage: 85, color: '#e34c26', icon: 'H', name: 'HTML5' },
  { id: 5, percentage: 92, color: '#1572b6', icon: 'C', name: 'CSS3' },
  { id: 6, percentage: 87, color: '#563d7c', icon: 'B', name: 'Bootstrap' },
  { id: 7, percentage: 89, color: '#000000', icon: 'N', name: 'Node.js' },
  { id: 8, percentage: 83, color: '#339933', icon: 'G', name: 'Git' },
  { id: 9, percentage: 91, color: '#ff6b35', icon: 'P', name: 'Python' },
  { id: 10, percentage: 86, color: '#7952b3', icon: 'V', name: 'Vue.js' },
  { id: 11, percentage: 94, color: '#00d8ff', icon: 'G', name: 'Gatsby' },
  { id: 12, percentage: 82, color: '#f05032', icon: 'G', name: 'GitHub' }
]

// 网站设置默认数据
export const siteSettingsData = {
  hero: heroData,
  about: aboutData,
  site_info: {
    title: "Tom Tang's Portfolio Blog",
    description: "A personal portfolio and blog showcasing web development projects and thoughts",
    author: "Tom Tang",
    email: "tom@example.com",
    phone: "+1 234 567 8900",
    address: "San Francisco, CA",
    copyright: "© 2024 Tom Tang. All rights reserved."
  },
  social_media: {
    twitter: "https://twitter.com/your_twitter",
    linkedin: "https://www.linkedin.com/in/your_linkedin",
    facebook: "https://facebook.com/your_facebook",
    github: "https://github.com/tomcomtang",
    instagram: "https://instagram.com/your_instagram",
    youtube: "https://youtube.com/your_youtube"
  },
  navigation: {
    main_menu: [
      { title: "Home", url: "/" },
      { title: "About", url: "/about" },
      { title: "Posts", url: "/posts" },
      { title: "Contact", url: "/contact" }
    ],
    footer_menu: [
      { title: "Privacy Policy", url: "/privacy" },
      { title: "Terms of Service", url: "/terms" },
      { title: "Sitemap", url: "/sitemap" }
    ]
  },
  theme: {
    primary_color: "#76cfc5",
    secondary_color: "#ec6664",
    accent_color: "#ffb400",
    background_color: "#fafdff",
    text_color: "#333333"
  }
} 