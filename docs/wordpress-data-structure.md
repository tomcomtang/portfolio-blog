# WordPress 数据结构参考

本文档展示了 WordPress 中的数据应该如何设置，以匹配我们的 mockData 格式。

## 📝 文章数据结构

### MockData 格式

```javascript
{
  id: 1,
  title: "Getting Started with Gatsby",
  subtitle: "A comprehensive guide to building fast websites with Gatsby",
  tags: ["Gatsby", "React", "Web Development"],
  readTime: "8 min read",
  date: "2025-01-15",
  excerpt: "Learn how to build blazing fast websites with Gatsby...",
  slug: "getting-started-with-gatsby"
}
```

### WordPress 设置

#### 1. 基本文章信息

- **标题**: 在文章编辑器中设置
- **摘要**: 在"摘要"字段中设置
- **内容**: 在文章编辑器中编写
- **日期**: 自动生成，可在发布设置中修改
- **Slug**: 自动生成，可在发布设置中修改

#### 2. 标签 (Tags)

- **位置**: 文章编辑页面右侧边栏 → "标签"
- **格式**: 每个标签用逗号分隔
- **示例**: `Gatsby, React, Web Development`

#### 3. 分类 (Categories)

- **位置**: 文章编辑页面右侧边栏 → "分类"
- **建议分类**:
  - 技术
  - 编程
  - 前端开发
  - 后端开发
  - 教程

#### 4. 自定义字段 (Custom Fields)

在文章编辑页面底部添加自定义字段：

| 字段名           | 值                                                            | 说明       |
| ---------------- | ------------------------------------------------------------- | ---------- |
| `post_subtitle`  | "A comprehensive guide to building fast websites with Gatsby" | 文章副标题 |
| `post_read_time` | "8 min read"                                                  | 阅读时间   |

## 🏠 首页数据结构

### MockData 格式

```javascript
{
  hero_title: "I'm",
  hero_subtitle: "Tom Tang",
  hero_description: "I'm a web developer and blogger...",
  hero_button_text: "View Posts",
  hero_button_link: "/posts",
  hero_image: "https://example.com/hero.jpg",
  about_title: "About Me",
  about_description: "Hi, I'm Tom Tang...",
  about_image: "https://example.com/about.jpg"
}
```

### WordPress 设置

#### 创建 "Home" 页面

1. 创建新页面，标题为 "Home"
2. 在页面底部添加自定义字段：

| 字段名              | 值                                   | 说明           |
| ------------------- | ------------------------------------ | -------------- |
| `hero_title`        | "I'm"                                | 英雄区域标题   |
| `hero_subtitle`     | "Tom Tang"                           | 英雄区域副标题 |
| `hero_description`  | "I'm a web developer and blogger..." | 英雄区域描述   |
| `hero_button_text`  | "View Posts"                         | 按钮文字       |
| `hero_button_link`  | "/posts"                             | 按钮链接       |
| `hero_image`        | "https://example.com/hero.jpg"       | 英雄区域图片   |
| `about_title`       | "About Me"                           | 关于我标题     |
| `about_description` | "Hi, I'm Tom Tang..."                | 关于我描述     |
| `about_image`       | "https://example.com/about.jpg"      | 关于我图片     |

## 💼 项目数据结构

### MockData 格式

```javascript
{
  id: 1,
  title: "E-Commerce Platform",
  description: "A full-stack e-commerce platform...",
  image: "https://example.com/project1.jpg",
  link: "https://project1.com",
  github: "https://github.com/user/project1",
  technologies: ["React", "Node.js", "MongoDB"],
  featured: true
}
```

### WordPress 设置

#### 方法 1: 使用普通文章 + 分类

1. 创建 "Projects" 分类
2. 发布文章时选择 "Projects" 分类
3. 添加自定义字段：

| 字段名                 | 值                                 | 说明                   |
| ---------------------- | ---------------------------------- | ---------------------- |
| `project_image`        | "https://example.com/project1.jpg" | 项目图片               |
| `project_link`         | "https://project1.com"             | 项目链接               |
| `project_github`       | "https://github.com/user/project1" | GitHub 链接            |
| `project_technologies` | "React,Node.js,MongoDB"            | 技术栈（逗号分隔）     |
| `project_featured`     | "1"                                | 精选项目（1=是，0=否） |

#### 方法 2: 使用页面存储 JSON

创建 "Projects" 页面，在内容中添加：

```json
{
  "projects": [
    {
      "title": "E-Commerce Platform",
      "description": "A full-stack e-commerce platform...",
      "image": "https://example.com/project1.jpg",
      "link": "https://project1.com",
      "github": "https://github.com/user/project1",
      "technologies": ["React", "Node.js", "MongoDB"],
      "featured": true
    }
  ]
}
```

## 🎯 技能数据结构

### MockData 格式

```javascript
;[
  { id: 1, percentage: 95, color: "#61dafb", icon: "R", name: "React" },
  { id: 2, percentage: 90, color: "#f7df1e", icon: "JS", name: "JavaScript" },
]
```

### WordPress 设置

#### 创建 "Skills" 页面

1. 创建新页面，标题为 "Skills"
2. 添加自定义字段 `skills_data`，值为 JSON 字符串：

```json
[
  {
    "id": 1,
    "percentage": 95,
    "color": "#61dafb",
    "icon": "R",
    "name": "React"
  },
  {
    "id": 2,
    "percentage": 90,
    "color": "#f7df1e",
    "icon": "JS",
    "name": "JavaScript"
  },
  {
    "id": 3,
    "percentage": 88,
    "color": "#3178c6",
    "icon": "TS",
    "name": "TypeScript"
  }
]
```

## 💬 评论页面数据结构

### MockData 格式

```javascript
{
  title: "Comments & Discussion",
  description: "Share your thoughts, questions, or suggestions here.",
  giscus: {
    repo: "username/repo",
    repoId: "R_kgDOPBDz5Q",
    category: "Announcements",
    categoryId: "DIC_kwDOPBDz5c4Cr_AK"
  }
}
```

### WordPress 设置

#### 创建 "Comments" 页面

添加自定义字段：

| 字段名                 | 值                       | 说明        |
| ---------------------- | ------------------------ | ----------- |
| `comments_title`       | "Comments & Discussion"  | 页面标题    |
| `comments_description` | "Share your thoughts..." | 页面描述    |
| `giscus_repo`          | "username/repo"          | Giscus 仓库 |
| `giscus_repo_id`       | "R_kgDOPBDz5Q"           | 仓库 ID     |
| `giscus_category`      | "Announcements"          | 分类名称    |
| `giscus_category_id`   | "DIC_kwDOPBDz5c4Cr_AK"   | 分类 ID     |

## 📞 联系页面数据结构

### MockData 格式

```javascript
{
  title: "Get In Touch",
  description: "I'm always open to discussing new projects...",
  contactInfo: {
    email: "tom@example.com",
    phone: "+1 234 567 890",
    address: "San Francisco, CA"
  },
  socialMedia: {
    github: "https://github.com/tomcomtang",
    linkedin: "https://linkedin.com/in/tomcomtang"
  }
}
```

### WordPress 设置

#### 创建 "Contact" 页面

添加自定义字段：

| 字段名                | 值                                   | 说明          |
| --------------------- | ------------------------------------ | ------------- |
| `contact_title`       | "Get In Touch"                       | 页面标题      |
| `contact_description` | "I'm always open to discussing..."   | 页面描述      |
| `contact_email`       | "tom@example.com"                    | 联系邮箱      |
| `contact_phone`       | "+1 234 567 890"                     | 联系电话      |
| `contact_address`     | "San Francisco, CA"                  | 联系地址      |
| `social_github`       | "https://github.com/tomcomtang"      | GitHub 链接   |
| `social_linkedin`     | "https://linkedin.com/in/tomcomtang" | LinkedIn 链接 |

## 🔧 测试数据获取

1. 启动开发服务器：`npm run develop`
2. 访问测试页面：`http://localhost:8000/wordpress-test`
3. 点击"运行测试"按钮
4. 检查各项数据是否正确获取

## 📋 检查清单

- [ ] 创建了所有必要的页面（Home, Comments, Contact, Skills）
- [ ] 设置了所有自定义字段
- [ ] 创建了文章并添加了标签
- [ ] 创建了项目分类和文章
- [ ] 测试了 API 连接
- [ ] 验证了数据格式正确

## 🚨 常见问题

1. **自定义字段不显示**: 确保在页面编辑器中启用了"自定义字段"面板
2. **API 返回 404**: 检查页面 slug 是否正确
3. **标签不显示**: 确保文章已发布且标签已正确添加
4. **JSON 解析错误**: 检查 JSON 格式是否正确
