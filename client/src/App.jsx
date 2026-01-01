

import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';

const App = () => {
  const currentPage = useSelector(state => state.page);

  return (
    <div className="app">
      <NavBar />
      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'shop' && <Shop />}
        {currentPage === 'about' && <About />}
        {currentPage === 'cart' && <Cart />}
      </main>
      <Footer />
    </div>
  );
};

export default App;


