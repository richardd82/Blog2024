import { Link } from 'react-router-dom';
import styles from './navBar.module.css';
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
  return (
    <header className={styles.header}>
        <nav >
          <ul className={styles.navigation}>
            {
              links.map(({ label, route }) => (
                <li className='text-2xl font-extrabold' key={route}>
                  <Link to={route}>{label}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
  )
}

export default NavBar