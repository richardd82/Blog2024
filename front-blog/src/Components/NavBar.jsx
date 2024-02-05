import { Link } from 'react-router-dom';
import styles from './navBar.module.css';
import useStoreFilters from '../Zustand/StoreFilters';
const links = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Post',
      route: '/newPost',
    },    
  ];

const NavBar = () => {
  const { setFilter, setSearch, SetResults } = useStoreFilters();

  const handleClick = () => {
    setFilter('');
    setSearch('');
    SetResults([]);
  }

  return (
    <header className={styles.header}>
        <nav >
          <ul className={styles.navigation}>
            {
              links.map(({ label, route }) => (
                <li className='text-2xl font-extrabold' key={route}>
                  <Link to={route} onClick={handleClick}>{label}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
  )
}

export default NavBar