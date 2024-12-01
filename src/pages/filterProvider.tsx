import React, { createContext, useState, useContext,useRef } from 'react';
import { Tags, friendsObject } from '../types/interfaces';
interface FilterContextType {
  filters: (Tags | friendsObject)[];
  setFilterFunctions: (newFilters: (Tags | friendsObject)[]) => void;

}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: React.ReactNode;
}
const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<(Tags | friendsObject)[]>([]);

  const setFilterFunctions = (newFilters: (Tags | friendsObject)[]) =>
    setFilters(newFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilterFunctions }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export { FilterProvider, useFilterContext };
