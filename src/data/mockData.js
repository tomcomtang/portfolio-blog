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
    svg: '/svg/project1.svg',
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
    svg: '/svg/project2.svg',
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Gatsby and styled-components. Features smooth animations and SEO optimization.',
    technologies: ['Gatsby', 'Styled-components', 'GraphQL', 'Netlify'],
    svg: '/svg/project3.svg',
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

// 文章数据
export const postsData = [
  {
    id: 1,
    title: "Getting Started with Gatsby",
    subtitle: "A comprehensive guide to building fast websites with Gatsby",
    tags: ["Gatsby", "React", "Web Development"],
    readTime: "8 min read",
    date: "2024-01-15",
    excerpt: "Learn how to build blazing fast websites with Gatsby, React, and GraphQL. This guide covers everything from setup to deployment.",
    slug: "getting-started-with-gatsby"
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    subtitle: "Master modern CSS with Flexbox, Grid, and Custom Properties",
    tags: ["CSS", "Frontend", "Design"],
    readTime: "12 min read",
    date: "2024-01-15",
    excerpt: "Explore advanced CSS techniques including Flexbox, CSS Grid, and CSS Custom Properties to create modern, responsive layouts.",
    slug: "advanced-css-techniques"
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    subtitle: "Tips and tricks to make your JavaScript code faster",
    tags: ["JavaScript", "Performance", "Web Development"],
    readTime: "15 min read",
    date: "2024-01-10",
    excerpt: "Discover proven techniques to optimize your JavaScript code for better performance and user experience.",
    slug: "javascript-performance-optimization"
  },
  {
    id: 4,
    title: "React Hooks Deep Dive",
    subtitle: "Understanding useState, useEffect, and custom hooks",
    tags: ["React", "JavaScript", "Frontend"],
    readTime: "10 min read",
    date: "2024-01-10",
    excerpt: "A deep dive into React Hooks, covering useState, useEffect, and how to create custom hooks for reusable logic.",
    slug: "react-hooks-deep-dive"
  },
  {
    id: 5,
    title: "SEO Best Practices for Developers",
    subtitle: "Technical SEO strategies for better search rankings",
    tags: ["SEO", "Web Development", "Marketing"],
    readTime: "14 min read",
    date: "2024-01-10",
    excerpt: "Learn technical SEO strategies that developers can implement to improve search engine rankings and user experience.",
    slug: "seo-best-practices-for-developers"
  },
  {
    id: 6,
    title: "Building REST APIs with Node.js",
    subtitle: "Create robust APIs using Express.js and MongoDB",
    tags: ["Node.js", "API", "Backend"],
    readTime: "18 min read",
    date: "2024-01-05",
    excerpt: "Step-by-step guide to building RESTful APIs with Node.js, Express.js, and MongoDB with best practices and security considerations.",
    slug: "building-rest-apis-with-nodejs"
  },
  {
    id: 7,
    title: "TypeScript for React Developers",
    subtitle: "Adding type safety to your React applications",
    tags: ["TypeScript", "React", "Frontend"],
    readTime: "11 min read",
    date: "2024-01-05",
    excerpt: "Learn how to integrate TypeScript with React to build more robust and maintainable applications.",
    slug: "typescript-for-react-developers"
  },
  {
    id: 8,
    title: "Modern JavaScript Features",
    subtitle: "ES6+ features every developer should know",
    tags: ["JavaScript", "ES6", "Frontend"],
    readTime: "9 min read",
    date: "2023-12-28",
    excerpt: "Explore modern JavaScript features including arrow functions, destructuring, and async/await.",
    slug: "modern-javascript-features"
  }
]

// 评论页面配置数据
export const commentsPageData = {
  title: "Comments & Discussion",
  description: "Share your thoughts, questions, or suggestions here. Let's connect and discuss!",
  subtitle: "💬 Join the Discussion",
  subtitle_description: "Have something to say or ask? Leave your comment below!",
  giscus_config: {
    repo: "tomcomtang/portfolio-blog",
    repoId: "R_kgDOPBDz5Q",
    category: "Ideas",
    categoryId: "DIC_kwDOPBDz5c4Cr_AK",
    mapping: "pathname",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "noborder_light",
    lang: "en",
    loading: "lazy"
  },
  community_guidelines: [
    {
      text: "Be respectful and constructive in your comments",
      color: "#76cfc5",
      icon: "circle"
    },
    {
      text: "No spam, self-promotion, or advertising allowed",
      color: "#ffb400", 
      icon: "square"
    },
    {
      text: "No personal attacks, hate speech, or harassment",
      color: "#ec6664",
      icon: "triangle"
    },
    {
      text: "Stay on topic and keep discussions relevant",
      color: "#b4b8f8",
      icon: "pentagon"
    },
    {
      text: "No inappropriate, offensive, or illegal content",
      color: "#76cfc5",
      icon: "star"
    },
    {
      text: "Use clear, friendly, and inclusive language",
      color: "#ffb400",
      icon: "heart"
    }
  ]
}

// 联系页面配置数据
export const contactPageData = {
  title: "Get In Touch",
  description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  contact_info: {
    email: {
      label: "Email",
      value: "tom@example.com",
      icon: "email",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)"
    },
    phone: {
      label: "Phone", 
      value: "+1 (234) 567-890",
      icon: "phone",
      gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
    },
    location: {
      label: "Location",
      value: "San Francisco, CA",
      icon: "location",
      gradient: "linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)"
    }
  },
  social_media: [
    {
      name: "Twitter",
      url: "https://twitter.com/your_twitter",
      icon: "twitter"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/your_linkedin", 
      icon: "linkedin"
    },
    {
      name: "Facebook",
      url: "https://facebook.com/your_facebook",
      icon: "facebook"
    },
    {
      name: "GitHub",
      url: "https://github.com/tomcomtang",
      icon: "github"
    }
  ],
  bottom_info: {
    response_time: "I typically respond to messages within 24 hours during business days.",
    closing_message: "Looking forward to hearing from you! 🚀"
  }
}

// HeroSection 完整配置数据
export const heroSectionConfig = {
  // 基本信息
  basic: {
    name: "Tom Tang",
    title: "I'm",
    description: "I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.\nWelcome to my portfolio blog!",
    avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
  },
  
  // 按钮配置
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