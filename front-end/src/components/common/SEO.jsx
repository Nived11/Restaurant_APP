import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, noindex = false }) => {
  const siteName = 'The Crunch India';
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Search Engine Crawling */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
    </Helmet>
  );
};

export default SEO;