import { Link, useParams } from "react-router-dom";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  if (!product) return (<div className="page"><h1>Ürün bulunamadı</h1><Link to="/urunler">Kataloğa dön</Link></div>);
  return (
    <div className="page">
      <div className="kicker">{product.badge}</div>
      <h1>{product.name}</h1>
      <p className="lede">{product.summary}</p>
      <div className="card">
        <div className="price" style={{ fontSize: 28 }}>{formatPrice(product.price)}</div>
        <ul>{product.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        <button className="btn btn-primary" onClick={() => add(product.id)}>Sepete ekle</button>
      </div>
    </div>
  );
}
