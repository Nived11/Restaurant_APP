import React, { useState, useLayoutEffect } from 'react';
import SEO from '../../components/common/SEO'; 
import { FirstAbout } from '../../features/user/About';

const About = () => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    // Yield to the browser's paint cycle twice to ensure CSS tab transition completes
    // before we mount the heavy FirstAbout component.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isReady) return null; // Or a lightweight skeleton

  return (
    <>
      <SEO 
        title="About Us | The Crunch India Story" 
        description="Learn about the passion behind The Crunch India. We are dedicated to serving the freshest ingredients and delivering a premium culinary experience in Kochi, Ernakulam."
        keywords="About The Crunch India, best restaurant in Kochi, food delivery story Ernakulam"
      />
      
      <FirstAbout />
    </>
  );
};

export default About;