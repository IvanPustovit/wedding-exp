"use client"

import React, { useEffect, useState } from 'react';
import styles from '../styles/countdown.module.css';

type CountdownProps = {
  targetDate?: string; // ISO string
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

const Countdown: React.FC<CountdownProps> = ({ targetDate = '2025-11-01T00:00:00', className }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const t = new Date(targetDate).getTime() - Date.now();
    return Math.max(0, t);
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft(diff);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft <= 0) {
    return <div className={`${styles.countdown} ${className || ''}`}>
      <div className={styles.expiredMessage}>Ми одружилися 🎉</div>
    </div>;
  }

  const seconds = Math.floor(timeLeft / 1000) % 60;
  const minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <div className={`${styles.countdown} ${className || ''}`}>
      <div className={styles.timeGrid}>
        <div className={styles.timeBox}>
          <div className={styles.timeNumber}>{pad(days)}</div>
          <div className={styles.timeLabel}>Днів</div>
        </div>
        <div className={styles.timeBox}>
          <div className={styles.timeNumber}>{pad(hours)}</div>
          <div className={styles.timeLabel}>Годин</div>
        </div>
        <div className={styles.timeBox}>
          <div className={styles.timeNumber}>{pad(minutes)}</div>
          <div className={styles.timeLabel}>Хвилин</div>
        </div>
        <div className={styles.timeBox}>
          <div className={styles.timeNumber}>{pad(seconds)}</div>
          <div className={styles.timeLabel}>Секунд</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
