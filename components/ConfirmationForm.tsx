'use client';

import { useState } from 'react';

export default function ConfirmationForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, attending }),
    });
    if (res.ok) alert('Дякуємо за підтвердження!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше ім'я"
        required
      />
      <select value={attending ? 'yes' : 'no'} onChange={(e) => setAttending(e.target.value === 'yes')}>
        <option value="yes">Прийду</option>
        <option value="no">Не прийду</option>
      </select>
      <button type="submit">Підтвердити</button>
    </form>
  );
}