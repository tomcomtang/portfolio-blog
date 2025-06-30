// 统一的兜底数据文件
// 当 WordPress API 请求失败或数据不完整时使用

// 文章兜底数据
const fallbackPosts = [
  {
    id: 1,
    title: "Getting Started with Gatsby",
    subtitle: "A comprehensive guide to building fast websites with Gatsby",
    author: "Someone",
    authorAvatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
    tags: ["Gatsby", "React", "Web Development"],
    readTime: "8 min read",
    date: "2025-01-15",
    excerpt: "Learn how to build blazing fast websites with Gatsby, React, and GraphQL. This guide covers everything from setup to deployment.",
    content: `
      <h2>Introduction</h2>
      <p>Gatsby is a powerful static site generator that uses React and GraphQL to create blazing fast websites. In this comprehensive guide, we'll explore how to get started with Gatsby and build your first website.</p>
      
      <h2>Why Choose Gatsby?</h2>
      <p>Gatsby offers several advantages for modern web development:</p>
      <ul>
        <li><strong>Performance:</strong> Gatsby generates static sites that load incredibly fast</li>
        <li><strong>SEO Friendly:</strong> Static sites are naturally SEO-optimized</li>
        <li><strong>Developer Experience:</strong> Hot reloading, GraphQL data layer, and rich plugin ecosystem</li>
        <li><strong>Scalability:</strong> Can handle sites with thousands of pages</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Gatsby site, you'll need Node.js installed on your system. Then run:</p>
      <pre><code>npm install -g gatsby-cli
gatsby new my-gatsby-site
cd my-gatsby-site
gatsby develop</code></pre>
      
      <h2>Conclusion</h2>
      <p>Gatsby is an excellent choice for building modern, performant websites. Its static site generation capabilities combined with React's component-based architecture make it a powerful tool for developers.</p>
    `,
    slug: "getting-started-with-gatsby"
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    subtitle: "Master modern CSS with Flexbox, Grid, and Custom Properties",
    author: "Someone",
    authorAvatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
    tags: ["CSS", "Frontend", "Design"],
    readTime: "12 min read",
    date: "2025-01-10",
    excerpt: "Explore advanced CSS techniques including Flexbox, CSS Grid, and CSS Custom Properties to create modern, responsive layouts.",
    content: `
      <h2>Modern CSS Landscape</h2>
      <p>CSS has evolved significantly over the years, introducing powerful layout systems and features that make web development more efficient and flexible.</p>
      
      <h2>CSS Flexbox</h2>
      <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. It's perfect for navigation menus, card layouts, and centering content.</p>
      
      <h2>CSS Grid</h2>
      <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.</p>
      
      <h2>CSS Custom Properties</h2>
      <p>CSS Custom Properties (CSS Variables) allow you to store and reuse values throughout your stylesheet.</p>
      
      <h2>Conclusion</h2>
      <p>Modern CSS provides powerful tools for creating beautiful, responsive, and maintainable websites.</p>
    `,
    slug: "advanced-css-techniques"
  }
];

// Hero 分类兜底数据
const fallbackHero = {
  title: "Welcome",
  name: "Developer",
  description: "A passionate web developer",
  avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
};

// Contact 分类兜底数据
const fallbackContact = {
  title: "Contact Me",
  description: "Feel free to reach out for collaboration, questions, or just to say hi!",
  email: "your@email.com",
  phone: "",
  address: "",
  bottom_info: {
    response_time: "I typically respond within 24 hours.",
    closing_message: "Looking forward to hearing from you!"
  }
};

// Socials 分类兜底数据
const fallbackSocials = {
  socials: [
    { name: "twitter", val: "https://twitter.com/", svg: "twitter.svg", type: "social" },
    { name: "linkedin", val: "https://linkedin.com/in/your", svg: "linkedin.svg", type: "social" },
    { name: "facebook", val: "https://facebook.com/your", svg: "facebook.svg", type: "social" },
    { name: "github", val: "https://github.com/your", svg: "github.svg", type: "social" },
    { name: "email", val: "mailto:your@email.com", svg: "email.svg", address: "your@email.com", type: "contact" },
    { name: "phone", val: "tel:+1234567890", svg: "phone.svg", address: "+1234567890", type: "contact" },
    { name: "location", val: "#", address: "San Francisco, CA", svg: "location.svg", type: "contact" }
  ]
};

// Comments 分类兜底数据
const fallbackComments = {
  title: "Comments & Discussion",
  description: "Share your thoughts, questions, or suggestions here. Let's connect and discuss!",
  rules: [
    "Be respectful and constructive in your comments.",
    "No spam, self-promotion, or advertising allowed.",
    "No personal attacks, hate speech, or harassment.",
    "Stay on topic and keep discussions relevant.",
    "No inappropriate, offensive, or illegal content.",
    "Use clear, friendly, and inclusive language."
  ]
};

// Posts 分类兜底数据
const fallbackPostsMeta = {
  title: "Blog Posts",
  description: "Explore our latest articles on web development, design, and technology"
};

// About 分类兜底数据
const fallbackAbout = {
  title: "About Me",
  content: "Hi, I'm Someone, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community."
};

// Footer 分类兜底数据
const fallbackFooter = {
  text: "© 2025 Someone. All rights reserved.",
  links: [
    { title: "Privacy Policy", url: "/privacy" },
    { title: "Terms of Service", url: "/terms" }
  ],
  extra: "Built with Gatsby + WordPress"
};

// Skills 分类兜底数据
const fallbackSkills = [
  { id: 1, percentage: 95, color: "#61dafb", icon: "R", name: "React" },
  { id: 2, percentage: 90, color: "#f7df1e", icon: "JS", name: "JavaScript" },
  { id: 3, percentage: 88, color: "#3178c6", icon: "TS", name: "TypeScript" },
  { id: 4, percentage: 85, color: "#41b883", icon: "V", name: "Vue.js" },
  { id: 5, percentage: 82, color: "#000000", icon: "N", name: "Node.js" },
  { id: 6, percentage: 80, color: "#e34c26", icon: "H", name: "HTML5" },
  { id: 7, percentage: 78, color: "#264de4", icon: "C", name: "CSS3" },
  { id: 8, percentage: 76, color: "#cc6699", icon: "S", name: "Sass" },
  { id: 9, percentage: 74, color: "#f05032", icon: "G", name: "Git" },
  { id: 10, percentage: 72, color: "#61dafb", icon: "N", name: "Next.js" },
  { id: 11, percentage: 70, color: "#ff3e00", icon: "R", name: "Redux" },
  { id: 12, percentage: 68, color: "#007acc", icon: "W", name: "Webpack" }
];

// Projects 分类兜底数据
const fallbackProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB.",
    technologies: ["React", "Node.js", "MongoDB"],
    svg: "/svg/project1.svg",
    link: "#",
    github: "#",
    percentage: 95,
    color: "#61dafb",
    icon: "R",
    name: "React"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["Vue.js", "Firebase", "Vuex"],
    svg: "/svg/project2.svg",
    link: "#",
    github: "#",
    percentage: 90,
    color: "#41b883",
    icon: "V",
    name: "Vue.js"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with location-based forecasts.",
    technologies: ["JavaScript", "CSS3", "Weather API"],
    svg: "/svg/project3.svg",
    link: "#",
    github: "#",
    percentage: 88,
    color: "#f7df1e",
    icon: "JS",
    name: "JavaScript"
  }
];

// 默认作者信息
const defaultAuthor = "Someone";
const defaultAuthorAvatar = "https://avatars.githubusercontent.com/u/20943608?v=4";

// 站点配置兜底数据
const fallbackSiteConfig = {
  siteName: "Portfolio Blog",
  wordpressUrl: "https://example.wordpress.com"
};

module.exports = {
  fallbackPosts,
  fallbackHero,
  fallbackContact,
  fallbackSocials,
  fallbackComments,
  fallbackPostsMeta,
  fallbackAbout,
  fallbackFooter,
  fallbackSkills,
  fallbackProjects,
  defaultAuthor,
  defaultAuthorAvatar,
  fallbackSiteConfig
}; 