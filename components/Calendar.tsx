"use client"

import React from 'react';
import styles from '../styles/calendar.module.css';

type CalendarProps = {
  year: number;
  month: number; // 1-12
  highlightedDay?: number;
};

const weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

export default function Calendar({ year, month, highlightedDay }: CalendarProps) {
  const jsMonth = month - 1;
  const first = new Date(year, jsMonth, 1);
  // offset if week starts on Monday
  const firstWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, jsMonth + 1, 0).getDate();

  const cells = [] as Array<null | number>;
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calendar} aria-label={`Календар ${month}/${year}`}>
      <div className={styles.header}>
        <div className={styles.monthTitle}>{first.toLocaleString('uk-UA', { month: 'long', year: 'numeric' })}</div>
      </div>
      <div className={styles.weekdays}>
        {weekdayNames.map((w) => (
          <div key={w} className={styles.weekday}>{w}</div>
        ))}
      </div>
      <div className={styles.grid}>
        {cells.map((c, i) => (
          <div key={i} className={styles.cell}>
            {c ? (
              <div className={`${styles.day} ${c === highlightedDay ? styles.highlighted : ''}`} aria-label={c === highlightedDay ? `День ${c} - особливий` : `День ${c}`}>
                <span className={styles.dayNumber}>{c}</span>
                {c === highlightedDay && (
                  <span className={styles.heart} aria-hidden>❤️</span>
                )}
              </div>
            ) : (
              <div className={styles.empty} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
