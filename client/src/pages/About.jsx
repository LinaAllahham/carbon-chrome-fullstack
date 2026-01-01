



import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';

const About = () => {
  const [showImage, setShowImage] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [email, setEmail] = useState('');
  const videoRef = useRef(null);

  const fullText = `At Carbon & Chrome, we don't just sell cars — we curate automotive experiences. Our name speaks to the contrast and harmony of performance and polish: carbon for strength and innovation, chrome for elegance and legacy.

Beyond our premium vehicle collection, we are proud to offer purpose-built private tracks for racing, drifting, and performance driving. These facilities are equipped with advanced surveillance systems and safety protocols to ensure every thrill is responsibly pursued.

Our mission is not only to elevate the automotive lifestyle, but to promote safer streets by providing a professional environment for enthusiasts — helping to keep impaired and reckless driving off public roads.

Carbon & Chrome is where passion meets precision — on the lot and on the track.`;

  const faqItems = [
    { question: "How long can I book a session for?",
      answer: "You can book sessions in 30-minute, 1-hour, or multi-hour blocks depending on availability and experience type. Full-day private bookings are also available for exclusive events." },
    { question: "How much does it cost per hour?", 
      answer: "Standard track sessions start at $120/hour, with specialty experiences (like drifting or instructor-led racing) ranging from $150–$300/hour. Package deals and memberships are available for frequent drivers." },
    { question: "Can I drop in without an appointment?", 
      answer: "We recommend booking ahead, especially on weekends, but you're welcome to drop in and explore our showroom during visiting hours. Test drives, track access, and vehicle tours require prior booking." },
    { question: "What are the tracks like?", 
      answer: "We offer multiple professionally designed tracks including a high-speed circuit, a technical drifting course, and a safe learner loop. All are maintained to competition standards and equipped with safety measures." },
    { question: "Do you allow beginner or impaired drivers on track?", 
      answer: "For safety reasons, all drivers must pass a short assessment before solo driving. Impaired driving is strictly prohibited, and the facility is under continuous surveillance with trained staff to ensure safety." },
    { question: "Can I bring my own car to the track?", 
      answer: "Yes! We welcome personal vehicles that meet our safety inspection checklist. Track-use liability waivers and helmets are mandatory for all drivers." }
  ];

  const handleSkipVideo = () => {
    setShowImage(true);
    setShowForm(true);
    setDisplayText(fullText);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Email submitted:", email);
    alert(`Thank you! We'll contact you at ${email}`);
    setEmail(''); // clear the input after submit
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleVideoEnd = () => {
      setShowImage(true);
      setShowForm(true);
      setDisplayText(fullText);
    };
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }
    const typingDuration = 60 * 1000;
    const typingSpeed = typingDuration / fullText.length;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
      clearInterval(typingInterval);
    };
  }, [fullText]);

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
    setActiveQuestion(null);
  };

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className={styles.aboutSection}>
      {!showImage && (
        <div className={styles.videoWrapper}>
          <div className={styles.videoContainer}>
            <video ref={videoRef} autoPlay 
            // muted
            className={styles.backgroundVideo}>
              <source src="/videos/background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={handleSkipVideo}
              className={styles.skipButton}
              aria-label="Skip video introduction"
            >
              Skip Intro
            </button>
            <div className={styles.videoOverlayBottom}>
              <div className={styles.typingText}>
                {displayText}
                <span className={styles.cursor}>|</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImage && (
        <div className={styles.imageContainer}>
          <img 
            src="/images/about-img.jpg" 
            alt="About us" 
            className={styles.backgroundImage}
          />
          <div className={styles.contentOverlay}>
            {!showFAQ ? (
              <>
                <div className={styles.fullText}>{fullText}</div>
                <div className={styles.bookingForm}>
                  <h3>Reserve Your Experience</h3>
                  <form onSubmit={handleSubmit}>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className={styles.emailInput}
                    />
                    <div className={styles.buttonGroup}>
                      <button type="submit" className={styles.faqButton}>
                        Schedule Appointment
                      </button>
                      <button 
                        type="button" 
                        onClick={toggleFAQ}
                        className={styles.faqButton}
                      >
                        View FAQs
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className={styles.faqContainer}>
                <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>
                <div className={styles.faqList}>
                  {faqItems.map((item, index) => (
                    <div 
                      key={index} 
                      className={styles.faqItem}
                      onClick={() => toggleAnswer(index)}
                    >
                      <div className={styles.faqQuestion}>
                        {item.question}
                        <span className={styles.faqIcon}>
                          {activeQuestion === index ? '−' : '+'}
                        </span>
                      </div>
                      {activeQuestion === index && (
                        <div className={styles.faqAnswer}>{item.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={toggleFAQ}
                  className={styles.backButton}
                >
                  Back to Main
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
