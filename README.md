# Portfolio Blog - Gatsby + WordPress

一个现代化的作品集博客，使用 Gatsby 构建，支持从 WordPress 动态获取数据或使用本地模拟数据。

## ✨ 特性

- 🎨 现代化响应式设计
- 📝 动态内容管理（WordPress + 本地数据）
- 🚀 基于 Gatsby 的快速性能
- 💬 Giscus 评论系统集成
- 📱 移动端优化
- 🎯 SEO 友好
- 🌙 深色模式支持（计划中）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd portfolio-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

创建 `.env` 文件：

```bash
# WordPress 集成（可选）
GATSBY_WORDPRESS_URL=https://your-wordpress-site.com

# 如果不设置 WordPress URL，将使用本地模拟数据
```

### 4. 启动开发服务器

```bash
npm run develop
```

访问 `http://localhost:8000` 查看网站。

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── HeroSection.js   # 首页英雄区域
│   ├── AboutMe.js       # 关于我组件
│   ├── header.js        # 页面头部
│   └── layout.js        # 布局组件
├── data/
│   └── mockData.js      # 本地模拟数据
├── hooks/
│   └── useWordPress.js  # WordPress 数据获取 hooks
├── pages/               # 页面组件
│   ├── index.js         # 首页
│   ├── posts.js         # 文章列表
│   ├── comments.js      # 评论页面
│   └── contact.js       # 联系页面
├── services/
│   └── wordpressApi.js  # WordPress API 服务
└── styles/
    ├── homeStyles.js    # 首页样式
    ├── commentsStyles.js # 评论页面样式
    └── contactStyles.js  # 联系页面样式
```

## 🔧 WordPress 集成

### 支持的数据类型

- **首页内容**: Hero 区域、关于我、技能、项目
- **文章管理**: 博客文章列表和详情
- **页面配置**: 评论页面、联系页面设置
- **站点设置**: 标题、描述、Logo 等

### 数据获取策略

1. **优先从 WordPress 获取**: 如果配置了 WordPress URL
2. **回退到本地数据**: 如果 WordPress 不可用或未配置
3. **错误处理**: 优雅处理网络错误和 API 失败

### WordPress 设置

详细设置指南请查看 [WordPress 设置指南](docs/wordpress-setup-guide.md)

## 🎨 自定义样式

所有样式都集中在 `src/styles/` 目录中：

- `homeStyles.js` - 首页相关样式
- `commentsStyles.js` - 评论页面样式
- `contactStyles.js` - 联系页面样式

## 📝 内容管理

### 本地数据编辑

编辑 `src/data/mockData.js` 来修改本地内容：

```javascript
export const heroData = {
  title: "您的标题",
  subtitle: "您的副标题",
  description: "您的描述",
  // ...
}
```

### WordPress 数据管理

1. 在 WordPress 后台创建相应页面
2. 使用自定义字段存储数据
3. 确保 REST API 已启用

## 🧪 测试

访问 `/wordpress-test` 页面来测试 WordPress API 连接：

```bash
npm run develop
# 然后访问 http://localhost:8000/wordpress-test
```

## 🚀 部署

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=YOUR_REPO_URL)

### 手动部署

```bash
npm run build
npm run serve
```

## 🔧 开发命令

```bash
npm run develop    # 启动开发服务器
npm run build      # 构建生产版本
npm run serve      # 本地预览生产版本
npm run clean      # 清理缓存
```

## 📚 技术栈

- **框架**: Gatsby 4
- **语言**: JavaScript (ES6+)
- **样式**: CSS Modules + Tailwind CSS
- **数据**: WordPress REST API + 本地 JSON
- **评论**: Giscus (GitHub Discussions)
- **部署**: Netlify (推荐)

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果遇到问题：

1. 查看 [WordPress 设置指南](docs/wordpress-setup-guide.md)
2. 检查浏览器控制台错误
3. 运行 WordPress 测试页面
4. 创建 Issue 描述问题

---

**注意**: 这是一个活跃开发中的项目，功能可能会持续更新和改进。
