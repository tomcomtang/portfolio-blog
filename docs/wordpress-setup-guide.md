# WordPress 设置指南（无需插件）

本指南适用于在线 WordPress 托管服务（如 WordPress.com），这些服务不允许安装插件，即使是免费插件。

## 方案 1：使用 WordPress 原生自定义字段

### 1. 创建页面和设置自定义字段

#### 首页设置

1. 在 WordPress 后台创建一个名为"Home"的页面
2. 在页面编辑器中，点击右上角的"..."菜单
3. 选择"Preferences" > "Panels"
4. 启用"Custom fields"面板
5. 在页面底部会出现"Custom fields"区域
6. 添加以下自定义字段：

```
hero_title: 您的英雄标题
hero_subtitle: 您的副标题
hero_description: 英雄区域的描述文字
hero_button_text: 按钮文字
hero_button_link: 按钮链接
hero_image: 英雄区域图片URL

about_title: 关于我标题
about_description: 关于我描述
about_image: 关于我图片URL

skills_title: 技能标题
skills_description: 技能描述

projects_title: 项目标题
projects_description: 项目描述

site_title: 网站标题
site_description: 网站描述
site_logo: 网站Logo URL

contact_title: 联系页面标题
contact_description: 联系页面描述
contact_email: 联系邮箱
contact_phone: 联系电话
contact_address: 联系地址

social_github: GitHub链接
social_linkedin: LinkedIn链接
social_twitter: Twitter链接
social_instagram: Instagram链接

footer_text: 页脚文字
```

#### 评论页面设置

创建一个名为"Comments"的页面，添加以下自定义字段：

```
comments_title: 评论页面标题
comments_description: 评论页面描述
giscus_repo: your-username/your-repo
giscus_repo_id: 你的仓库ID
giscus_category: Announcements
giscus_category_id: 你的分类ID
giscus_mapping: pathname
giscus_strict: 0
giscus_reactions_enabled: 1
giscus_emit_metadata: 0
giscus_input_position: bottom
giscus_theme: preferred_color_scheme
giscus_lang: en
giscus_loading: lazy
```

#### 联系页面设置

创建一个名为"Contact"的页面，添加相同的联系相关自定义字段。

### 2. 项目数据设置

#### 方法 A：使用普通文章

1. 创建一个名为"Projects"的分类
2. 发布文章时选择"Projects"分类
3. 为每篇文章添加自定义字段：

```
project_image: 项目图片URL
project_link: 项目链接
project_github: GitHub链接
project_technologies: 技术栈（用逗号分隔）
project_featured: 1（表示精选项目）
```

#### 方法 B：使用页面

1. 创建一个名为"Projects"的页面
2. 在页面内容中使用 JSON 格式存储项目数据：

```json
{
  "projects": [
    {
      "title": "项目名称",
      "description": "项目描述",
      "image": "图片URL",
      "link": "项目链接",
      "github": "GitHub链接",
      "technologies": ["React", "Node.js"],
      "featured": true
    }
  ]
}
```

### 3. 技能数据设置

创建一个名为"Skills"的页面，在自定义字段中添加：

```
skills_data: [
  {
    "name": "JavaScript",
    "percentage": 90,
    "color": "#f7df1e",
    "icon": "💻"
  },
  {
    "name": "React",
    "percentage": 85,
    "color": "#61dafb",
    "icon": "⚛️"
  }
]
```

## 方案 2：使用页面内容存储数据

如果自定义字段不可用，可以在页面内容中使用特殊格式：

### 首页内容格式

```
<!--HERO-->
标题: 您的英雄标题
副标题: 您的副标题
描述: 英雄区域的描述文字
按钮文字: 开始探索
按钮链接: /about
图片: https://example.com/hero.jpg
<!--END HERO-->

<!--ABOUT-->
标题: 关于我
描述: 关于我的详细描述
图片: https://example.com/about.jpg
<!--END ABOUT-->

<!--SKILLS-->
标题: 我的技能
描述: 技能描述
<!--END SKILLS-->

<!--PROJECTS-->
标题: 我的项目
描述: 项目描述
<!--END PROJECTS-->
```

### 项目内容格式

```
<!--PROJECTS-->
[
  {
    "title": "项目名称",
    "description": "项目描述",
    "image": "图片URL",
    "link": "项目链接",
    "github": "GitHub链接",
    "technologies": ["React", "Node.js"],
    "featured": true
  }
]
<!--END PROJECTS-->
```

## 方案 3：使用 WordPress REST API 端点

如果您的托管服务支持，可以创建自定义 REST API 端点：

1. 在主题的`functions.php`文件中添加：

```php
// 注册自定义REST API端点
add_action('rest_api_init', function () {
    register_rest_route('portfolio/v1', '/home', array(
        'methods' => 'GET',
        'callback' => 'get_home_data',
        'permission_callback' => '__return_true'
    ));
});

function get_home_data() {
    $home_page = get_page_by_path('home');
    $meta = get_post_meta($home_page->ID);

    return array(
        'hero' => array(
            'title' => $meta['hero_title'][0] ?? '',
            'subtitle' => $meta['hero_subtitle'][0] ?? '',
            'description' => $meta['hero_description'][0] ?? '',
            'buttonText' => $meta['hero_button_text'][0] ?? '',
            'buttonLink' => $meta['hero_button_link'][0] ?? '',
            'image' => $meta['hero_image'][0] ?? '',
        ),
        'about' => array(
            'title' => $meta['about_title'][0] ?? '',
            'description' => $meta['about_description'][0] ?? '',
            'image' => $meta['about_image'][0] ?? '',
        ),
        // ... 其他数据
    );
}
```

## 环境变量设置

在您的`.env`文件中设置 WordPress URL：

```
GATSBY_WORDPRESS_URL=https://your-wordpress-site.com
```

## 测试数据获取

1. 确保 WordPress URL 正确设置
2. 访问您的 Gatsby 站点
3. 打开浏览器开发者工具
4. 查看 Network 标签页，确认 API 请求是否成功
5. 查看 Console 标签页，确认是否有错误信息

## 故障排除

### 常见问题

1. **CORS 错误**: 确保 WordPress 站点允许跨域请求
2. **404 错误**: 检查页面 slug 是否正确
3. **权限错误**: 确保 REST API 已启用
4. **数据格式错误**: 检查自定义字段名称是否匹配

### 调试步骤

1. 直接访问 WordPress REST API 端点：

   - `https://your-site.com/wp-json/wp/v2/pages?slug=home`
   - `https://your-site.com/wp-json/wp/v2/posts`

2. 检查自定义字段是否在 API 响应中：

   - 查看页面 API 响应的`meta`字段

3. 验证数据格式：
   - 确保 JSON 格式正确
   - 检查字段名称是否匹配

## 性能优化

1. **缓存**: 考虑使用 WordPress 缓存插件（如果可用）
2. **图片优化**: 使用 WordPress 的图片尺寸功能
3. **CDN**: 配置 CDN 以提高加载速度
4. **压缩**: 启用 GZIP 压缩

## 安全考虑

1. **API 限制**: 考虑添加 API 访问限制
2. **数据验证**: 验证从 WordPress 获取的数据
3. **错误处理**: 优雅处理 API 错误
4. **HTTPS**: 确保使用 HTTPS 连接

这个设置方案完全不需要任何插件，只使用 WordPress 的原生功能，适合各种托管 WordPress 服务。
