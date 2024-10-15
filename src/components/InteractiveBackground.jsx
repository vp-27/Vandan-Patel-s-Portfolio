import React, { useState, useEffect } from 'react';

const InteractiveBackground = () => {
  const [squares, setSquares] = useState([]);
  const [hoveredSquares, setHoveredSquares] = useState(new Set());

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth / 50);
    const rows = Math.ceil(window.innerHeight / 50);
    setSquares(Array(rows * cols).fill(0).map((_, i) => ({ id: i, x: (i % cols) * 50, y: Math.floor(i / cols) * 50 })));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHoveredSquares(prev => {
        const newSet = new Set(prev);
        for (const id of prev) {
          if (Math.random() < 0.1) { // 10% chance to remove each frame
            newSet.delete(id);
          }
        }
        return newSet;
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const x = Math.floor(e.clientX / 50);
    const y = Math.floor(e.clientY / 50);
    const id = y * Math.ceil(window.innerWidth / 50) + x;
    setHoveredSquares(prev => new Set(prev).add(id));
  };

  return (
    <div className="mega-container" onMouseMove={handleMouseMove}>
      {squares.map(square => (
        <div
          key={square.id}
          className={`square ${hoveredSquares.has(square.id) ? 'hovered' : ''}`}
          style={{
            position: 'absolute',
            left: square.x,
            top: square.y,
            width: '50px',
            height: '50px',
            border: '1px solid #e0e0e0',
            transition: 'border-color 0.3s ease-out',
            borderColor: hoveredSquares.has(square.id) ? '#3498db' : 'transparent',
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;