"use client"

import React from 'react';
import styles from '../styles/location.module.css';

type Props = {
  address: string;
  label?: string;
};

export default function LocationMap({ address, label }: Props) {
  const q = encodeURIComponent(address);
  const embedSrc = `https://www.google.com/maps?q=${q}&hl=uk&z=15&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;

  const handleOpen = () => {
    window.open(mapsUrl, '_blank', 'noopener');
  };

  return (
    <div className={styles.mapCard}>
      <div className={styles.mapFrame}>
        <iframe
          title={label || 'Location map'}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* <button
          className={styles.markerButton}
          onClick={handleOpen}
          aria-label={`Відкрити карту: ${address}`}
        >
          
        </button> */}
      </div>
      {/* {label && <div className={styles.mapLabel}>{label}</div>} */}
    </div>
  );
}
