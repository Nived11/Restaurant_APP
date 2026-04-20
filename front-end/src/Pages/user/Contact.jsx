import React, { useState, useLayoutEffect } from 'react';
import SEO from '../../components/common/SEO'; 
import { ContactPage } from '../../features/user/contact';

const Contact = () => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isReady) return null;

  return (
    <>
      <SEO 
        title="Contact Us | The Crunch India" 
        description="Get in touch with The Crunch India. For food delivery queries, table reservations, or customer support in Kochi and Ernakulam, reach out to us today."
        keywords="contact The Crunch India, restaurant phone number Kochi, food delivery support Ernakulam"
      />
      <div>
        <ContactPage />
      </div>
    </>
  );
};

export default Contact;