
import React from 'react';
import Layout from '@/components/Layout/Layout';
import PortfolioHero from '@/components/Portfolio/PortfolioHero';
import PortfolioCategories from '@/components/Portfolio/PortfolioCategories';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';

const Portfolio = () => {
  return (
    <Layout>
      <PortfolioHero />
      <PortfolioCategories />
      <PortfolioGrid />
    </Layout>
  );
};

export default Portfolio;
