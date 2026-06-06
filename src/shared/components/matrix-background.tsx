"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let drops: MatrixDrop[] = [];
    let particles: Particle[] = [];

    class MatrixDrop {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      maxLength: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.floor(Math.random() * (width / 14)) * 14;
        this.y = -(Math.random() * height);
        this.speed = Math.random() * 60 + 30;
        this.maxLength = Math.floor(Math.random() * 15) + 5;
        this.opacity = Math.random() * 0.4 + 0.05;
        this.chars = [];

        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
        for (let i = 0; i < this.maxLength; i++) {
          this.chars.push(chars[Math.floor(Math.random() * chars.length)]);
        }
      }

      update(deltaTime: number, height: number, width: number) {
        this.y += this.speed * deltaTime;

        if (this.y > height + this.maxLength * 14) {
          this.y = -Math.random() * 200;
          this.x = Math.floor(Math.random() * 200) * 14;

          const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
          this.chars = this.chars.map(
            () => chars[Math.floor(Math.random() * chars.length)]
          );
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "12px 'Courier New', monospace";

        for (let i = 0; i < this.chars.length; i++) {
          const y = this.y + i * 14;

          if (i === this.chars.length - 1) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 2.5})`;
          } else {
            const opacity = (i / this.chars.length) * this.opacity;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          }

          ctx.fillText(this.chars[i], this.x, y);
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.twinkleSpeed = Math.random() * 2 + 1;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, time: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width + 10) this.x = -10;
        else if (this.x < -10) this.x = width + 10;

        if (this.y > height + 10) this.y = -10;
        else if (this.y < -10) this.y = height + 10;

        this.opacity =
          Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.3 + 0.3;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let lastTime = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const isMobile = window.innerWidth < 768;
      const dropCount = isMobile ? 15 : 35;
      const particleCount = isMobile ? 40 : 90;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(window.innerWidth, window.innerHeight));
      }

      drops = [];
      for (let i = 0; i < dropCount; i++) {
        drops.push(new MatrixDrop(window.innerWidth, window.innerHeight));
      }
    };

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      drops.forEach((drop) => {
        drop.update(deltaTime, window.innerHeight, window.innerWidth);
        drop.draw(ctx);
      });

      particles.forEach((particle) => {
        particle.update(window.innerWidth, window.innerHeight, time / 1000);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
      }, 200);
    };

    resize();
    animationFrameId = requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
