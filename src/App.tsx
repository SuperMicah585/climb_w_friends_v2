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

/* 

user only has access to their own data

CREATE POLICY "Allow access based on user_map_climb_table" 
ON public.maps 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM user_map_climb_table 
    WHERE user_map_climb_table.map_id = maps.map_id 
      AND user_map_climb_table.user_id = auth.uid::int
  )
);


users have access to any change made on a map that they are listed on

CREATE POLICY "Allow access based on user_map_climb_table" 
ON public.maps 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM user_map_climb_table 
    WHERE user_map_climb_table.map_id = maps.map_id 
  )
);


*/
