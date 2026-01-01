


import { useSelector } from 'react-redux';
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Cart from './Cart';

const Page = () => {
  const currentPage = useSelector(state => state.page.currentPage); // Get active page from Redux

  return (
    <main>
      {currentPage === 'home' && <Home />}
      {currentPage === 'shop' && <Shop />}
      {currentPage === 'about' && <About />}
      {currentPage === 'cart' && <Cart />}
    </main>
  );
};

export default Page;


