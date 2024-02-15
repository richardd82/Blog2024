import { useCallback, useEffect } from "react";
import useStore from "../Zustand/Store";

// import {useLocation} from "react-router-dom";

const Filters = () => {
  const {
    filterPostsByTitle,
    filterPostsByAuthor,
    filterPostsByContent,
    getAllPosts,
    filter, search, results, setFilter, setSearch, setResults
  } = useStore();
  
  // const location = useLocation();
  // const navigate = useNavigate();
  // console.log("PostsList Store===>", filter, search);

  // console.log('location Store===>', location)

  console.log();

  const handleFilterState = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    handleFilter(newFilter, search);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    handleFilter(filter, newSearch);
  };
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    
    return true;
  }

  const handleFilter = useCallback(
    (f, s) => {
      console.log(f, s);

      let newResults = [];

      filter === "byTitle"
        ? (newResults = filterPostsByTitle(s))
        : filter === "byAuthor"
        ? (newResults = filterPostsByAuthor(s))
        : filter === "byContent"
        ? (newResults = filterPostsByContent(s))
        : (newResults = getAllPosts());
      // filter==='byTitle' ? setTypeFilter('title') : filter==='byAuthor' ? setTypeFilter('author') : filter==='byContent' ?  setTypeFilter('content') : setTypeFilter('');

      if (!arraysAreEqual(newResults, results)) {
        setResults(newResults);
      }
    },
    [
      results, setResults, filterPostsByTitle, filterPostsByAuthor, filterPostsByContent, getAllPosts
    ]
  );

  useEffect(() => {
 
        const newFilter = filter || "";
        const newSearch = search || "";

        // setFilter(newFilter);
        // setSearch(newSearch);

        handleFilter(newFilter, newSearch);

        // return () => {
        //   // Realizar cualquier limpieza necesaria, como restablecer los resultados
        //   // Esto podría ser útil si necesitas limpiar el estado o cancelar solicitudes pendientes
        //   setResults([]);
        // };


  }, [filter, search, setResults, handleFilter]);

  return (
    <section className='mt-6'>
      <form className='flex justify-center gap-16 bg-transparent'>
        <select
          value={filter}
          onChange={handleFilterState}
          className='p-3 rounded-md bg-transparent border border-pink-500 '
        >
          <option value=''> Select filter </option>
          <option value='byTitle'>By Title</option>
          <option value='byAuthor'>By Author</option>
          <option value='byContent'>By Content</option>
        </select>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={handleSearchChange}
          className='p-3 rounded-md bg-transparent border border-pink-500'
        />
      </form>
    </section>
  );
};

export default Filters;
