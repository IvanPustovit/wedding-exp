import React, { useState, useEffect } from 'react';
import styles from '../styles/envelope.module.css';

interface EnvelopeAnimationProps {
  onOpen: () => void;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({ onOpen }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setIsOpening(true);
      
      // // Show redirect message after card appears
      // setTimeout(() => {
      //   setShowRedirectMessage(true);
      // }, 2000);
      
      // Redirect after 5 seconds total
      // setTimeout(() => {
      //   onOpen();
      // }, 2000);
    }
  };

  return (
    <div className={styles.envelopeContainer}>
    {/* {isOpening && <div className={styles.envelopeContainerKolos}></div>} */}

      <div className={styles.ukrainianPattern}></div>
      
      {/* Show couple names prominently at the top */}
      {/* <div className={styles.headerTitle}>
        <h1 className={styles.mainTitle}>Весільне запрошення</h1>
        <h2 className={styles.coupleNamesHeader}>Олександр & Марія</h2>
        <p className={styles.dateHeader}>25 травня 2024</p>
      </div> */}
      
      <div 
        className={`${styles.envelope} ${isOpening ? styles.opening : ''}`}
        onClick={handleClick}
      >
        <div className={styles.envelopeFlap}></div>
        <div className={styles.envelopeFlapBack}></div>
        <div className={styles.envelopeBody}>
        {/* <div className={styles.envelopeFlap}></div> */}
          {/* <div className={styles.waxSeal}> */}
            {/* <span className={styles.sealText}>💕</span> */}
          {/* </div> */}
        </div>
        {isOpening && (<>
    <div className={styles.envelopeContainerKolos}>
    <img src="/pngwing35.png" alt="kolos" className={styles.kolosImage2} />
    <img src="/pngwing3.png" alt="kolos" className={styles.kolosImage} />
    </div>
          <div className={styles.invitationCard}>

            <div className={styles.cardContent}>
              <h3 className={styles.coupleNames}>Запрошення від</h3>
              <h3 className={styles.coupleNames}>Миколи & Ольги</h3>
             
              {/* <div className={styles.ornament}>🌻 💙 💛 🌻</div> */}
             
            </div>
          </div></>
        )}
      </div>
      {!isClicked && (
        <p className={styles.clickHint}>Натисніть на конверт, щоб відкрити запрошення</p>
      )}
    </div>
  );
};

export default EnvelopeAnimation;