import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(17, 17, 17, 0.85);
  backdrop-filter: blur(10px);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    position: relative; /* für underline */
    transition: color 0.3s, transform 0.2s;

    /* Unterstreichung vorbereiten */
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #4ea1d3;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #4ea1d3;
      transform: scale(1.1);
    }

    &:hover::after {
      width: 100%;
    }
  }
`

export default function Navbar() {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/coding">Coding</Link>
      <Link to="/projects">Project Lyn-X</Link>
      <Link to="/music">Music</Link>
      <Link to="/about">About me</Link>
      <Link to="/contact">Contact</Link>
    </Nav>
  )
}
