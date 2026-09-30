import { Link } from "react-router-dom";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { add } = useCart();
  return (
    <div className="page">
      <section className="hero">
        <div>
          <div className="kicker">Prof. Dr. Mikail Fikret Aktaş</div>
          <h1>Bilimde aranan beslenme. İki formül. Net bir mağaza.</h1>
          <p className="lede">DrAktasNutri, mikrogıda tıbbı yaklaşımıyla geliştirilen klinik destek ürünleridir. Ödeme ve üye sistemi sonraki adımdadır.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/urunler">Tüm ürünler</Link>
            <Link className="btn btn-ghost" to="/dr-aktas">Dr Aktaş kimdir</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="kicker" style={{ color: "var(--gold-soft)" }}>Klinik hat</div>
          <h3>20+ yıl bilimsel danışmanlık</h3>
          <p>Hamburg ve Berlin çizgisinde geliştirilen formüller, hekim gözetimli programların tamamlayıcısıdır.</p>
        </div>
      </section>
      <section className="section">
        <div className="kicker">Katalog</div>
        <h2 className="serif" style={{ fontSize: 36, margin: "6px 0 18px" }}>İki ürün</h2>
        <div className="grid-2">
          {products.map((p) => (
            <article className="card product" key={p.id}>
              <div className="swatch" style={{ background: `linear-gradient(145deg, ${p.accent}, #0b241b)` }}>
                <span className="pill">{p.badge}</span>
                <span className="serif" style={{ fontSize: 34 }}>{p.name}</span>
              </div>
              <div className="body">
                <p className="muted">{p.short}</p>
                <div className="price">{formatPrice(p.price)} <small className="muted">/ {p.unit}</small></div>
                <div className="cta-row">
                  <Link className="btn btn-ghost" to={`/urunler/${p.id}`}>İncele</Link>
                  <button className="btn btn-primary" onClick={() => add(p.id)}>Sepete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
