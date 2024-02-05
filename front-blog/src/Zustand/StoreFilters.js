// store.js
import { create } from 'zustand';

const useStoreFilters = create((set) => ({
  filter: '',
  search: '',
  results: [],
  // typeFilter: '',
  // setTypeFilter: (type) => set({ filter: type }),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
  setResults: (results) => set({ results }),
}));

export default useStoreFilters;
