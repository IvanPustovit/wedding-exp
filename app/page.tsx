"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Імпорт для App Router
import EnvelopeAnimation from '../components/EnvelopeAnimation';

export default function Index() {
  const [showCard, setShowCard] = useState(false);
  const router = useRouter(); // Зміна назви на router для ясності

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (showCard) {
      // Запускаємо таймер для перенаправлення
      timer = setTimeout(() => {
        router.push('/wedding');
      }, 2000);
    }
    // Очищаємо таймер при розмонтуванні компонента
    return () => clearTimeout(timer);
  }, [showCard, router]);

  const handleEnvelopeOpen = () => {
    setShowCard(true);
  };

  return (
    <div>
      <EnvelopeAnimation onOpen={handleEnvelopeOpen} />
    </div>
  );
}