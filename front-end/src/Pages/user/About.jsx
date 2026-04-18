import React from 'react';
import SEO from '../../components/common/SEO'; 
import { FirstAbout } from '../../features/user/About';

const About = () => {
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