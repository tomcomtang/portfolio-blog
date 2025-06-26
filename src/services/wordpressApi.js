// WordPress API 服务
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL

// 检查是否配置了 WordPress URL
export const isWordPressConfigured = () => {
  return !!WORDPRESS_URL && WORDPRESS_URL !== 'https://your-wordpress-site.com';
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
export const getProjects = async () => {
  try {
    // 尝试获取自定义文章类型 'project'
    let response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/project?_embed`);
    let projects = await response.json();
    
    // 如果没有自定义文章类型，尝试从普通文章中获取
    if (!projects.length || projects[0].code === 'rest_no_route') {
      response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?categories=projects&_embed`);
      projects = await response.json();
    }
    
    return projects.map(project => {
      const meta = project.meta || {};
      return {
        id: project.id,
        title: project.title.rendered,
        description: project.excerpt.rendered,
        image: meta.project_image || project.featured_media || '',
        link: meta.project_link || '',
        github: meta.project_github || '',
        technologies: meta.project_technologies ? meta.project_technologies.split(',') : [],
        featured: meta.project_featured === '1',
        date: project.date,
        slug: project.slug,
      };
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
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