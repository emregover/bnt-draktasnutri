import { Link } from "react-router-dom";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { add } = useCart();
  return (
    <div className="page">
      <div className="kicker">Katalog</div>
      <h1>Tüm Ürünler</h1>
      <p className="lede">Şu an iki SKU. Ödeme henüz açık değil.</p>
      <div className="grid-2 section">
        {products.map((p) => (
          <article className="card product" key={p.id}>
            <div className="swatch" style={{ background: `linear-gradient(145deg, ${p.accent}, #0b241b)` }}>
              <span className="pill">{p.badge}</span>
              <span className="serif" style={{ fontSize: 34 }}>{p.name}</span>
            </div>
            <div className="body">
              <p>{p.summary}</p>
              <div className="price">{formatPrice(p.price)}</div>
              <div className="cta-row">
                <Link className="btn btn-ghost" to={`/urunler/${p.id}`}>Detay</Link>
                <button className="btn btn-primary" onClick={() => add(p.id)}>Sepete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
