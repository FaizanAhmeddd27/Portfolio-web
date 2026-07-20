import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

interface SkillItem {
  name: string;
  url: string;
}

interface MenuItemData {
  link: string;
  text: string;
  items: SkillItem[];
}

const FlowingMenu: React.FC<{ items: MenuItemData[], speed?: number, marqueeBgColor?: string }> = ({
  items, speed = 10, marqueeBgColor = "#000"
}) => {
  return (
    <nav className="menu">
      {items.map((item, idx) => (
        <MenuItem key={idx} {...item} speed={speed} marqueeBgColor={marqueeBgColor} isFirst={idx === 0} />
      ))}
    </nav>
  );
};

const MenuItem: React.FC<MenuItemData & { speed: number; marqueeBgColor: string; isFirst: boolean }> = ({
  link, text, items, speed, marqueeBgColor, isFirst
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const [repetitions, setRepetitions] = useState(2);
  
  // Local state: Only affects THIS specific menu item
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculate = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (part) {
        setRepetitions(Math.ceil(window.innerWidth / part.offsetWidth) + 2);
      }
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [items]);

  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
    if (!part) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeInnerRef.current, {
        x: -(part.offsetWidth), 
        duration: (part.offsetWidth / 200) * speed,
        ease: 'none',
        repeat: -1
      });
    }, marqueeInnerRef);

    return () => ctx.revert();
  }, [items, repetitions, speed]);

  // 1. Handle clicking the TEXT (Opens the menu)
  const handleTextClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsOpen(!isOpen); 
  };

  // 2. Handle clicking the MARQUEE (Closes the menu)
  const handleMarqueeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    setIsOpen(false);
  };

  return (
    <div 
      className={`menu__item ${isOpen ? 'is-open' : ''}`} 
      ref={itemRef} 
      style={{ borderTop: isFirst ? 'none' : '1px solid black' }}
    >
      <a 
        className="menu__item-link" 
        href={link}
        onClick={handleTextClick}
      >
        {/* Main Text */}
        <span className="menu__item-text">{text}</span>
        
        {/* 45 Degree Arrow Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="menu__item-arrow"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
      
      {/* The scrolling banner */}
      <div 
        className="marquee" 
        style={{ backgroundColor: marqueeBgColor }}
        onClick={handleMarqueeClick} 
      >
        <div className="marquee__inner" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, i) => (
            <div className="marquee__part" key={i}>
              {items.map((skill, idx) => (
                <div key={idx} className="marquee__icon-box">
                  <img src={skill.url} alt={skill.name} className="marquee__icon" />
                  <span className="marquee__text">{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;