

import styles from './Home.module.css';

const Home = () => (
  <div className={styles["home-wrapper"]}>
    <img 
      src="public/images/background-Home.jpg" 
      alt="Background" 
      className={styles["background-img"]}
    />
    
    
    <div className={styles["content"]}>
      <h1>Welcome To CARBON & CHROME!</h1>
      <p>Your trusted source for premium vehicles.</p>
    </div>
  </div>
);

export default Home;