import { useEffect, useState, useRef } from 'react';
import '../styles/cursor.css';

const GlowOnlyCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Smooth cursor movement with spring effect
  useEffect(() => {
    if (!isDesktop) return;

    const smoothCursor = () => {
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
      
      // Apply spring physics for more natural movement
      const newX = position.x + dx * 0.15;
      const newY = position.y + dy * 0.15;
      
      setPosition({ x: newX, y: newY });
      
      animationFrameRef.current = requestAnimationFrame(smoothCursor);
    };
    
    animationFrameRef.current = requestAnimationFrame(smoothCursor);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition, position, isDesktop]);

  useEffect(() => {
    // Device detection
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    // Desktop mouse logic
    if (isDesktop) {
      const moveCursor = (e: MouseEvent) => {
        setTargetPosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleLinkHover = () => {
        setIsLinkHover(true);
      };
      
      const handleLinkLeave = () => {
        setIsLinkHover(false);
      };
      
      // Add hover effect for all clickable elements
      const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"], .clickable');
      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHover);
        element.addEventListener('mouseleave', handleLinkLeave);
      });
      
      // Add click effect
      const handleMouseDown = () => {
        document.documentElement.classList.add('cursor-clicked');
      };
      
      const handleMouseUp = () => {
        document.documentElement.classList.remove('cursor-clicked');
      };
      
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleLinkHover);
          element.removeEventListener('mouseleave', handleLinkLeave);
        });
      };
    }
    
    // Mobile touch logic
    else {
      const handleTouch = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch) {
          setPosition({ x: touch.clientX, y: touch.clientY });
          setIsTouchActive(true);
        }
      };
      
      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch && rippleRef.current) {
          // Create ripple effect at touch point
          rippleRef.current.style.left = `${touch.clientX}px`;
          rippleRef.current.style.top = `${touch.clientY}px`;
          rippleRef.current.classList.add('active');
          
          // Generate multiple ripples for more dynamic effect
          createMultipleRipples(touch.clientX, touch.clientY);
          
          setTimeout(() => {
            if (rippleRef.current) {
              rippleRef.current.classList.remove('active');
            }
          }, 1200);
        }
      };
      
      const createMultipleRipples = (x: number, y: number) => {
        // Create 3 additional ripples with slight offset and delay
        for (let i = 1; i <= 3; i++) {
          setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple additional-ripple';
            ripple.style.left = `${x + (Math.random() * 20 - 10)}px`;
            ripple.style.top = `${y + (Math.random() * 20 - 10)}px`;
            document.body.appendChild(ripple);
            
            setTimeout(() => {
              ripple.classList.add('active');
            }, 10);
            
            setTimeout(() => {
              document.body.removeChild(ripple);
            }, 1200);
          }, i * 150);
        }
      };
      
      const endTouch = () => {
        // Fade out touch effect gradually
        setIsTouchActive(false);
        
        // Delay position reset to allow for smooth transition
        setTimeout(() => {
          // Only move position off-screen if it hasn't been touched again
          if (!isTouchActive) {
            setPosition({ x: -100, y: -100 });
          }
        }, 800);
      };
      
      window.addEventListener('touchmove', handleTouch);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', endTouch);
      
      // Add styles for additional ripples
      const style = document.createElement('style');
      style.innerHTML = `
        .additional-ripple {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 220, 220, 0.7) 0%,
            rgba(255, 160, 160, 0.4) 50%,
            transparent 100%
          );
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9997;
          opacity: 0;
          filter: blur(4px);
        }
        
        .additional-ripple.active {
          opacity: 0.9;
          animation: rippleGlowExpand 1s forwards;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        window.removeEventListener('touchmove', handleTouch);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', endTouch);
        document.head.removeChild(style);
      };
    }
  }, [isDesktop, isTouchActive]);
  
  return (
    <>
      {/* Desktop Elements - Glow Only */}
      {isDesktop && (
        <div className={isLinkHover ? 'link-hover' : ''}>
          <div 
            className="custom-cursor" 
            style={{ 
              left: position.x, 
              top: position.y 
            }} 
          />
        </div>
      )}
      
      {/* Mobile Touch Effects */}
      {!isDesktop && (
        <>
          <div
            className={`touch-glow ${isTouchActive ? 'active' : ''}`}
            style={{
              left: position.x,
              top: position.y,
            }}
          />
          <div
            ref={rippleRef}
            className="touch-ripple"
          />
        </>
      )}
    </>
  );
};

export default GlowOnlyCursor;