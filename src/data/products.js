export const products = [
  {
    id: "glukomana-plus-3",
    name: "GlukoMana+3",
    short: "Tokluk hissini destekleyen glukomannan formülü",
    price: 1890,
    unit: "30 günlük kullanım",
    badge: "Lokomotif ürün",
    accent: "#1F6B4A",
    summary: "Konjac kökünden elde edilen glukomannan, sıvı ile birlikte midede hacim kaplayarak tokluk hissine katkı sağlar.",
    highlights: ["Öğünlerden 30 dk önce, bol su ile", "Kalori kısıtlı beslenme ile birlikte", "Günlük sıvı alımını ihmal etmeyin"],
    usage: ["Günde 1–2 porsiyon, ana öğünden 20–30 dakika önce alınır.", "Her porsiyon en az 250–300 ml su ile tüketilir.", "Yutma güçlüğü olanlar ve 18 yaş altı için hekim onayı olmadan kullanılmaz.", "İlaçlarla aynı anda alınmamalı; en az 2 saat ara bırakılmalıdır."],
  },
  {
    id: "shape-food-omega",
    name: "Shape-food Omega",
    short: "Taze balık kaynağı, düşük totoks değerli omega-3",
    price: 1640,
    unit: "60 kapsül",
    badge: "Klinik formül",
    accent: "#2A4A6B",
    summary: "Shape-food (eski adı DEZ) hattının omega-3 formülü. Taze balık kaynağı ve düşük totoks değeri hedeflenir.",
    highlights: ["Yemekle birlikte 1–2 kapsül", "Buzdolabında saklanabilir", "Toksik oksidasyon değeri şeffaf tutulur"],
    usage: ["Yetişkinler için günde 1–2 kapsül, ana öğünle birlikte.", "Kapsüller bütün olarak yutulur; çiğnenmez.", "Kan sulandırıcı kullananlar hekime danışmalıdır.", "Açılmamış kutu serin ve karanlık yerde muhafaza edilir."],
  },
];

export const formatPrice = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
