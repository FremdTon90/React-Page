import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
`;

const neonPulse = keyframes`
  0%, 100% {
    text-shadow:
      0 0 5px #4ea1d3,
      0 0 10px #4ea1d3,
      0 0 20px #4ea1d3,
      0 0 40px #4ea1d3;
  }
  50% {
    text-shadow:
      0 0 10px #6dd5fa,
      0 0 20px #6dd5fa,
      0 0 30px #6dd5fa,
      0 0 50px #6dd5fa;
  }
`;

const menuReveal = keyframes`
  0% {
    opacity: 0;
    transform: perspective(800px) rotateY(-30deg) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: perspective(800px) rotateY(0deg) scale(1);
  }
`;

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
`;

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
    /* kein Leuchten standardmäßig */
    box-shadow: none;
    transition: 
      transform 0.75s ease,
      box-shadow 0.5s ease,
      background-color 0.5s ease;
    transform-origin: center;
    will-change: transform;
    backface-visibility: hidden;
  }

  ${props =>
    props.open &&
    css`
      span {
        box-shadow: 0 0 8px #39ff14, 0 0 15px #39ff14, 0 0 20px #bfff00;
        background: #39ff14; /* grün, wenn offen */
      }

      span:nth-child(1) {
        transform: rotate(30deg) translate(3px, 3px);
      }
      span:nth-child(2) {
        transform: translateX(-11px) translateY(2px) rotate(90deg);
      }
      span:nth-child(3) {
        transform: rotate(-30deg) translate(1px, 0);
      }
    `}
`;


const Overlay = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.open ? '1' : '0')};
  pointer-events: ${props => (props.open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1050;
`;

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
  justify-content: center;
  padding: 2rem 1.5rem;
  z-index: 1100;

  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  pointer-events: ${props => (props.open ? 'auto' : 'none')};

  ${props =>
    props.open &&
    css`
      animation: ${menuReveal} 0.5s ease forwards;
    `}
`;

const HoverBox = styled.div`
  margin-bottom: 1.5rem;
  perspective: 600px;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    transition: 
      color 0.4s ease, 
      box-shadow 0.3s ease, 
      border-radius 0.3s ease;
    will-change: transform;
    transform-origin: center;
    position: relative;
    width: 240px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
    border-radius: 6px;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 3px;
      bottom: -6px;
      left: 0;
      background: linear-gradient(90deg, #39ff14, #bfff00, #39ff14);
      transition: width 0.75s ease, opacity 0.75s ease;
      opacity: 0;
      border-radius: 3px;
    }
  }

  &:hover a {
    animation: ${neonPulse} 1.5s infinite alternate;
    color: #6dd5fa;
    box-shadow:
      0 0 8px 3px rgba(78, 161, 211, 0.8),
      0 0 20px 10px rgba(78, 161, 211, 0.4);
    border-radius: 6px;
  }

  &:hover a::after {
    width: 100%;
    opacity: 1;
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #222222;
  border: none;
  border-radius: 6px;
  padding: 12px 16px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 8px 20px #000000;
  z-index: 1200;

  opacity: 0;
  visibility: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  pointer-events: auto;

  &.visible {
    animation: ${fadeSlideUp} 0.4s forwards;
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background-color: #444444;
    color: white;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
    transform: translateY(-2px);
    transition: all 0.25s ease;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const linkRefs = useRef([]);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e, index) => {
    const link = linkRefs.current[index];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    if (link) {
      link.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(3px)`;
      link.style.transition = 'transform 0.1s ease';
    }
  };

  const resetTransform = index => {
    const link = linkRefs.current[index];
    if (link) {
      link.style.transform = '';
      link.style.transition = 'transform 0.3s ease';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Coding', to: '/coding' },
    { label: 'Project Lyn-X', to: '/projects' },
    { label: 'Music', to: '/music' },
    { label: 'About me', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ];

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
        {menuItems.map((item, index) => (
          <HoverBox
            key={item.to}
            onMouseMove={e => handleMouseMove(e, index)}
            onMouseLeave={() => resetTransform(index)}
          >
            <Link
              to={item.to}
              onClick={closeMenu}
              ref={el => (linkRefs.current[index] = el)}
            >
              {item.label}
            </Link>
          </HoverBox>
        ))}
      </Menu>

      {showButton && (
        <ScrollTopButton onClick={scrollToTop} className="visible" aria-label="Scroll to top">
          ↑
        </ScrollTopButton>
      )}
    </>
  );
}
