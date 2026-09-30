const PRODUCTS = [
  {
    id: "glukomana-plus-3",
    name: "GlukoMana+3",
    short: "Tokluk hissini destekleyen glukomannan formülü",
    price: 1890,
    unit: "30 günlük kullanım",
    badge: "Lokomotif ürün",
    accent: "#1F6B4A",
    summary:
      "Konjac kökünden elde edilen glukomannan, sıvı ile birlikte midede hacim kaplayarak tokluk hissine katkı sağlar. Prof. Dr. Aktaş’ın klinik yaklaşımında kilo yönetimi programlarının tamamlayıcısı olarak konumlanır.",
    highlights: [
      "Öğünlerden 30 dk önce, bol su ile",
      "Kalori kısıtlı beslenme ile birlikte",
      "Günlük sıvı alımını ihmal etmeyin",
    ],
    usage: [
      "Günde 1–2 porsiyon, ana öğünden 20–30 dakika önce alınır.",
      "Her porsiyon en az 250–300 ml su ile tüketilir.",
      "Yutma güçlüğü olanlar ve 18 yaş altı için hekim onayı olmadan kullanılmaz.",
      "İlaçlarla aynı anda alınmamalı; en az 2 saat ara bırakılmalıdır.",
    ],
  },
  {
    id: "shape-food-omega",
    name: "Shape-food Omega",
    short: "Taze balık kaynağı, düşük totoks değerli omega-3",
    price: 1640,
    unit: "60 kapsül",
    badge: "Klinik formül",
    accent: "#2A4A6B",
    summary:
      "Shape-food (eski adı DEZ) hattının omega-3 formülü. Prof. Dr. Aktaş’ın vurguladığı gibi taze balık kaynağı ve düşük totoks değeri hedeflenir.",
    highlights: [
      "Yemekle birlikte 1–2 kapsül",
      "Buzdolabında saklanabilir",
      "Toksik oksidasyon değeri şeffaf tutulur",
    ],
    usage: [
      "Yetişkinler için günde 1–2 kapsül, ana öğünle birlikte.",
      "Kapsüller bütün olarak yutulur; çiğnenmez.",
      "Kan sulandırıcı kullananlar hekime danışmalıdır.",
      "Açılmamış kutu serin ve karanlık yerde muhafaza edilir.",
    ],
  },
];

const KEY = "draktasnutri.cart.v1";
const money = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

const state = {
  items: JSON.parse(localStorage.getItem(KEY) || "[]"),
  menu: false,
  cart: false,
};

const save = () => localStorage.setItem(KEY, JSON.stringify(state.items));
const count = () => state.items.reduce((s, i) => s + i.qty, 0);
const detailed = () =>
  state.items
    .map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      return p ? { ...p, qty: i.qty, line: p.price * i.qty } : null;
    })
    .filter(Boolean);
const total = () => detailed().reduce((s, i) => s + i.line, 0);

function add(id) {
  const found = state.items.find((i) => i.id === id);
  if (found) found.qty += 1;
  else state.items.push({ id, qty: 1 });
  save();
  state.cart = true;
  state.menu = false;
  renderChrome();
}

function setQty(id, qty) {
  if (qty <= 0) state.items = state.items.filter((i) => i.id !== id);
  else state.items = state.items.map((i) => (i.id === id ? { ...i, qty } : i));
  save();
  renderChrome();
}

function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "urunler" && parts[1]) return { name: "detail", id: parts[1] };
  if (parts[0] === "urunler") return { name: "products" };
  if (parts[0] === "dr-aktas") return { name: "about" };
  if (parts[0] === "nasil-kullanilir") return { name: "howto" };
  if (parts[0] === "giris") return { name: "login" };
  return { name: "home" };
}

function productCard(p, extra = "") {
  return `
    <article class="card product">
      <div class="swatch" style="background:linear-gradient(145deg, ${p.accent}, #0b241b)">
        <span class="pill">${p.badge}</span>
        <span class="serif" style="font-size:34px">${p.name}</span>
      </div>
      <div class="body">
        <p class="muted">${p.short}</p>
        <div class="price">${money(p.price)} <small class="muted">/ ${p.unit}</small></div>
        <div class="cta-row">
          <a class="btn btn-ghost" href="#/urunler/${p.id}">İncele</a>
          <button class="btn btn-primary" data-add="${p.id}">Sepete</button>
        </div>
        ${extra}
      </div>
    </article>`;
}

function viewHome() {
  return `
    <section class="hero">
      <div>
        <div class="kicker">Prof. Dr. Mikail Fikret Aktaş</div>
        <h1>Bilimde aranan beslenme. İki formül. Net bir mağaza.</h1>
        <p class="lede">DrAktasNutri, mikrogıda tıbbı yaklaşımıyla geliştirilen klinik destek ürünleridir. Bu vitrin iki ürüne odaklanır; ödeme ve üye sistemi sonraki adımda eklenecektir.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#/urunler">Tüm ürünler</a>
          <a class="btn btn-ghost" href="#/dr-aktas">Dr Aktaş kimdir</a>
        </div>
      </div>
      <div class="hero-card">
        <div class="kicker" style="color:var(--gold-soft)">Klinik hat</div>
        <h3>20+ yıl bilimsel danışmanlık</h3>
        <p>Hamburg ve Berlin çizgisinde geliştirilen formüller, hazır diyet listesi değil; hekim gözetimli programların tamamlayıcısıdır.</p>
      </div>
    </section>
    <section class="section">
      <div class="kicker">Katalog</div>
      <h2 class="serif" style="font-size:36px;margin:6px 0 18px">İki ürün</h2>
      <div class="grid-2">${PRODUCTS.map((p) => productCard(p)).join("")}</div>
    </section>
    <section class="grid-3 section">
      <div class="card"><h3>Yo-yo değil, alışkanlık</h3><p class="muted">Hedef hızlı mucize değil; ölçülebilir değişim.</p></div>
      <div class="card"><h3>Mikrogıda tıbbı</h3><p class="muted">Formüller klinik pratikte kullanılan programların parçası.</p></div>
      <div class="card"><h3>Şeffaf sonraki adım</h3><p class="muted">Paywall ve veritabanı henüz yok. Sepet yereldir.</p></div>
    </section>`;
}

function viewAbout() {
  return `
    <div class="kicker">Biyografi</div>
    <h1>Dr Aktaş kimdir</h1>
    <p class="lede">Prof. Dr. Mikail Fikret Aktaş, 1975’te Hamburg’da doğdu. Hamburg Üniversitesi Besin Bilimleri’ni bitirdi; Berlin Üniversitesi’nden Doctor rerum medicinalium unvanını aldı.</p>
    <div class="grid-2 section">
      <article class="card"><h3>Akademik hat</h3><p>2011’den beri Berlin Üniversitesi obezite araştırmalarında yer aldı. 2015’te doçent, 2019’da Univ.-Vis. Profesör oldu. 2019’dan itibaren İstanbul Üniversitesi’nde misafir profesörlük yaptı.</p></article>
      <article class="card"><h3>Klinik ve ürün</h3><p>Obezite programları ve mikrogıda tıbbı kapsamında DrAktasNutri ile Shape-food (eski adı DEZ) ürünlerini geliştirdi; 1999’dan beri klinik pratikte kullandı.</p></article>
      <article class="card"><h3>Eğitim ve yayın</h3><p>Hekimlere beslenme tıp eğitimleri hazırladı. 2010–2012’de Avrupa TV’sinde Beslenme Saati’ni sundu. Michael Hamm ile “Sağlıklı Beslenin ve Sağlıklı Kalın” kitabını yayımladı. 2013’te bu eğitimi Türkiye’ye taşıdı.</p></article>
      <article class="card"><h3>Yaklaşım</h3><p>“Beslenme bilgisi sosyal medyada değil, bilimde aranmalı.” Bu mağaza, o hattın iki ürününe odaklanan vitrindir.</p></article>
    </div>`;
}

function viewProducts() {
  return `
    <div class="kicker">Katalog</div>
    <h1>Tüm Ürünler</h1>
    <p class="lede">Mağazada şu an iki SKU vardır. Fiyatlar vitrin içindir; ödeme henüz açık değildir.</p>
    <div class="grid-2 section">\( {PRODUCTS.map((p) => productCard(p, `<p> \){p.summary}</p>`)).join("")}</div>`;
}

function viewDetail(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return `<h1>Ürün bulunamadı</h1><a href="#/urunler">Kataloğa dön</a>`;
  return `
    <div class="kicker">${p.badge}</div>
    <h1>${p.name}</h1>
    <p class="lede">${p.summary}</p>
    <div class="grid-2 section">
      <div class="swatch" style="height:280px;border-radius:24px;background:linear-gradient(145deg, ${p.accent}, #0b241b)">
        <span class="serif" style="font-size:42px;color:#fff">${p.name}</span>
      </div>
      <div class="card">
        <div class="price" style="font-size:28px">${money(p.price)}</div>
        <div class="muted">${p.unit}</div>
        <ul>\( {p.highlights.map((h) => `<li> \){h}</li>`).join("")}</ul>
        <button class="btn btn-primary" data-add="${p.id}">Sepete ekle</button>
        <p class="notice" style="margin-top:16px">Gıda takviyesidir, ilaç değildir. Teşhis veya tedavi amacıyla kullanılamaz.</p>
      </div>
    </div>
    <h2>Nasıl kullanılır</h2>
    <ol class="steps">\( {p.usage.map((u) => `<li> \){u}</li>`).join("")}</ol>`;
}

function viewHowTo() {
  return `
    <div class="kicker">Kullanım</div>
    <h1>Nasıl Kullanılır</h1>
    <p class="lede">Genel vitrin yönergesidir; bireysel protokol yerine geçmez.</p>
    <div class="notice section">Bol su, düzenli öğün ve uzman gözetimi olmadan takviye tek başına sonuç vaat etmez. Glukomannan için yutma güvenliği kritiktir.</div>
    <div class="grid-2">${PRODUCTS.map(
      (p) => `<article class="card"><h3>\( {p.name}</h3><ol class="steps"> \){p.usage
        .map((u) => `<li>${u}</li>`)
        .join("")}</ol><a class="btn btn-ghost" href="#/urunler/${p.id}">Ürün sayfası</a></article>`
    ).join("")}</div>`;
}

function viewLogin() {
  return `
    <div class="login-box card">
      <div class="kicker">Hesap</div>
      <h1>Giriş Yap</h1>
      <p class="muted">Üye sistemi ve paywall bu sürümde kapalıdır. Form veri göndermez.</p>
      <form onsubmit="return false">
        <label for="email">E-posta</label>
        <input id="email" type="email" placeholder="ornek@posta.com" />
        <label for="pass">Şifre</label>
        <input id="pass" type="password" placeholder="••••••••" />
        <button class="btn btn-primary" disabled>Giriş yakında</button>
      </form>
      <p class="notice" style="margin-top:16px">Sonraki adım: kimlik doğrulama + ödeme duvarı.</p>
    </div>`;
}

function renderPage() {
  const r = route();
  const root = document.getElementById("page");
  const map = {
    home: viewHome,
    about: viewAbout,
    products: viewProducts,
    howto: viewHowTo,
    login: viewLogin,
    detail: () => viewDetail(r.id),
  };
  root.innerHTML = map[r.name]();
  document.querySelectorAll(".nav-link").forEach((a) => {
    const href = a.getAttribute("href").replace("#", "") || "/";
    const current = location.hash.replace("#", "") || "/";
    a.classList.toggle("active", href === current || (href !== "/" && current.startsWith(href)));
  });
  window.scrollTo(0, 0);
}

function renderChrome() {
  const badge = document.getElementById("cart-count");
  if (count() > 0) {
    badge.textContent = count();
    badge.classList.remove("hidden");
  } else badge.classList.add("hidden");

  document.getElementById("menu-drawer").classList.toggle("open", state.menu);
  document.getElementById("cart-drawer").classList.toggle("open", state.cart);
  document.getElementById("overlay").classList.toggle("show", state.menu || state.cart);

  const box = document.getElementById("cart-body");
  const rows = detailed();
  box.innerHTML =
    rows.length === 0
      ? `<p class="muted">Sepetiniz boş.</p>`
      : rows
          .map(
            (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div class="muted">${money(item.price)}</div>
            <div class="qty" style="margin-top:8px">
              <button data-qty="\( {item.id}: \){item.qty - 1}">−</button>
              <span>${item.qty}</span>
              <button data-qty="\( {item.id}: \){item.qty + 1}">+</button>
            </div>
          </div>
          <div style="text-align:right">
            <div class="price">${money(item.line)}</div>
            <button class="btn btn-ghost" style="margin-top:8px;padding:4px 10px" data-qty="${item.id}:0">Sil</button>
          </div>
        </div>`
          )
          .join("") +
        `<div style="display:flex;justify-content:space-between;margin-top:16px"><span>Toplam</span><strong>${money(
          total()
        )}</strong></div>
         <button class="btn btn-primary" style="width:100%;margin-top:16px" disabled>Ödeme yakında</button>
         <p class="muted" style="font-size:13px;margin-top:10px">Paywall ve ödeme altyapısı bu aşamada kurulmadı. Sepet yalnızca tarayıcınızda tutulur.</p>`;
}

document.addEventListener("click", (e) => {
  const addId = e.target.closest("[data-add]")?.dataset.add;
  if (addId) add(addId);
  const qty = e.target.closest("[data-qty]")?.dataset.qty;
  if (qty) {
    const [id, n] = qty.split(":");
    setQty(id, Number(n));
  }
});

window.addEventListener("hashchange", renderPage);
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("open-menu").onclick = () => {
    state.menu = true;
    state.cart = false;
    renderChrome();
  };
  document.getElementById("open-cart").onclick = () => {
    state.cart = true;
    state.menu = false;
    renderChrome();
  };
  document.getElementById("overlay").onclick = () => {
    state.menu = state.cart = false;
    renderChrome();
  };
  document.getElementById("close-menu").onclick = () => {
    state.menu = false;
    renderChrome();
  };
  document.getElementById("close-cart").onclick = () => {
    state.cart = false;
    renderChrome();
  };
  document.getElementById("menu-drawer").addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      state.menu = false;
      renderChrome();
    }
  });
  renderPage();
  renderChrome();
});
