# Portfolio Blog - Gatsby + WordPress

A modern portfolio blog built with Gatsby, featuring static site generation (SSG) with WordPress data integration. This project demonstrates how to build a fast, SEO-friendly blog that fetches content from WordPress at build time, not runtime.

## 🎯 Project Purpose

This project serves as a **portfolio blog template** that combines the best of both worlds:

- **Gatsby's performance**: Static site generation for blazing-fast loading
- **WordPress's content management**: Easy content updates through WordPress admin
- **SEO optimization**: Pre-rendered pages with proper meta tags
- **Modern UI**: Responsive design with smooth animations

Perfect for developers, designers, and content creators who want a fast, maintainable blog with easy content management.

## 🚀 Quick Deploy

### Deploy to EdgeOne

[![Deploy to EdgeOne](https://img.shields.io/badge/Deploy%20to-EdgeOne-blue?style=for-the-badge&logo=cloudflare)](https://edgeone.ai/pages/new?template=https://github.com/tomcomtang/portfolio-blog&output-directory=./public&build-command=npm%20run%20build&install-command=npm%20install)

### Manual Deployment

```bash
# Clone the repository
git clone https://github.com/tomcomtang/portfolio-blog.git
cd portfolio-blog

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Build and deploy
npm run build
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Gatsby 4 (React-based static site generator)
- **Content Management**: WordPress REST API
- **Styling**: CSS Modules with custom styles
- **Comments**: Giscus (GitHub Discussions integration)
- **Deployment**: EdgeOne, Netlify, or any static hosting

### Data Flow

```
WordPress API → Gatsby Build Time → Static HTML/CSS/JS → CDN
```

1. **Build Time Data Fetching**: Gatsby fetches all WordPress data during build
2. **Static Generation**: Creates pre-rendered HTML pages
3. **No Runtime API Calls**: All content is embedded in the static files
4. **Fast Loading**: Pages load instantly from CDN

### Project Structure

```
src/
├── components/          # React components
│   ├── HeroSection.js   # Homepage hero section
│   ├── AboutMe.js       # About section
│   ├── header.js        # Navigation header
│   └── layout.js        # Main layout wrapper
├── data/
│   └── fallbackData.js  # Fallback data when WP is unavailable
├── pages/               # Page components
│   ├── index.js         # Homepage
│   ├── posts.js         # Blog posts list
│   ├── post/[slug].js   # Individual post pages
│   ├── comments.js      # Comments page
│   └── contact.js       # Contact page
├── services/
│   └── wordpressApi.js  # WordPress API utilities
└── styles/              # CSS modules and styles
```

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```bash
# WordPress Configuration
GATSBY_WORDPRESS_URL=https://your-wordpress-site.wordpress.com

# Giscus Comments Configuration
GATSBY_GISCUS_REPO=your-username/your-repo-name
GATSBY_GISCUS_REPO_ID=your-repo-id
GATSBY_GISCUS_CATEGORY=Announcements
GATSBY_GISCUS_CATEGORY_ID=your-category-id
```

### WordPress URL Configuration

- Set `GATSBY_WORDPRESS_URL` to your WordPress.com site URL
- If not set, the site will use fallback data from `src/data/fallbackData.js`
- Format: `https://your-site.wordpress.com`

### Giscus Configuration

1. Go to [Giscus](https://giscus.app/)
2. Configure with your GitHub repository
3. Copy the configuration values to your `.env` file
4. The comments will appear on blog posts automatically

## 📝 WordPress Data Structure

To configure your WordPress site for this template, you need to create categories with specific data structures in their descriptions. Reference `src/data/fallbackData.js` for the exact format.

### Required WordPress Categories

#### 1. Hero Category (slug: "hero")

```json
{
  "basic": {
    "name": "Your Name",
    "title": "Welcome Message",
    "description": "Your introduction text",
    "avatar": "https://your-avatar-url.com"
  },
  "buttons": [
    {
      "text": "View Posts",
      "link": "/posts",
      "type": "primary"
    },
    {
      "text": "Contact Me",
      "link": "/contact",
      "type": "secondary"
    }
  ]
}
```

#### 2. Socials Category (slug: "socials")

```json
{
  "socials": [
    {
      "name": "twitter",
      "val": "https://twitter.com/your-handle",
      "svg": "twitter.svg",
      "type": "social"
    },
    {
      "name": "email",
      "val": "mailto:your@email.com",
      "svg": "email.svg",
      "address": "your@email.com",
      "type": "contact"
    }
  ]
}
```

#### 3. Contact Category (slug: "contact")

```json
{
  "title": "Contact Me",
  "description": "Get in touch with me",
  "email": "your@email.com",
  "phone": "+1234567890",
  "address": "Your Address",
  "bottom_info": {
    "response_time": "I typically respond within 24 hours",
    "closing_message": "Looking forward to hearing from you!"
  }
}
```

### How to Set Up WordPress Categories

1. Go to WordPress Admin → Posts → Categories
2. Create categories with the exact slugs mentioned above
3. In the category description field, paste the JSON data
4. Make sure the JSON is valid (no trailing commas, proper quotes)
5. Save the category

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean cache
npm run clean
```

## 🔧 Customization

### Styling

- All styles are in `src/styles/` directory
- Use CSS Modules for component-specific styles
- Global styles in `src/components/layout.css`

### Content

- Edit `src/data/fallbackData.js` for local content
- Configure WordPress categories for dynamic content
- Update `gatsby-config.js` for site metadata

## 📚 Documentation

- [WordPress Setup Guide](docs/wordpress-setup-guide.md)
- [Data Structure Reference](docs/wordpress-data-structure.md)
- [Deployment Guide](docs/deployment-guide.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues:

1. Check the [WordPress Setup Guide](docs/wordpress-setup-guide.md)
2. Verify your environment variables are set correctly
3. Ensure your WordPress categories have valid JSON in descriptions
4. Open an issue with detailed error information

---

**Note**: This project uses static site generation for optimal performance. Content updates require a rebuild and redeploy.
