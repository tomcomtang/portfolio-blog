/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

// WordPress API 配置
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL || 'https://tomchild5.wordpress.com'

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

// 解码HTML实体
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
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

// 文章数据（作为 fallback）
const postDetails = {
  "getting-started-with-gatsby": {
    id: 1,
    title: "Getting Started with Gatsby",
    subtitle: "A comprehensive guide to building fast websites with Gatsby",
    author: "Tom Tang",
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
      
      <h2>Project Structure</h2>
      <p>A typical Gatsby project has the following structure:</p>
      <ul>
        <li><code>src/pages/</code> - React components that become pages</li>
        <li><code>src/components/</code> - Reusable React components</li>
        <li><code>src/templates/</code> - Page templates for dynamic content</li>
        <li><code>gatsby-config.js</code> - Site configuration</li>
        <li><code>gatsby-node.js</code> - Node.js APIs for customizing build process</li>
      </ul>
      
      <h2>Data Layer</h2>
      <p>Gatsby uses GraphQL as its data layer, allowing you to query data from various sources:</p>
      <ul>
        <li>Markdown files</li>
        <li>CMS systems (WordPress, Contentful, etc.)</li>
        <li>APIs</li>
        <li>Databases</li>
      </ul>
      
      <h2>Deployment</h2>
      <p>Gatsby sites can be deployed to various platforms:</p>
      <ul>
        <li><strong>Netlify:</strong> Drag and drop deployment</li>
        <li><strong>Vercel:</strong> Git-based deployment</li>
        <li><strong>GitHub Pages:</strong> Free hosting for open source projects</li>
        <li><strong>AWS S3:</strong> Scalable cloud hosting</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Gatsby is an excellent choice for building modern, performant websites. Its static site generation capabilities combined with React's component-based architecture make it a powerful tool for developers.</p>
      
      <p>In the next article, we'll dive deeper into Gatsby's data layer and learn how to work with GraphQL queries.</p>
    `
  },
  "advanced-css-techniques": {
    id: 2,
    title: "Advanced CSS Techniques",
    subtitle: "Master modern CSS with Flexbox, Grid, and Custom Properties",
    author: "Tom Tang",
    authorAvatar: "https://avatars.githubusercontent.com/u/20943608?v=4",
    tags: ["CSS", "Frontend", "Design"],
    readTime: "12 min read",
    date: "2025-01-15",
    excerpt: "Explore advanced CSS techniques including Flexbox, CSS Grid, and CSS Custom Properties to create modern, responsive layouts.",
    content: `
      <h2>Modern CSS Landscape</h2>
      <p>CSS has evolved significantly over the years, introducing powerful layout systems and features that make web development more efficient and flexible.</p>
      
      <h2>CSS Flexbox</h2>
      <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. It's perfect for:</p>
      <ul>
        <li>Navigation menus</li>
        <li>Card layouts</li>
        <li>Form layouts</li>
        <li>Centering content</li>
      </ul>
      
      <h3>Basic Flexbox Example</h3>
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}</code></pre>
      
      <h2>CSS Grid</h2>
      <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.</p>
      
      <h3>Grid Layout Example</h3>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}</code></pre>
      
      <h2>CSS Custom Properties</h2>
      <p>CSS Custom Properties (CSS Variables) allow you to store and reuse values throughout your stylesheet.</p>
      
      <h3>Using CSS Variables</h3>
      <pre><code>:root {
  --primary-color: #76cfc5;
  --secondary-color: #ffb400;
  --text-color: #333;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: var(--spacing-unit);
}</code></pre>
      
      <h2>Responsive Design</h2>
      <p>Modern CSS makes responsive design easier than ever with media queries and flexible units.</p>
      
      <h3>Responsive Breakpoints</h3>
      <pre><code>/* Mobile first approach */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
  }
}</code></pre>
      
      <h2>CSS Animations</h2>
      <p>CSS animations and transitions can enhance user experience and make interfaces more engaging.</p>
      
      <h3>Simple Animation Example</h3>
      <pre><code>.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}</code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use semantic HTML as the foundation</li>
        <li>Follow a mobile-first approach</li>
        <li>Keep CSS organized and maintainable</li>
        <li>Use CSS Custom Properties for consistency</li>
        <li>Test across different browsers and devices</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Modern CSS provides powerful tools for creating beautiful, responsive, and maintainable websites. By mastering Flexbox, Grid, and Custom Properties, you can build layouts that were once impossible or extremely difficult to achieve.</p>
    `
  }
}

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
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
      featuredImage: post.jetpack_featured_media_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      // 计算阅读时间（基于内容长度）
      readTime: Math.ceil((post.content?.rendered?.length || 0) / 1000) + ' min read',
    });
  });
  
  // 创建 WordPress 分类节点
  categories.forEach((category) => {
    const nodeId = createNodeId(`wordpress-category-${category.id}`);
    
    // fallbackData for comments category
    const isComments = category.slug === 'comments';
    const fallbackData = {
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
    let parsedData = parseCategoryData(category.description);
    let description = category.description;
    if (isComments) {
      // 如果 description 不是有效 JSON 或没有 rules 字段，则兜底 fallbackData
      if (!parsedData || !Array.isArray(parsedData.rules)) {
        parsedData = fallbackData;
      }
      // 如果 description 为空，则兜底副标题
      if (!description || !description.trim()) {
        description = "Share your thoughts, questions, or suggestions here. Let's connect and discuss!";
      }
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
    Object.keys(postDetails).forEach(slug => {
      createPage({
        path: `/post/${slug}`,
        component: require.resolve("./src/pages/post/[slug].js"),
        context: {
          slug: slug,
          post: postDetails[slug]
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
