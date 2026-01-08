import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Snowman Cursor - Winter Magic
 * Snowflake core with frost ring + snow dust particles
 * Feels like touching winter
 */
const CursorGlow = React.memo(() => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const [isReady, setIsReady] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const isActive = useRef(false);

  // Snow dust particles that trail behind
  const snowDust = useRef<{
    x: number; y: number; vx: number; vy: number;
    size: number; life: number; rotation: number;
  }[]>([]);

  // Defer canvas initialization to prevent blocking first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastX = 0, lastY = 0;

    const onMove = (e: MouseEvent) => {
      const speed = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) +
        Math.pow(e.clientY - lastY, 2)
      );

      // Spawn snow dust when moving
      if (speed > 5 && snowDust.current.length < 15) {
        snowDust.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1 + 0.5, // Falls down like snow
          size: 2 + Math.random() * 3,
          life: 1,
          rotation: Math.random() * Math.PI * 2,
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
      mouse.current = { x: e.clientX, y: e.clientY };
      isActive.current = true;
    };

    const onLeave = () => { isActive.current = false; };
    const onEnter = () => { isActive.current = true; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Draw a simple snowflake shape
    const drawSnowflake = (x: number, y: number, size: number, alpha: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = isDark
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(14, 165, 233, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      // 6 arms of snowflake
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        // Small branches
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(-size * 0.25, -size * 0.7);
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(size * 0.25, -size * 0.7);
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Dot follows mouse (responsive)
      const dotEase = 0.18;
      dot.current.x += (mouse.current.x - dot.current.x) * dotEase;
      dot.current.y += (mouse.current.y - dot.current.y) * dotEase;

      // Ring trails behind (elastic)
      const ringEase = 0.07;
      const dx = dot.current.x - ring.current.x;
      const dy = dot.current.y - ring.current.y;

      velocity.current.x += dx * ringEase;
      velocity.current.y += dy * ringEase;
      velocity.current.x *= 0.82;
      velocity.current.y *= 0.82;

      ring.current.x += velocity.current.x;
      ring.current.y += velocity.current.y;

      const separation = Math.sqrt(dx * dx + dy * dy);

      // === SNOW DUST PARTICLES ===
      // Optimized: Backwards loop + splice (avoid array.filter allocation each frame)
      for (let i = snowDust.current.length - 1; i >= 0; i--) {
        const p = snowDust.current[i];
        p.life -= 0.02;

        if (p.life <= 0) {
          snowDust.current.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // Gravity - falls like snow
        p.rotation += 0.02;

        const alpha = p.life * (isDark ? 0.6 : 0.4);

        // Draw as tiny snowflake
        drawSnowflake(p.x, p.y, p.size, alpha, p.rotation);
      }

      if (isActive.current && mouse.current.x > -50) {

        // === FROST AURA (cold mist around cursor) ===
        const auraSize = 150;
        const aura = ctx.createRadialGradient(
          dot.current.x, dot.current.y, 0,
          dot.current.x, dot.current.y, auraSize
        );

        if (isDark) {
          aura.addColorStop(0, 'rgba(186, 230, 253, 0.08)');
          aura.addColorStop(0.5, 'rgba(186, 230, 253, 0.03)');
          aura.addColorStop(1, 'transparent');
        } else {
          aura.addColorStop(0, 'rgba(14, 165, 233, 0.06)');
          aura.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
          aura.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(dot.current.x, dot.current.y, auraSize, 0, Math.PI * 2);
        ctx.fill();

        // === FROST RING (icy circle that trails) ===
        const baseRingSize = 18;
        const ringExpand = Math.min(separation * 0.1, 5);
        const ringSize = baseRingSize + ringExpand;
        const ringOpacity = Math.max(0.25, 0.45 - separation * 0.003);

        // Dashed ring like ice crystals
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.arc(ring.current.x, ring.current.y, ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(186, 230, 253, ${ringOpacity})`
          : `rgba(14, 165, 233, ${ringOpacity * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // === SNOWFLAKE CENTER ===
        const time = Date.now() * 0.001;
        const rotation = time * 0.3; // Slow rotation

        // Glow behind snowflake
        const coreGlow = ctx.createRadialGradient(
          dot.current.x, dot.current.y, 0,
          dot.current.x, dot.current.y, 20
        );

        if (isDark) {
          coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          coreGlow.addColorStop(0.5, 'rgba(186, 230, 253, 0.15)');
          coreGlow.addColorStop(1, 'transparent');
        } else {
          coreGlow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
          coreGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.15)');
          coreGlow.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(dot.current.x, dot.current.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Draw snowflake at center
        drawSnowflake(
          dot.current.x,
          dot.current.y,
          8,
          isDark ? 0.9 : 0.7,
          rotation
        );

        // Bright center dot
        ctx.beginPath();
        ctx.arc(dot.current.x, dot.current.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(14, 165, 233, 0.9)';
        ctx.fill();

      } else {
        ring.current.x += (dot.current.x - ring.current.x) * 0.15;
        ring.current.y += (dot.current.y - ring.current.y) * 0.15;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDark, isReady]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
});

CursorGlow.displayName = 'CursorGlow';

export default CursorGlow;
