import Map from './pages/map';
import { FilterProvider } from './pages/filterProvider';
function App() {
  return (
    <FilterProvider>
      <Map zoomLevel={3} />
    </FilterProvider>
  );
}

export default App;
