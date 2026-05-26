export const stays = Array.from({ length: 50 }, (_, index) => {
  const cities = [
    "Reykjavík",
    "Vík",
    "Höfn",
    "Akureyri",
    "Costa Sul",
    "Westfjords",
    "Golden Circle",
    "Blue Lagoon",
    "Sudeste",
    "Norte",
  ];

  const types = [
    "Cabana premium",
    "Lodge de luxo",
    "Casa de vidro",
    "Resort Aurora",
    "Hotel premium",
    "Suite executiva",
    "Cabana romântica",
    "Hospedagem econômica",
  ];

  const tagsPool = [
    "Aurora boreal",
    "Vista panorâmica",
    "Premium",
    "Família",
    "Casal",
    "Luxo",
    "Spa",
    "Montanhas",
    "Geleiras",
    "Natureza",
    "Executivo",
    "Piscina",
    "Vista neve",
    "Centro",
    "Romântico",
    "Aventura",
  ];

  const images = [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
  ];
  const names = [
    "Northern Lights Cabin",
    "Aurora Retreat",
    "Glacier Lodge",
    "Ice Cave Suites",
    "Arctic Sky House",
    "Midnight Sun Hotel",
    "Polar Aurora Resort",
    "Black Sand Cabin",
    "Fjord Residence",
    "Viking Mountain Lodge",
  ];

  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  return {
    id: index + 1,

    name: `${random(names)} ${index + 1}`,

    location: `${random(cities)}, Islândia`,

    price: Math.floor(Math.random() * 450) + 120,

    rating: (Math.random() * (5 - 4.5) + 4.5).toFixed(1),

    guests: Math.floor(Math.random() * 8) + 2,

    type: random(types),

    image: images[index % images.length],
    category: random([
      "luxo",
      "aurora",
      "romantico",
      "familia",
      "premium",
      "economico",
    ]),

    tags: [random(tagsPool), random(tagsPool), random(tagsPool)],
  };
});
