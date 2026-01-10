


import styles from './Shop.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { fetchCars } from '../store/inventorySlice';

const Shop = () => {
  const { cars: allCars, loading, error } = useSelector(state => state.inventory);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // State for filters and sorting
  const [filters, setFilters] = useState({
    category: '',
    make: ''
  });
  const [sorting, setSorting] = useState({
    price: '',
    year: ''
  });

  // Scroll behavior state
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Scroll effect for mobile filters
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Fetch ALL cars once on component mount
  useEffect(() => {
    dispatch(fetchCars({})); // Empty filters = get all cars
  }, [dispatch]);

  // Check if more items can be added to cart
  const canAddToCart = (car) => {
    const cartItem = cart.find(item => item.id === car.id);
    const inCartQuantity = cartItem ? cartItem.quantity : 0;
    return inCartQuantity < car.stock;
  };

  // Extract unique values for filters from ALL cars
  const categories = [...new Set(allCars.map(car => car.category))];
  const makes = [...new Set(allCars.map(car => car.make))];

  // Apply filters and sorting LOCALLY with tie-breaking
const filteredCars = allCars
  .filter(car => {
    if (filters.category && car.category !== filters.category) return false;
    if (filters.make && car.make !== filters.make) return false;
    return true;
  })
  .sort((a, b) => {
    // Primary sort: Price
    if (sorting.price === 'high-to-low') {
      if (b.price !== a.price) return b.price - a.price;
      // If prices are equal, apply year sort
      if (sorting.year === 'new-to-old') return b.year - a.year;
      if (sorting.year === 'old-to-new') return a.year - b.year;
    }
    
    if (sorting.price === 'low-to-high') {
      if (a.price !== b.price) return a.price - b.price;
      // If prices are equal, apply year sort
      if (sorting.year === 'new-to-old') return b.year - a.year;
      if (sorting.year === 'old-to-new') return a.year - b.year;
    }
    
    // Primary sort: Year (if no price sorting selected)
    if (sorting.year === 'new-to-old') return b.year - a.year;
    if (sorting.year === 'old-to-new') return a.year - b.year;
    
    // Default: no sorting
    return 0;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSorting(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: '', make: '' });
    setSorting({ price: '', year: '' });
  };

  const handleAddToCart = (car) => {
    dispatch(addToCart(car));
    
    // Show notification
    setNotificationMessage(`${car.name} was added to your cart!`);
    setShowNotification(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className={styles.shopContainer}>
      {/* Loading and error states */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>Loading cars...</div>
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          Error loading cars: {error}
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className={styles.notification}>
          {notificationMessage}
        </div>
      )}

      {/* Filters Section */}
      <div className={`${styles.filtersPanel} ${!visible ? styles.hidden : ''}`}>
        <h2>Filter Cars</h2>
        
        <div className={styles.filterGroup}>
          <label>Category:</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            disabled={loading}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Make:</label>
          <select
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            disabled={loading}
          >
            <option value="">All Makes</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Sort by Price:</label>
          <select
            name="price"
            value={sorting.price}
            onChange={handleSortChange}
            disabled={loading}
          >
            <option value="">Default</option>
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Sort by Year:</label>
          <select
            name="year"
            value={sorting.year}
            onChange={handleSortChange}
            disabled={loading}
          >
            <option value="">Default</option>
            <option value="new-to-old">Newest First</option>
            <option value="old-to-new">Oldest First</option>
          </select>
        </div>

        <button 
          onClick={resetFilters}
          className={styles.resetButton}
          disabled={loading}
        >
          Reset Filters
        </button>
      </div>

      {/* Cars Grid */}
      <div className={styles.carsGrid}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => {
            const isSoldOut = car.stock <= 0;
            const canAddMore = canAddToCart(car);

            return (
              <div key={car.id} className={styles.carCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={car.image}
                    alt={car.name}
                    className={styles.carImage}
                  />
                  {isSoldOut && <div className={styles.soldOutBadge}>Sold Out</div>}
                </div>
                
                <div className={styles.carDetails}>
                  <h3>{car.name} ({car.year})</h3>
                  <p className={styles.category}>{car.category}</p>
                  <p className={styles.price}>${car.price.toLocaleString()}</p>
                  <p className={styles.stock}>
                    Available: {car.stock}
                  </p>
                  
                  <button
                    onClick={() => handleAddToCart(car)}
                    disabled={isSoldOut || !canAddMore || loading}
                    className={`${styles.addButton} ${
                      (isSoldOut || !canAddMore || loading) ? styles.disabledButton : ''
                    }`}
                  >
                    {isSoldOut ? 'Sold Out' : 
                    !canAddMore ? 'Max in Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noResults}>
            <h3>No cars match your filters</h3>
            <p>
              Try adjusting your search or{' '}
              <button 
                onClick={resetFilters}
                className={styles.resetLink}
                disabled={loading}
              >
                reset all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
