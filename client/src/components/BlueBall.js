// Modules
import React, { useState, useEffect, useRef } from 'react';

const BlueBall = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef(position);
  const requestIdRef = useRef();

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const speed = 5; // Adjust the speed as needed
      const newPosition = { ...positionRef.current };

      switch (event.key) {
        case 'ArrowUp':
          newPosition.y -= speed;
          break;
        case 'ArrowDown':
          newPosition.y += speed;
          break;
        case 'ArrowLeft':
          newPosition.x -= speed;
          break;
        case 'ArrowRight':
          newPosition.x += speed;
          break;
        default:
          break;
      }

      setPosition(newPosition);
    };

    const animate = () => {
      // Smoothly update the position
      setPosition((prevPosition) => ({
        x: prevPosition.x + (positionRef.current.x - prevPosition.x) * 0.1,
        y: prevPosition.y + (positionRef.current.y - prevPosition.y) * 0.1,
      }));

      requestIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('keydown', handleKeyPress);
    animate();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'blue',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    ></div>
  );
};

export default BlueBall;
