// WordPress API 服务
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL || 'https://tomchild5.wordpress.com'

// 检查是否配置了 WordPress URL
export const isWordPressConfigured = () => {
  return !!WORDPRESS_URL && WORDPRESS_URL !== 'https://your-wordpress-site.com';
}

// 获取WordPress.com API URL
const getWordPressComApiUrl = (endpoint) => {
  const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
  return `https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/${endpoint}`;
}

// 获取站点设置
export const getSiteSettings = async () => {
  if (!isWordPressConfigured()) {
    return null
  }

  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=home`)
    const pages = await response.json()
    
    if (pages && pages.length > 0) {
      const page = pages[0]
      return {
        hero: {
          name: page.acf?.hero_name || "Tom Tang",
          title: page.acf?.hero_title || "I'm",
          description: page.acf?.hero_description || "I'm a web developer and blogger, passionate about sharing knowledge and building cool things with code.\nWelcome to my portfolio blog!",
          avatar: page.acf?.hero_avatar || "https://avatars.githubusercontent.com/u/20943608?v=4",
          social_links: page.acf?.social_links || [],
          buttons: page.acf?.hero_buttons || []
        },
        about: {
          title: page.acf?.about_title || "About Me",
          content: page.acf?.about_content || "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
          personal_info: {
            name: page.acf?.personal_name || "Tom Tang",
            bio: page.acf?.personal_bio || "Hi, I'm Tom Tang, a passionate web developer and blogger. I love exploring new technologies and sharing knowledge with the community. On this blog, you'll find my thoughts on web development, tutorials, and project showcases. I hope my content can inspire others in their coding journey.",
            avatar: page.acf?.personal_avatar || "https://avatars.githubusercontent.com/u/20943608?v=4"
          }
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// 获取页面配置数据（使用原生自定义字段）
export const getPageConfig = async (pageSlug) => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${pageSlug}&_embed`);
    const pages = await response.json();
    
    if (pages.length === 0) {
      throw new Error(`Page ${pageSlug} not found`);
    }
    
    const page = pages[0];
    
    // 获取自定义字段数据
    const metaResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages/${page.id}`);
    const pageMeta = await metaResponse.json();
    
    // 从meta字段中提取数据
    const meta = pageMeta.meta || {};
    
    return {
      id: page.id,
      title: page.title.rendered,
      content: page.content.rendered,
      excerpt: page.excerpt.rendered,
      featured_media: page.featured_media,
      date: page.date,
      modified: page.modified,
      slug: page.slug,
      // 自定义字段数据
      hero_title: meta.hero_title || '',
      hero_subtitle: meta.hero_subtitle || '',
      hero_description: meta.hero_description || '',
      hero_button_text: meta.hero_button_text || '',
      hero_button_link: meta.hero_button_link || '',
      hero_image: meta.hero_image || '',
      about_title: meta.about_title || '',
      about_description: meta.about_description || '',
      about_image: meta.about_image || '',
      skills_title: meta.skills_title || '',
      skills_description: meta.skills_description || '',
      projects_title: meta.projects_title || '',
      projects_description: meta.projects_description || '',
      contact_title: meta.contact_title || '',
      contact_description: meta.contact_description || '',
      contact_email: meta.contact_email || '',
      contact_phone: meta.contact_phone || '',
      contact_address: meta.contact_address || '',
      social_github: meta.social_github || '',
      social_linkedin: meta.social_linkedin || '',
      social_twitter: meta.social_twitter || '',
      social_instagram: meta.social_instagram || '',
      footer_text: meta.footer_text || '',
      site_title: meta.site_title || '',
      site_description: meta.site_description || '',
      site_logo: meta.site_logo || '',
      comments_title: meta.comments_title || '',
      comments_description: meta.comments_description || '',
      giscus_repo: meta.giscus_repo || '',
      giscus_repo_id: meta.giscus_repo_id || '',
      giscus_category: meta.giscus_category || '',
      giscus_category_id: meta.giscus_category_id || '',
      giscus_mapping: meta.giscus_mapping || 'pathname',
      giscus_strict: meta.giscus_strict || '0',
      giscus_reactions_enabled: meta.giscus_reactions_enabled || '1',
      giscus_emit_metadata: meta.giscus_emit_metadata || '0',
      giscus_input_position: meta.giscus_input_position || 'bottom',
      giscus_theme: meta.giscus_theme || 'preferred_color_scheme',
      giscus_lang: meta.giscus_lang || 'en',
      giscus_loading: meta.giscus_loading || 'lazy',
    };
  } catch (error) {
    console.error('Error fetching page config:', error);
    throw error;
  }
};

// 获取项目数据（使用自定义文章类型或普通文章）
export const getProjectsFromPage = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/pages?slug=projects`);
    const pages = await response.json();
    if (!pages || !pages.length) throw new Error('No projects page found');
    const page = pages[0];
    // 提取content.rendered中的JSON字符串
    const content = page.content && page.content.rendered;
    if (!content) throw new Error('No content in projects page');
    // 尝试提取和解析JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in projects page content');
    const jsonString = jsonMatch[0]
      .replace(/‘/g, "'") // 替换中文引号
      .replace(/’/g, "'")
      .replace(/“/g, '"')
      .replace(/”/g, '"');
    let projects = [];
    try {
      // eslint-disable-next-line no-eval
      projects = eval('(' + jsonString + ')');
      console.log(projects);
      if (!Array.isArray(projects)) projects = [projects];
    } catch (e) {
      throw new Error('Failed to parse JSON from projects page: ' + e.message);
    }
    return projects;
  } catch (error) {
    console.error('Error fetching projects from page:', error);
    throw error;
  }
};

// 获取技能数据（从页面或文章内容中解析）
export const getSkills = async () => {
  try {
    // 尝试从特定页面获取技能数据
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=skills&_embed`);
    const pages = await response.json();
    
    if (pages.length > 0) {
      const page = pages[0];
      const meta = page.meta || {};
      
      // 从自定义字段获取技能数据
      const skillsData = meta.skills_data;
      if (skillsData) {
        try {
          return JSON.parse(skillsData);
        } catch (e) {
          console.error('Error parsing skills data:', e);
        }
      }
    }
    
    // 如果没有找到，返回空数组
    return [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

// 获取文章列表和标签（从WordPress API），其他内容从mock数据补充
export const getPostsWithWordPressTags = async () => {
  try {
    // 从环境变量中提取站点名称
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    
    // 获取WordPress文章列表 - 使用WordPress.com API格式
    const postsResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/posts?_embed&per_page=20`);
    const wpPosts = await postsResponse.json();
    
    // 获取WordPress标签 - 使用WordPress.com API格式
    const tagsResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/tags?per_page=100`);
    const wpTags = await tagsResponse.json();
    
    // 创建WordPress标签映射
    const wpTagMap = {};
    wpTags.forEach(tag => {
      wpTagMap[tag.id] = {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
        count: tag.count
      };
    });
    
    // 导入mock数据
    const { postsData } = await import('../data/mockData');
    
    // 合并WordPress文章和mock数据
    return wpPosts.map((wpPost, index) => {
      // 获取WordPress文章的标签
      const wpPostTags = [];
      if (wpPost._embedded && wpPost._embedded['wp:term']) {
        wpPost._embedded['wp:term'].forEach(termGroup => {
          termGroup.forEach(term => {
            if (term.taxonomy === 'post_tag' && wpTagMap[term.id]) {
              wpPostTags.push(wpTagMap[term.id].name);
            }
          });
        });
      }
      
      // 获取对应的mock数据（按索引匹配，如果超出范围则使用第一个）
      const mockPost = postsData[index] || postsData[0];
      
      return {
        id: wpPost.id,
        title: wpPost.title.rendered,
        subtitle: mockPost.subtitle, // 使用mock数据的副标题
        excerpt: wpPost.excerpt.rendered,
        content: wpPost.content.rendered,
        date: wpPost.date,
        modified: wpPost.modified,
        slug: wpPost.slug,
        tags: wpPostTags.length > 0 ? wpPostTags : mockPost.tags, // 优先使用WordPress标签
        readTime: mockPost.readTime, // 使用mock数据的阅读时间
        featured_media: wpPost.featured_media || mockPost.featured_media, // 优先使用WordPress特色图片
        author: wpPost._embedded?.author?.[0]?.name || "Admin",
        categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || []
      };
    });
  } catch (error) {
    console.error('Error fetching posts with WordPress tags:', error);
    throw error;
  }
};

// 获取完整的文章数据（包括tags）
export const getPostsWithTags = async () => {
  try {
    // 获取文章列表
    const postsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=20`);
    const posts = await postsResponse.json();
    
    // 获取所有标签
    const tagsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/tags?per_page=100`);
    const tags = await tagsResponse.json();
    
    // 创建tag ID到tag对象的映射
    const tagMap = {};
    tags.forEach(tag => {
      tagMap[tag.id] = {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
        count: tag.count
      };
    });
    
    return posts.map(post => {
      const meta = post.meta || {};
      
      // 获取文章的标签
      const postTags = [];
      if (post._embedded && post._embedded['wp:term']) {
        post._embedded['wp:term'].forEach(termGroup => {
          termGroup.forEach(term => {
            if (term.taxonomy === 'post_tag' && tagMap[term.id]) {
              postTags.push(tagMap[term.id].name);
            }
          });
        });
      }
      
      return {
        id: post.id,
        title: post.title.rendered,
        subtitle: meta.post_subtitle || post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        date: post.date,
        modified: post.modified,
        slug: post.slug,
        tags: postTags,
        readTime: meta.post_read_time || "5 min read",
        featured_media: post.featured_media,
        author: post._embedded?.author?.[0]?.name || "Admin",
        categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || []
      };
    });
  } catch (error) {
    console.error('Error fetching posts with tags:', error);
    throw error;
  }
};

// 获取文章列表
export const getPosts = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=10`);
    const posts = await response.json();
    
    return posts.map(post => {
      const meta = post.meta || {};
      return {
        id: post.id,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        date: post.date,
        modified: post.modified,
        slug: post.slug,
        featured_media: post.featured_media,
        author: post._embedded?.author?.[0]?.name || 'Unknown',
        categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
        tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
        // 自定义字段
        subtitle: meta.post_subtitle || '',
        readTime: meta.post_read_time || '5 min read',
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// 获取评论页面配置
export const getCommentsPageConfig = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=comments&_embed`);
    const pages = await response.json();
    
    if (pages.length === 0) {
      throw new Error('Comments page not found');
    }
    
    const page = pages[0];
    const meta = page.meta || {};
    
    return {
      title: meta.comments_title || 'Comments',
      description: meta.comments_description || 'Join the discussion and share your thoughts.',
      giscus: {
        repo: meta.giscus_repo || '',
        repoId: meta.giscus_repo_id || '',
        category: meta.giscus_category || 'Announcements',
        categoryId: meta.giscus_category_id || '',
        mapping: meta.giscus_mapping || 'pathname',
        strict: meta.giscus_strict === '1',
        reactionsEnabled: meta.giscus_reactions_enabled === '1',
        emitMetadata: meta.giscus_emit_metadata === '1',
        inputPosition: meta.giscus_input_position || 'bottom',
        theme: meta.giscus_theme || 'preferred_color_scheme',
        lang: meta.giscus_lang || 'en',
        loading: meta.giscus_loading || 'lazy',
      }
    };
  } catch (error) {
    console.error('Error fetching comments page config:', error);
    throw error;
  }
};

// 获取联系页面配置
export const getContactPageConfig = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=contact&_embed`);
    const pages = await response.json();
    
    if (pages.length === 0) {
      throw new Error('Contact page not found');
    }
    
    const page = pages[0];
    const meta = page.meta || {};
    
    return {
      title: meta.contact_title || 'Contact',
      description: meta.contact_description || 'Get in touch with me.',
      contactInfo: {
        email: meta.contact_email || '',
        phone: meta.contact_phone || '',
        address: meta.contact_address || '',
      },
      socialMedia: {
        github: meta.social_github || '',
        linkedin: meta.social_linkedin || '',
        twitter: meta.social_twitter || '',
        instagram: meta.social_instagram || '',
      },
      footer: {
        text: meta.footer_text || '© 2024 All rights reserved.',
      }
    };
  } catch (error) {
    console.error('Error fetching contact page config:', error);
    throw error;
  }
};

// 获取单个文章详情
export const getPost = async (slug) => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
    const posts = await response.json();
    
    if (posts.length === 0) {
      throw new Error(`Post ${slug} not found`);
    }
    
    const post = posts[0];
    const meta = post.meta || {};
    
    return {
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      date: post.date,
      modified: post.modified,
      slug: post.slug,
      featured_media: post.featured_media,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      // 自定义字段
      subtitle: meta.post_subtitle || '',
      readTime: meta.post_read_time || '5 min read',
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// 获取分类文章
export const getPostsByCategory = async (categorySlug) => {
  try {
    // 首先获取分类ID
    const categoryResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=${categorySlug}`);
    const categories = await categoryResponse.json();
    
    if (categories.length === 0) {
      return [];
    }
    
    const categoryId = categories[0].id;
    
    // 获取该分类下的文章
    const postsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=10`);
    const posts = await postsResponse.json();
    
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      modified: post.modified,
      slug: post.slug,
      featured_media: post.featured_media,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
    }));
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw error;
  }
};

// 搜索文章
export const searchPosts = async (query) => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&_embed&per_page=10`);
    const posts = await response.json();
    
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      modified: post.modified,
      slug: post.slug,
      featured_media: post.featured_media,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
    }));
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// 从分类 description 字段获取 skills 数据
export const getSkillsFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    console.log(categories);
    const skillsCat = categories.find(cat => cat.name.toLowerCase() === 'skills');
    console.log('skillsCat', skillsCat);
    if (!skillsCat || !skillsCat.description) throw new Error('No skills category or description found');
    let skills = [];
    try {
      // description 可能带有 \r\n，先清理
      const jsonString = skillsCat.description.replace(/\r?\n/g, '');
      skills = eval('(' + jsonString + ')');
      console.log('skills', skills)
    } catch (e) {
      throw new Error('Failed to parse JSON from skills category: ' + e.message);
    }
    return skills;
  } catch (error) {
    console.error('Error fetching skills from category:', error);
    throw error;
  }
}

// 从分类 description 字段获取 projects 数据
export const getProjectsFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const projectsCat = categories.find(cat => cat.name.toLowerCase() === 'projects');
    console.log('projectsCat', projectsCat);
    if (!projectsCat || !projectsCat.description) throw new Error('No projects category or description found');
    let projects = [];
    try {
      // description 可能带有 \r\n，先清理
      const jsonString = projectsCat.description.replace(/\r?\n/g, '');
      console.log('jsonString', jsonString);
      projects = eval('(' + jsonString + ')');
      console.log('projects', projects);
      if (!Array.isArray(projects)) projects = [projects];
    } catch (e) {
      throw new Error('Failed to parse JSON from projects category: ' + e.message);
    }
    return projects;
  } catch (error) {
    console.error('Error fetching projects from category:', error);
    throw error;
  }
}

// 从分类描述字段获取社交媒体数据
export const getSocialMediaFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    
    // 查找 socials 分类
    const socialsCategory = categories.find(cat => cat.slug === 'socials');
    if (!socialsCategory) {
      throw new Error('Socials category not found');
    }
    
    const description = socialsCategory.description;
    if (!description) {
      throw new Error('No description found in socials category');
    }
    
    // 尝试提取和解析JSON
    const jsonMatch = description.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON array found in socials category description');
    }
    
    const jsonString = jsonMatch[0]
      .replace(/\\r\\n/g, '\n') // 替换换行符
      .replace(/\\/g, '') // 移除转义字符
      .replace(/'/g, '"') // 替换单引号为双引号
      .replace(/"/g, '"') // 替换中文引号
      .replace(/"/g, '"');
    
    let socialMedia = [];
    try {
      // 使用 eval 解析 JavaScript 对象格式（key 不需要双引号）
      // eslint-disable-next-line no-eval
      socialMedia = eval('(' + jsonString + ')');
      console.log('socialMedia', JSON.stringify(socialMedia, null,2));
      if (!Array.isArray(socialMedia)) {
        throw new Error('Parsed data is not an array');
      }
    } catch (e) {
      throw new Error('Failed to parse data from socials category: ' + e.message);
    }
    
    return socialMedia;
  } catch (error) {
    console.error('Error fetching social media from category:', error);
    throw error;
  }
};

// 从分类描述字段获取Hero数据
export const getHeroFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    
    // 查找 hero 分类
    const heroCategory = categories.find(cat => cat.slug === 'hero');
    if (!heroCategory) {
      throw new Error('Hero category not found');
    }
    
    const description = heroCategory.description;
    if (!description) {
      throw new Error('No description found in hero category');
    }
    
    // 尝试提取和解析JSON
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in hero category description');
    }
    
    const jsonString = jsonMatch[0]
      .replace(/\\r\\n/g, '\n') // 替换换行符
      .replace(/\\/g, '') // 移除转义字符
      .replace(/'/g, '"') // 替换单引号为双引号
      .replace(/"/g, '"') // 替换中文引号
      .replace(/"/g, '"');
    
    let heroData = {};
    try {
      // 使用 eval 解析 JavaScript 对象格式（key 不需要双引号）
      // eslint-disable-next-line no-eval
      heroData = eval('(' + jsonString + ')');
      
      if (typeof heroData !== 'object' || heroData === null) {
        throw new Error('Parsed data is not an object');
      }
    } catch (e) {
      throw new Error('Failed to parse data from hero category: ' + e.message);
    }
    
    return heroData;
  } catch (error) {
    console.error('Error fetching hero data from category:', error);
    throw error;
  }
};

// 获取aboutData（只需title和content字段）
export const getAboutFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const aboutCategory = categories.find(cat => cat.slug === 'about');
    if (!aboutCategory) throw new Error('About category not found');
    const description = aboutCategory.description;
    if (!description) throw new Error('No description found in about category');
    // 尝试提取和解析JSON
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in about category description');
    let aboutData = {};
    try {
      // 允许非严格JSON格式
      // eslint-disable-next-line no-eval
      aboutData = eval('(' + jsonMatch[0] + ')');
    } catch (e) {
      throw new Error('Failed to parse aboutData: ' + e.message);
    }
    // 只返回title和content字段
    return {
      title: aboutData.title || '',
      content: aboutData.content || ''
    };
  } catch (error) {
    console.error('Error fetching about data from category:', error);
    throw error;
  }
};

// 获取footer配置（从footer分类description读取JSON）
export const getFooterFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const footerCategory = categories.find(cat => cat.slug === 'footer');
    if (!footerCategory) throw new Error('Footer category not found');
    const description = footerCategory.description;
    if (!description) throw new Error('No description found in footer category');
    // 尝试提取和解析JSON
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in footer category description');
    let footerData = {};
    try {
      // 允许非严格JSON格式
      // eslint-disable-next-line no-eval
      footerData = eval('(' + jsonMatch[0] + ')');
    } catch (e) {
      throw new Error('Failed to parse footerData: ' + e.message);
    }
    return footerData;
  } catch (error) {
    console.error('Error fetching footer data from category:', error);
    throw error;
  }
};

// 获取posts页面主标题和副标题（从posts分类description读取JSON）
export const getPostsPageMetaFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const postsCategory = categories.find(cat => cat.slug === 'posts');
    if (!postsCategory) throw new Error('Posts category not found');
    const description = postsCategory.description;
    if (!description) throw new Error('No description found in posts category');
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in posts category description');
    let meta = {};
    try {
      // eslint-disable-next-line no-eval
      meta = eval('(' + jsonMatch[0] + ')');
    } catch (e) {
      throw new Error('Failed to parse posts page meta: ' + e.message);
    }
    return meta;
  } catch (error) {
    console.error('Error fetching posts page meta from category:', error);
    throw error;
  }
};

// 获取comments页面主标题、副标题、准则列表（从comments分类description读取JSON）
export const getCommentsPageMetaFromCategory = async () => {
  console.log('getCommentsPageMetaFromCategory');
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const commentsCategory = categories.find(cat => cat.slug === 'comments');
    if (!commentsCategory) throw new Error('Comments category not found');
    const description = commentsCategory.description;
    if (!description) throw new Error('No description found in comments category');
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in comments category description');
    let meta = {};
    try {
      // eslint-disable-next-line no-eval
      meta = eval('(' + jsonMatch[0] + ')');
    } catch (e) {
      throw new Error('Failed to parse comments page meta: ' + e.message);
    }
    return meta;
  } catch (error) {
    console.error('Error fetching comments page meta from category:', error);
    throw error;
  }
};

// 从分类 description 字段获取 comments 页面数据
export const getCommentsFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const commentsCat = categories.find(cat => cat.slug === 'comments');
    if (!commentsCat || !commentsCat.description) throw new Error('No comments category or description found');
    let commentsData = {};
    try {
      commentsData = JSON.parse(commentsCat.description);
    } catch (e) {
      // 兼容没有双引号的情况
      commentsData = eval('(' + commentsCat.description + ')');
    }
    return commentsData;
  } catch (error) {
    console.error('Error fetching comments from category:', error);
    throw error;
  }
}

// 获取contact页面配置（从contact分类description读取JSON）
export const getContactFromCategory = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`);
    const categories = await response.json();
    const contactCategory = categories.find(cat => cat.slug === 'contact');
    if (!contactCategory) throw new Error('Contact category not found');
    const description = contactCategory.description;
    if (!description) throw new Error('No description found in contact category');
    const jsonMatch = description.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in contact category description');
    let contactData = {};
    try {
      // eslint-disable-next-line no-eval
      contactData = eval('(' + jsonMatch[0] + ')');
    } catch (e) {
      throw new Error('Failed to parse contact data: ' + e.message);
    }
    return contactData;
  } catch (error) {
    console.error('Error fetching contact data from category:', error);
    throw error;
  }
}; 