

// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   clearCart, 
//   removeOneFromCart, 
//   removeAllFromCart 
// } from '../store/cartSlice';
// import { decrementCar } from '../store/inventorySlice';
// import styles from './Cart.module.css';
// import { useState } from 'react';

// const Cart = () => {
//   const cart = useSelector(state => state.cart);
//   const dispatch = useDispatch();
//   const [purchased, setPurchased] = useState(false);
//   const [lastPurchasedCar, setLastPurchasedCar] = useState(null);

//   const handlePurchase = () => {
//     if (cart.length === 0) return;
    
//     cart.forEach(car => {
//       dispatch(decrementCar({ id: car.id, quantity: car.quantity }));
//     });
    
//     setLastPurchasedCar(cart[0]);
//     dispatch(clearCart());
//     setPurchased(true);
    
//     setTimeout(() => {
//       setPurchased(false);
//       setLastPurchasedCar(null);
//     }, 3000);
//   };

//   const handleClearAll = () => {
//     if (cart.length === 0) return;
//     dispatch(clearCart());
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, car) => total + (car.price * car.quantity), 0);
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartHeader}>
//         <h2 className={styles.cartTitle}>Your Cart</h2>
//         {cart.length > 0 && (
//           <button 
//             onClick={handleClearAll}
//             className={styles.clearAllButton}
//           >
//             Clear All Items
//           </button>
//         )}
//       </div>
      
//       {cart.length === 0 ? (
//         <div className={`${styles.emptyCart} ${purchased ? styles.purchased : ''}`}>
//           <div className={styles.towImageContainer}>
//             <img 
//               src="public/images/tow-empty-removebg.png" 
//               alt="Empty cart" 
//               className={styles.towImage}
//             />
//             {purchased && lastPurchasedCar && (
//               <div className={styles.purchasedCarImage}>
//                 <img 
//                   src={lastPurchasedCar.image} 
//                   alt="Purchased car" 
//                 />
//               </div>
//             )}
//           </div>
//           <p>{purchased ? 'Purchase Complete!' : 'Your cart is empty'}</p>
//         </div>
//       ) : (
//         <div className={styles.cartContent}>
//           <div className={styles.cartItems}>
//             {cart.map(car => (
//               <div key={car.id} className={styles.cartItem}>
//                 <div className={styles.carImageContainer}>
//                   <div className={styles.carImageWrapper}>
//                     <img 
//                       src="public/images/tow-empty-removebg.png" 
//                       alt="Cart" 
//                       className={styles.towBackground}
//                     />
//                     <img 
//                       src={car.image} 
//                       alt={car.name} 
//                       className={styles.carImage}
//                     />
//                   </div>
//                 </div>
                
//                 <div className={styles.carDetails}>
//                   <h3>{car.name}</h3>
//                   <p className={styles.carPrice}>${car.price.toLocaleString()}</p>
//                   <p className={styles.carQuantity}>Quantity: {car.quantity}</p>
                  
//                   <div className={styles.buttonGroup}>
//                     <button 
//                       onClick={() => dispatch(removeOneFromCart(car.id))}
//                       className={styles.removeButton}
//                     >
//                       Remove One
//                     </button>
//                     <button 
//                       onClick={() => dispatch(removeAllFromCart(car.id))}
//                       className={styles.removeAllButton}
//                     >
//                       Remove All
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className={styles.cartSummary}>
//             <div className={styles.summaryRow}>
//               <span>Total Items:</span>
//               <span>{cart.reduce((total, car) => total + car.quantity, 0)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Total Price:</span>
//               <span>${calculateTotal().toLocaleString()}</span>
//             </div>
//             <button 
//               onClick={handlePurchase}
//               className={styles.purchaseButton}
//               disabled={cart.length === 0}
//             >
//               Complete Purchase
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import { useSelector, useDispatch } from 'react-redux';
import { 
  clearCart, 
  removeOneFromCart, 
  removeAllFromCart 
} from '../store/cartSlice';
import { updateStock } from '../store/inventorySlice';
import { processPurchase } from '../services/api';
import styles from './Cart.module.css';
import { useState } from 'react';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState(false);
  const [lastPurchasedCar, setLastPurchasedCar] = useState(null);
  const [purchaseError, setPurchaseError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    setPurchaseError(null);
    
    try {
      // Call backend API
      await processPurchase(cart);
      
      // Update local stock for each item
      cart.forEach(car => {
        const newStock = car.stock - car.quantity;
        dispatch(updateStock({ id: car.id, stock: newStock }));
      });
      
      setLastPurchasedCar(cart[0]);
      dispatch(clearCart());
      setPurchased(true);
      
      setTimeout(() => {
        setPurchased(false);
        setLastPurchasedCar(null);
      }, 3000);
      
    } catch (error) {
      setPurchaseError(error.message);
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearAll = () => {
    if (cart.length === 0) return;
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, car) => total + (car.price * car.quantity), 0);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h2 className={styles.cartTitle}>Your Cart</h2>
        {cart.length > 0 && (
          <button 
            onClick={handleClearAll}
            className={styles.clearAllButton}
            disabled={isProcessing}
          >
            Clear All Items
          </button>
        )}
      </div>
      
      {/* Purchase Error Display */}
      {purchaseError && (
        <div className={styles.errorMessage}>
          Error: {purchaseError}
        </div>
      )}
      
      {cart.length === 0 ? (
        <div className={`${styles.emptyCart} ${purchased ? styles.purchased : ''}`}>
          <div className={styles.towImageContainer}>
            <img 
              src="public/images/tow-empty-removebg.png" 
              alt="Empty cart" 
              className={styles.towImage}
            />
            {purchased && lastPurchasedCar && (
              <div className={styles.purchasedCarImage}>
                <img 
                  src={lastPurchasedCar.image} 
                  alt="Purchased car" 
                />
              </div>
            )}
          </div>
          <p>{purchased ? 'Purchase Complete!' : 'Your cart is empty'}</p>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map(car => (
              <div key={car.id} className={styles.cartItem}>
                <div className={styles.carImageContainer}>
                  <div className={styles.carImageWrapper}>
                    <img 
                      src="public/images/tow-empty-removebg.png" 
                      alt="Cart" 
                      className={styles.towBackground}
                    />
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className={styles.carImage}
                    />
                  </div>
                </div>
                
                <div className={styles.carDetails}>
                  <h3>{car.name}</h3>
                  <p className={styles.carPrice}>${car.price.toLocaleString()}</p>
                  <p className={styles.carQuantity}>Quantity: {car.quantity}</p>
                  
                  <div className={styles.buttonGroup}>
                    <button 
                      onClick={() => dispatch(removeOneFromCart(car.id))}
                      className={styles.removeButton}
                      disabled={isProcessing}
                    >
                      Remove One
                    </button>
                    <button 
                      onClick={() => dispatch(removeAllFromCart(car.id))}
                      className={styles.removeAllButton}
                      disabled={isProcessing}
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.cartSummary}>
            <div className={styles.summaryRow}>
              <span>Total Items:</span>
              <span>{cart.reduce((total, car) => total + car.quantity, 0)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total Price:</span>
              <span>${calculateTotal().toLocaleString()}</span>
            </div>
            <button 
              onClick={handlePurchase}
              className={styles.purchaseButton}
              disabled={cart.length === 0 || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </button>
            {isProcessing && (
              <p className={styles["processingNote"]}>
                Processing your purchase with the server...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;