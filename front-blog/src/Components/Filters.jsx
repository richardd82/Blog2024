import { useEffect, useState } from "react";
import useStore from "../Zustand/Store";

const Filters = () => {
  const { filterPostsByTitle, filterPostsByAuthor, filterPostsByContent, getAllPosts } = useStore();
  const [filter, setFilter] = useState(localStorage.getItem('filter') || ''); 
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [results, setResults] = useState(JSON.parse(localStorage.getItem('results')) || []);

  const handleFilterState = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    localStorage.setItem('filter', newFilter);
    handleFilter(newFilter, search);
  }

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    localStorage.setItem('search', newSearch);
    handleFilter(filter, newSearch);
  }

  const handleFilter = (f, s) => {    
    console.log(f, s);

    let newResults = [];

    filter === "byTitle"
      ? newResults=filterPostsByTitle(s)
      : filter === "byAuthor"
      ? newResults=filterPostsByAuthor(s)
      : filter === "byContent"
      ? newResults=filterPostsByContent(s)
      : newResults = getAllPosts();

      setResults(newResults);
      localStorage.setItem('resultados', JSON.stringify(newResults));
  };

  useEffect(() => {
    // Limpia el localStorage al desmontar el componente
    return () => {
      localStorage.removeItem('filter');
      localStorage.removeItem('search');
      localStorage.removeItem('results');
    };
  }, []);

  return (
    <section className="mt-6">
      <form className="flex justify-center gap-16 bg-transparent">
        <select value={filter} onChange={handleFilterState} className="p-3 rounded-md bg-transparent border border-pink-500 ">
          <option defaultValue> Select a filter </option>
          <option value='byTitle' >By Title</option>
          <option value='byAuthor'>By Author</option>
          <option value='byContent'>By Content</option>
        </select>
        <input type='text' placeholder='Search' value={search} onChange={handleSearchChange} className="p-3 rounded-md bg-transparent border border-pink-500" />
      </form>
    </section>
  );
};

export default Filters;
