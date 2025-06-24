import * as React from "react"
import { Link } from "gatsby"

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 2rem',
}
const menuStyle = {
  display: 'flex',
  gap: '2rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}
const siteNameStyle = {
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '0.05em',
  color: '#ec6664',
  textDecoration: 'none',
}
const menuLinkStyle = {
  fontWeight: 700,
  color: '#d48a88',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.2s, transform 0.2s',
  display: 'inline-block',
}
const activeMenuLinkStyle = {
  ...menuLinkStyle,
  color: '#ec6664',
}

const Header = ({ siteTitle }) => (
  <nav style={navStyle}>
    <Link to="/" style={siteNameStyle} onMouseOver={handleSiteNameMouseOver} onMouseOut={handleSiteNameMouseOut}>
      {siteTitle || 'My Portfolio Blog'}
    </Link>
    <ul style={menuStyle}>
      <li>
        <Link to="/" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >Home</Link>
      </li>
      <li>
        <Link to="/posts" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >Posts</Link>
      </li>
      <li>
        <Link to="/contact" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >Contact</Link>
      </li>
    </ul>
  </nav>
)

function handleMouseOver(e) {
  e.target.style.color = '#ec6664';
  e.target.style.transform = 'scale(1.08)';
}
function handleMouseOut(e) {
  if (e.target.getAttribute('aria-current') !== 'page') {
    e.target.style.color = '#d48a88';
  }
  e.target.style.transform = 'scale(1)';
}

function handleSiteNameMouseOver(e) {
  e.target.style.color = '#ffb400';
  e.target.style.transform = 'scale(1.08)';
}
function handleSiteNameMouseOut(e) {
  e.target.style.color = '#ec6664';
  e.target.style.transform = 'scale(1)';
}

export default Header
