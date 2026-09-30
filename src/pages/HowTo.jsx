import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function HowTo() {
  return (
    <div className="page">
      <div className="kicker">Kullanım</div>
      <h1>Nasıl Kullanılır</h1>
      <div className="grid-2">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <h3>{p.name}</h3>
            <ol className="steps">{p.usage.map((u) => <li key={u}>{u}</li>)}</ol>
            <Link className="btn btn-ghost" to={`/urunler/${p.id}`}>Ürün sayfası</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
