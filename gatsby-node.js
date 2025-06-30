/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

// 文章数据
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
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  
  // 为每篇文章创建页面
  Object.keys(postDetails).forEach(slug => {
    createPage({
      path: `/post/${slug}`,
      component: require.resolve("./src/pages/post/[slug].js"),
      context: {
        slug: slug,
        post: postDetails[slug]
      },
    })
  })

  // 保留原有的DSG页面
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
