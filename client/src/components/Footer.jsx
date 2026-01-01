

import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.footerContainer}>
    <footer className={styles.footer}>
      <a 
        href="https://linaalla77am-projects.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.copyrightLink}  // Changed class name
      >
        &copy; 2024–2025 Carbon & Chrome Driveworks
      </a>
      
      <div className={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="/images/facebook-icon.png" 
            alt="Facebook" 
            className={styles.socialIcon}
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="/images/twitter-icon.png" 
            alt="Twitter" 
            className={styles.socialIcon}
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="/images/instagram-icon.png" 
            alt="Instagram" 
            className={styles.socialIcon}
          />
        </a>
      </div>
    </footer>
  </div>
);

export default Footer;