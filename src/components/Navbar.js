import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(17, 17, 17, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  z-index: 1100;
`

const Burger = styled.div`
  width: 30px;
  height: 22px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  ${({ open }) =>
    open &&
    css`
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `}
`

const Overlay = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1050;
`

const Menu = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100% - 60px);
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(15px);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  transition: transform 0.3s ease;
  z-index: 1100;

  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    margin-bottom: 1.5rem;
    position: relative;
    transition: color 0.3s ease, transform 0.2s ease;

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
      transform: scale(1.05);
    }

    &:hover::after {
      width: 100%;
    }
  }
`

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #4ea1d3;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: background-color 0.3s ease;
  z-index: 1200;

  &:hover {
    background-color: #3a85c7;
  }
`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const closeMenu = () => setOpen(false)

  // Scroll Event, um den Button nur ab 100px zu zeigen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Nav>
        <Burger
          open={open}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </Burger>
      </Nav>

      <Overlay open={open} onClick={closeMenu} />

      <Menu open={open}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/coding" onClick={closeMenu}>
          Coding
        </Link>
        <Link to="/projects" onClick={closeMenu}>
          Project Lyn-X
        </Link>
        <Link to="/music" onClick={closeMenu}>
          Music
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About me
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
      </Menu>

      {showButton && (
        <ScrollTopButton onClick={scrollToTop} aria-label="Scroll to top">
          ↑
        </ScrollTopButton>
      )}
    </>
  )
}
