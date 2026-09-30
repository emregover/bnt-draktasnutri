import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);
const KEY = "draktasnutri.cart.v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const add = (id, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((i) => i.id === id);
        if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { id, qty }];
      });
      setCartOpen(true);
    };
    const setQty = (id, qty) => {
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    };
    const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
    const detailed = items
      .map((i) => {
        const p = products.find((x) => x.id === i.id);
        return p ? { ...p, qty: i.qty, line: p.price * i.qty } : null;
      })
      .filter(Boolean);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = detailed.reduce((s, i) => s + i.line, 0);
    return { items, detailed, count, total, add, setQty, remove, menuOpen, setMenuOpen, cartOpen, setCartOpen };
  }, [items, menuOpen, cartOpen]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
