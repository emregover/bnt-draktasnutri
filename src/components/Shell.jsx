import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

const links = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/dr-aktas", label: "Dr Aktaş kimdir" },
  { to: "/urunler", label: "Tüm Ürünler" },
  { to: "/nasil-kullanilir", label: "Nasıl Kullanılır" },
  { to: "/giris", label: "Giriş Yap" },
];

export default function Shell({ children }) {
  const cart = useCart();
  const loc = useLocation();
  const closeAll = () => { cart.setMenuOpen(false); cart.setCartOpen(false); };
  return (
    <>
      <header className="sticky-bar">
        <button className="icon-btn" aria-label="Menüyü aç" onClick={() => { cart.setCartOpen(false); cart.setMenuOpen(true); }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <Link to="/" className="logo" onClick={closeAll}><strong>DrAktasNutri</strong><span>Mikrogıda Tıbbı</span></Link>
        <button className="icon-btn" aria-label="Sepeti aç" onClick={() => { cart.setMenuOpen(false); cart.setCartOpen(true); }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.8" /><path d="M9 8V7a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          {cart.count > 0 && <span className="badge-count">{cart.count}</span>}
        </button>
      </header>
      <div className={`overlay ${cart.menuOpen || cart.cartOpen ? "show" : ""}`} onClick={closeAll} />
      <aside className={`drawer left ${cart.menuOpen ? "open" : ""}`}>
        <header>
          <div><div className="kicker">Menü</div><div className="serif" style={{ fontSize: 26 }}>DrAktasNutri</div></div>
          <button className="icon-btn" style={{ color: "var(--cream)" }} onClick={() => cart.setMenuOpen(false)}>✕</button>
        </header>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")} onClick={() => cart.setMenuOpen(false)}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="meta">bnt.draktasnutri.com.tr<br />Veritabanı ve ödeme henüz bağlı değil.</div>
      </aside>
      <aside className={`drawer right ${cart.cartOpen ? "open" : ""}`}>
        <header>
          <div><div className="kicker">Sepet</div><div className="serif" style={{ fontSize: 26 }}>Siparişiniz</div></div>
          <button className="icon-btn" onClick={() => cart.setCartOpen(false)}>✕</button>
        </header>
        <div style={{ padding: "8px 22px 24px", overflow: "auto" }}>
          {cart.detailed.length === 0 && <p className="muted">Sepetiniz boş.</p>}
          {cart.detailed.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <div className="muted">{formatPrice(item.price)}</div>
                <div className="qty" style={{ marginTop: 8 }}>
                  <button onClick={() => cart.setQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => cart.setQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="price">{formatPrice(item.line)}</div>
                <button className="btn btn-ghost" style={{ marginTop: 8, padding: "4px 10px" }} onClick={() => cart.remove(item.id)}>Sil</button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}><span>Toplam</span><strong>{formatPrice(cart.total)}</strong></div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }} disabled>Ödeme yakında</button>
          {loc.pathname !== "/urunler" && <Link className="btn btn-ghost" style={{ display: "block", textAlign: "center", marginTop: 10 }} to="/urunler" onClick={() => cart.setCartOpen(false)}>Ürünlere dön</Link>}
        </div>
      </aside>
      <main>{children}</main>
      <footer className="footer">DrAktasNutri · Prof. Dr. Mikail Fikret Aktaş<br />Gıda takviyesi ilaç değildir.<br />© {new Date().getFullYear()} · bnt.draktasnutri.com.tr</footer>
    </>
  );
}
