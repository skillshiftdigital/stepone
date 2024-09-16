'use client'

import React from 'react';
import { GridProductWidget, CarouselQuickViewWidget, HorizontalScrollWidget, RecommendedProductsWidget } from './components';

const App = () => {
  return (
    <div>
      <GridProductWidget />
      <CarouselQuickViewWidget />
      <HorizontalScrollWidget />
      <RecommendedProductsWidget />
    </div>
  );
};

export default App;