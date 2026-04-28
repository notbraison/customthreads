'use client';

import { useState } from 'react';

export function useCart() {
  const [count, setCount] = useState(0);

  const addToCart = () => {
    setCount(count + 1);
  };

  const removeFromCart = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return { count, addToCart, removeFromCart };
}
