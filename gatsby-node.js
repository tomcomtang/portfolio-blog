/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

// WordPress API 配置
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL || 'https://tomchild5.wordpress.com'

// 导入统一的兜底数据
const {
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
} = require('./src/data/fallbackData');

// WordPress API 数据获取函数
const fetchWordPressData = async () => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    
    // 并行获取所有数据
    const [
      postsResponse,
      categoriesResponse,
      pagesResponse
    ] = await Promise.all([
      fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/posts?_embed&per_page=100`),
      fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/categories`),
      fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/pages?_embed&per_page=50`)
    ]);

    const posts = await postsResponse.json();
    const categories = await categoriesResponse.json();
    const pages = await pagesResponse.json();

    return {
      posts,
      categories,
      pages,
      siteName
    };
  } catch (error) {
    console.error('Error fetching WordPress data:', error);
    return null;
  }
};

// 解析分类描述中的 JSON 数据
const parseCategoryData = (description) => {
  if (!description) return null;
  try {
    // 直接用 eval 解析 description，兼容对象和数组
    return eval('(' + description + ')');
  } catch (e) {
    console.log('Error parsing category data with eval:', e.message);
    console.log('Description:', description.substring(0, 100));
    return null;
  }
};
// 简单的HTML解码函数（不依赖DOM）
const decodeHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&#8242;/g, "'")
    .replace(/&#8243;/g, '"')
    .replace(/&#8482;/g, '™')
    .replace(/&#169;/g, '©')
    .replace(/&#174;/g, '®')
    .replace(/&#215;/g, '×')
    .replace(/&#247;/g, '÷')
    .replace(/&#176;/g, '°')
    .replace(/&#177;/g, '±')
    .replace(/&#181;/g, 'µ')
    .replace(/&#183;/g, '·')
    .replace(/&#187;/g, '»')
    .replace(/&#171;/g, '«')
    .replace(/&#150;/g, '–')
    .replace(/&#151;/g, '—')
    .replace(/&#133;/g, '…');
};

/**
 * @type {import('gatsby').GatsbyNode['sourceNodes']}
 */
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  console.log('🔄 Fetching WordPress data...');
  
  // 获取 WordPress 数据
  const wpData = await fetchWordPressData();
  
  if (!wpData) {
    console.log('⚠️  WordPress data fetch failed, using fallback data');
    return;
  }
  
  const { posts, categories, pages, siteName } = wpData;
  
  console.log(`✅ Fetched ${posts.length} posts, ${categories.length} categories, ${pages.length} pages`);
  
  // 创建 WordPress 文章节点
  posts.forEach((post, index) => {
    const nodeId = createNodeId(`wordpress-post-${post.id}`);
    
    createNode({
      id: nodeId,
      internal: {
        type: 'WordPressPost',
        contentDigest: createContentDigest(post),
      },
      // 文章数据
      wordpressId: post.id,
      title: decodeHtml(post.title?.rendered || ''),
      content: post.content?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      author: defaultAuthor,
      authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || defaultAuthorAvatar,
      featuredImage: post.jetpack_featured_media_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      // 计算阅读时间（基于内容长度）
      readTime: Math.ceil((post.content?.rendered?.length || 0) / 1000) + ' min read',
    });
  });
  
  // 创建 WordPress 分类节点
  console.log('📋 Processing categories:');
  categories.forEach((category) => {
    console.log(`  - ${category.name} (${category.slug})`);
  });
  
  categories.forEach((category) => {
    const nodeId = createNodeId(`wordpress-category-${category.id}`);
    
    // 根据分类 slug 确定对应的兜底数据
    const isHero = category.slug === 'hero';
    const isContact = category.slug === 'contact';
    const isSocials = category.slug === 'socials';
    const isComments = category.slug === 'comments';
    const isPosts = category.slug === 'posts';
    const isAbout = category.slug === 'about';
    const isFooter = category.slug === 'footer';
    const isSkills = category.slug === 'skills';
    const isProjects = category.slug === 'projects';
    
    let parsedData = parseCategoryData(category.description);
    let description = category.description;
    
    // 为每个分类设置兜底数据
    if (isHero && (!parsedData || !parsedData.basic || !parsedData.basic.title)) {
      console.log('🔍 Hero category found, but data is missing or invalid:');
      console.log('  - Category name:', category.name);
      console.log('  - Category slug:', category.slug);
      console.log('  - Raw description:', category.description);
      console.log('  - Parsed data:', parsedData);
      console.log('  - Using fallback data:', fallbackHero);
      parsedData = fallbackHero;
    }
    if (isContact && (!parsedData || !parsedData.title)) {
      parsedData = fallbackContact;
    }
    if (isSocials && (!parsedData || !parsedData.socials)) {
      parsedData = fallbackSocials;
    }
    if (isComments) {
      if (!parsedData || !Array.isArray(parsedData.rules)) {
        parsedData = fallbackComments;
      }
      if (!description || !description.trim()) {
        description = fallbackComments.description;
      }
    }
    if (isPosts && (!parsedData || !parsedData.title)) {
      parsedData = fallbackPostsMeta;
    }
    if (isAbout && (!parsedData || !parsedData.title)) {
      parsedData = fallbackAbout;
    }
    if (isFooter && (!parsedData || !parsedData.text)) {
      parsedData = fallbackFooter;
    }
    if (isSkills && (!parsedData || !Array.isArray(parsedData))) {
      parsedData = fallbackSkills;
    }
    if (isProjects && (!parsedData || !Array.isArray(parsedData))) {
      parsedData = fallbackProjects;
    }
    
    createNode({
      id: nodeId,
      internal: {
        type: 'WordPressCategory',
        contentDigest: createContentDigest(category),
      },
      // 分类数据
      wordpressId: category.id,
      name: category.name,
      slug: category.slug,
      description: description,
      count: category.count,
      // 解析分类描述中的 JSON 数据
      parsedData: parsedData,
    });
  });
  
  // 创建 WordPress 页面节点
  pages.forEach((page) => {
    const nodeId = createNodeId(`wordpress-page-${page.id}`);
    
    createNode({
      id: nodeId,
      internal: {
        type: 'WordPressPage',
        contentDigest: createContentDigest(page),
      },
      // 页面数据
      wordpressId: page.id,
      title: page.title?.rendered || '',
      content: page.content?.rendered || '',
      excerpt: page.excerpt?.rendered || '',
      slug: page.slug,
      date: page.date,
      modified: page.modified,
      featuredImage: page.jetpack_featured_media_url || page._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    });
  });
  
  // 创建站点配置节点
  const siteConfigNodeId = createNodeId('wordpress-site-config');
  createNode({
    id: siteConfigNodeId,
    internal: {
      type: 'WordPressSiteConfig',
      contentDigest: createContentDigest(siteName),
    },
    siteName,
    wordpressUrl: WORDPRESS_URL,
  });
  
  console.log('✅ WordPress data nodes created successfully');
};

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  
  console.log('🔄 Creating pages from WordPress data...');
  
  // 查询 WordPress 文章数据
  const result = await graphql(`
    query {
      allWordPressPost {
        nodes {
          wordpressId
          title
          slug
          excerpt
          content
          date
          author
          authorAvatar
          featuredImage
          categories
          tags
          readTime
        }
      }
    }
  `);
  
  if (result.errors) {
    console.error('GraphQL query error:', result.errors);
    // 如果查询失败，使用 fallback 数据
    fallbackPosts.forEach(post => {
      createPage({
        path: `/post/${post.slug}`,
        component: require.resolve("./src/pages/post/[slug].js"),
        context: {
          slug: post.slug,
          post: post
        },
      });
    });
    return;
  }
  
  const posts = result.data.allWordPressPost.nodes;
  
  // 为每篇 WordPress 文章创建页面
  posts.forEach(post => {
    createPage({
      path: `/post/${post.slug}`,
      component: require.resolve("./src/pages/post/[slug].js"),
      context: {
        slug: post.slug,
        post: {
          id: post.wordpressId,
          title: post.title,
          subtitle: post.title, // 可以后续从 WordPress 自定义字段获取
          author: post.author,
          authorAvatar: post.authorAvatar,
          tags: post.tags,
          readTime: post.readTime,
          date: post.date,
          excerpt: post.excerpt,
          content: post.content,
        }
      },
    });
  });
  
  console.log(`✅ Created ${posts.length} post pages`);
  
  // 保留原有的DSG页面
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type WordPressPost implements Node {
      wordpressId: Int!
      title: String!
      content: String!
      excerpt: String!
      slug: String!
      date: Date! @dateformat
      modified: Date! @dateformat
      author: String!
      authorAvatar: String
      featuredImage: String
      categories: [String!]!
      tags: [String!]!
      readTime: String!
    }
    
    type WordPressCategory implements Node {
      wordpressId: Int!
      name: String!
      slug: String!
      description: String!
      count: Int!
      parsedData: JSON
    }
    
    type WordPressPage implements Node {
      wordpressId: Int!
      title: String!
      content: String!
      excerpt: String!
      slug: String!
      date: Date! @dateformat
      modified: Date! @dateformat
      featuredImage: String
    }
    
    type WordPressSiteConfig implements Node {
      siteName: String!
      wordpressUrl: String!
    }
  `;
  
  createTypes(typeDefs);
};
