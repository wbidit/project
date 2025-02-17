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
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollStartPos = useRef({ x: 0, y: 0 });
  const isScrolling = useRef(false);

  // Define the missing function
  const createMultipleRipples = (x: number, y: number) => {
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

  // Smooth cursor movement with spring effect (Desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const smoothCursor = () => {
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
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

  // Device detection and event handling
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (isDesktop) {
      // Desktop event handlers
      const moveCursor = (e: MouseEvent) => setTargetPosition({ x: e.clientX, y: e.clientY });
      const handleLinkHover = () => setIsLinkHover(true);
      const handleLinkLeave = () => setIsLinkHover(false);
      const handleMouseDown = () => document.documentElement.classList.add('cursor-clicked');
      const handleMouseUp = () => document.documentElement.classList.remove('cursor-clicked');

      const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"], .clickable');
      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHover);
        element.addEventListener('mouseleave', handleLinkLeave);
      });

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleLinkHover);
          element.removeEventListener('mouseleave', handleLinkLeave);
        });
      };
    } else {
      // Mobile event handlers
      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch) {
          scrollStartPos.current = { x: touch.clientX, y: touch.clientY };
          isScrolling.current = false;
          setIsTouchActive(true);
          if (rippleRef.current) {
            rippleRef.current.style.left = `${touch.clientX}px`;
            rippleRef.current.style.top = `${touch.clientY}px`;
            rippleRef.current.classList.add('active');
            createMultipleRipples(touch.clientX, touch.clientY); // Use the defined function
          }
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch) {
          setPosition({ x: touch.clientX, y: touch.clientY });
          const deltaX = touch.clientX - scrollStartPos.current.x;
          const deltaY = touch.clientY - scrollStartPos.current.y;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          if (!isScrolling.current && distance > 10) {
            isScrolling.current = true;
            setIsTouchActive(false);
          }

          if (isScrolling.current && scrollLineRef.current) {
            const angle = Math.atan2(deltaY, deltaX);
            const midpointX = scrollStartPos.current.x + deltaX / 2;
            const midpointY = scrollStartPos.current.y + deltaY / 2;
            scrollLineRef.current.style.left = `${midpointX}px`;
            scrollLineRef.current.style.top = `${midpointY}px`;
            scrollLineRef.current.style.width = `${distance}px`;
            scrollLineRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
            scrollLineRef.current.style.opacity = '0.8';
          }
        }
      };

      const handleTouchEnd = () => {
        if (isScrolling.current && scrollLineRef.current) {
          scrollLineRef.current.style.opacity = '0';
          setTimeout(() => {
            if (scrollLineRef.current) {
              scrollLineRef.current.style.width = '0';
            }
          }, 500);
          isScrolling.current = false;
        }
        setIsTouchActive(false);
        setTimeout(() => !isTouchActive && setPosition({ x: -100, y: -100 }), 800);
      };

      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDesktop, isTouchActive]);

  return (
    <>
      {isDesktop ? (
        <div className={isLinkHover ? 'link-hover' : ''}>
          <div 
            className="custom-cursor" 
            style={{ left: position.x, top: position.y }} 
          />
        </div>
      ) : (
        <>
          <div
            className={`touch-glow ${isTouchActive ? 'active' : ''}`}
            style={{ left: position.x, top: position.y }}
          />
          <div ref={rippleRef} className="touch-ripple" />
          <div ref={scrollLineRef} className="scroll-line" />
        </>
      )}
    </>
  );
};

export default GlowOnlyCursor;