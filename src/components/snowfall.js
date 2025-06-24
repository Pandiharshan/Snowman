import React, { useRef, useEffect } from 'react';

const Snowfall = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const snowflakesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Initialize canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize snowflakes
    const initSnowflakes = () => {
      snowflakesRef.current = [];
      for (let i = 0; i < 100; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1, // 1-4 radius
          speed: Math.random() + 0.5, // 0.5-1.5 speed
          drift: Math.random() * 0.5 - 0.25 // slight horizontal drift
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach(snowflake => {
        // Update snowflake position
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.drift;

        // Reset snowflake when it reaches bottom
        if (snowflake.y > canvas.height) {
          snowflake.y = -10;
          snowflake.x = Math.random() * canvas.width;
        }

        // Keep snowflake within horizontal bounds
        if (snowflake.x > canvas.width) {
          snowflake.x = 0;
        } else if (snowflake.x < 0) {
          snowflake.x = canvas.width;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initSnowflakes();
    };

    // Initialize
    resizeCanvas();
    initSnowflakes();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }}
    />
  );
};

export default Snowfall;