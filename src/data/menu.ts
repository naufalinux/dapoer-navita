export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string[];
};

export const categories = [
  "All",
  "Resto's top picks",
  "Rice Bowl",
  "Nasi Box",
  "Gorengan",
  "Camilan/Takjil",
];

export const menuData: MenuItem[] = [
  {
    id: "1",
    name: "Nasi Ayam Geprek Mozarella",
    description: "Crispy smashed fried chicken coated in spicy red garlic sambal and generously topped with melted mozzarella cheese.",
    price: 25000,
    image: "/images/nasi_ayam_geprek_1783444096844.png",
    category: ["Resto's top picks", "Rice Bowl"],
  },
  {
    id: "2",
    name: "Cumi Cabe Ijo Rice Bowl",
    description: "Fluffy white rice topped with salted baby squid deeply coated in a rich, spicy green chili sambal, served with fried egg.",
    price: 25000,
    image: "/images/cumi_cabe_ijo_1783444106607.png",
    category: ["Resto's top picks", "Rice Bowl"],
  },
  {
    id: "3",
    name: "Nasi Box Nasi Uduk Telor",
    description: "Fragrant coconut rice with spicy balado hard-boiled egg, sweet and spicy dry tempeh, stir-fried glass noodles, and peanut sauce.",
    price: 17000,
    image: "/images/nasi_box_uduk_1783444115219.png",
    category: ["Nasi Box"],
  },
  {
    id: "4",
    name: "Tahu Berontak",
    description: "Golden, crispy, deep-fried tofu with a savory filling of stir-fried shredded carrots, cabbage, and bean sprouts.",
    price: 11000,
    image: "/images/tahu_berontak_1783444124629.png",
    category: ["Gorengan"],
  },
  {
    id: "5",
    name: "Bubur Kacang Ijo",
    description: "Rich sweet mung bean porridge infused with palm sugar, topped with thick white coconut milk and evaporated milk.",
    price: 10000,
    image: "/images/bubur_kacang_ijo_1783444137461.png",
    category: ["Camilan/Takjil"],
  },
];
