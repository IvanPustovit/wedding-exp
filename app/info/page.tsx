'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ConfirmationForm from '@/components/ConfirmationForm';
import styles from '@/styles/Info.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Info() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: '-100px' });
  const isInView2 = useInView(ref2, { once: true, margin: '-100px' });
  const isInView3 = useInView(ref3, { once: true, margin: '-100px' });

  return (
    <div className={styles.container}>
      <motion.section
        ref={ref1}
        initial="hidden"
        animate={isInView1 ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        <h2>Про наречених</h2>
        <p>Анна - ... Іван - ...</p>
      </motion.section>

      <motion.section
        ref={ref2}
        initial="hidden"
        animate={isInView2 ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        <h2>Дата та місце</h2>
        <p>Дата: 15 жовтня 2025. Місце: Київ, Україна.</p>
      </motion.section>

      <motion.section
        ref={ref3}
        initial="hidden"
        animate={isInView3 ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        <h2>Підтвердження</h2>
        <ConfirmationForm />
      </motion.section>
    </div>
  );
}