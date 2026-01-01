

import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/pageSlice';
import styles from './NavBar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  // NEW: Scroll detection logic
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Show when scrolling up or at top, hide when scrolling down
      setVisible(
        prevScrollPos > currentScrollPos || 
        currentScrollPos < 10
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Calculate total items by summing all quantities
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // NEW: Added conditional 'hidden' class
    <div className={`${styles.navContainer} ${!visible ? styles.hidden : ''}`}>
      <nav className={styles.nav}>
        <img 
          src="/images/project-icon-removebg.png" 
          alt="Project Icon" 
          className={styles["nav-icon"]}
          onClick={() => dispatch(setPage('home'))}
        />
        <a 
          href="#home"
          className={styles.navItem} 
          onClick={(e) => {
            e.preventDefault();
            dispatch(setPage('home'));
          }}
        >
          Home
        </a>
        <a 
          href="#shop"
          className={styles.navItem} 
          onClick={(e) => {
            e.preventDefault();
            dispatch(setPage('shop'));
          }}
        >
          Shop
        </a>
        <a 
          href="#about"
          className={styles.navItem} 
          onClick={(e) => {
            e.preventDefault();
            dispatch(setPage('about'));
          }}
        >
          About
        </a>
        <div 
          className={styles.cartWrapper}
          onClick={() => dispatch(setPage('cart'))}
        >
          <div className={styles.cartIconContainer}>
            <img
              src={totalItems > 0 ? "/images/tow-car-removebg.png" : "/images/tow-empty-removebg.png"}
              alt="Cart"
              className={styles.cartIcon}
            />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;