import Map from './pages/map';
import React from 'react';
import { FilterProvider } from './pages/filterProvider';
function App() {
  return (
    <FilterProvider>
      <Map zoomLevel={2} />
    </FilterProvider>
  );
}

export default App;
