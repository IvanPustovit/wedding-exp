  import styles from '@/styles/Envelope.module.css';

export default function Envelope() {
  return (
    <div className={styles.envelope}>
      <div className={styles.flap}></div>
      <div className={styles.body}></div>
      {/* Анімація відкриття через CSS */}
    </div>
  );
}