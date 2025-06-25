/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "@reach/router"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const location = useLocation()

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
          paddingTop: `calc(var(--size-gutter) + 60px)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
            padding: '0.5rem 0',
            color: '#000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            © 2025 Your Name. All rights reserved. •{' '}
            <a href="/privacy" style={{ color: '#000', textDecoration: 'none' }}>Privacy</a>
            {' '}• Built with{' '}
            <a href="https://www.gatsbyjs.com" style={{ color: '#000' }}>Gatsby</a> +{' '}
            <a href="https://wordpress.org" style={{ color: '#000' }}>Wordpress</a>
          </div>
          <a 
            href="https://github.com/tomcomtang/portfolio-blog" 
            style={{ 
              color: '#000', 
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: '1px solid #000',
              paddingBottom: '1px',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Star this project on Github
          </a>
        </footer>
      </div>
    </>
  )
}

export default Layout
