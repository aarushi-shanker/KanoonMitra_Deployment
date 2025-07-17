import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const AnimatedComponent = ({ children }) => {
  const [inView, setInView] = useState(false);
  const [animate, setAnimate] = useState(false); // Track animation state
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setAnimate(true); // Triggering animation when in view
        } else {
          setInView(false);
          setAnimate(false); // Reseting animation state when out of view
        }
      },
      { threshold: 0.05 } // Triggering when 5% of the element is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`animate-in ${inView && animate ? 'in-view' : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;