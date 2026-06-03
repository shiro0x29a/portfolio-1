'use client'

import { useEffect, useRef } from 'react';
import './custom-cursor.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf: number;

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const addHover = () => {
      cursor?.classList.add('hover');
      ring?.classList.add('hover');
    };
    const removeHover = () => {
      cursor?.classList.remove('hover');
      ring?.classList.remove('hover');
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const attachHovers = () => {
      document.querySelectorAll('a, button, .project-card, .skill-tag, .social-btn').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };
    attachHovers();

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  );
}
