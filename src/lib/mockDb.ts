export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
  description: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  items: string;
  total: number;
  status: "Pending" | "WhatsApp Redirected" | "Completed" | "Cancelled";
  date: string;
};

export type ChatbotSettings = {
  systemPrompt: string;
  isFailoverActive: boolean;
};

// Mock In-Memory Database
export const mockDb = {
  menuItems: [
    { id: "1", name: "Nasi Ayam Geprek Mozarella", category: "Rice Bowl", price: 25000, inStock: true, image: "/images/nasi_ayam_geprek_1783444096844.png", description: "A bowl of warm white rice topped with crispy smashed fried chicken, spicy red garlic sambal, and torched mozzarella." },
    { id: "2", name: "Cumi Cabe Ijo Rice Bowl", category: "Rice Bowl", price: 25000, inStock: true, image: "/images/cumi_cabe_ijo_1783444106607.png", description: "Fluffy white rice topped with stir-fried salted baby squid coated in green chili sambal, with a sunny-side-up egg." },
    { id: "3", name: "Nasi Box Nasi Uduk Telor", category: "Nasi Box", price: 17000, inStock: false, image: "/images/nasi_box_uduk_1783444115219.png", description: "Fragrant coconut rice with spicy balado hard-boiled egg, orek tempe, bihun goreng, peanut sauce, and crackers." },
    { id: "4", name: "Tahu Berontak", category: "Gorengan", price: 11000, inStock: true, image: "/images/tahu_berontak_1783444124629.png", description: "Crispy deep-fried tofu stuffed with stir-fried shredded carrots, cabbage, and bean sprouts. (5 pieces)" },
    { id: "5", name: "Bubur Kacang Ijo", category: "Camilan/Takjil", price: 10000, inStock: true, image: "/images/bubur_kacang_ijo_1783444137461.png", description: "Sweet mung bean porridge infused with palm sugar and a swirl of coconut milk." },
  ] as MenuItem[],

  orders: [
    { id: "ORD-2026-001", customerName: "Budi Santoso", phone: "+62 812-3456-7890", items: "2x Nasi Ayam Geprek, 1x Bubur Kacang Ijo", total: 60000, status: "Pending", date: "2026-07-08" },
    { id: "ORD-2026-002", customerName: "Siti Aminah", phone: "+62 813-2233-4455", items: "5x Cumi Cabe Ijo Rice Bowl", total: 125000, status: "WhatsApp Redirected", date: "2026-07-08" },
    { id: "ORD-2026-003", customerName: "Ahmad Yani", phone: "+62 856-7788-9900", items: "2x Nasi Box Nasi Uduk Telor", total: 34000, status: "Completed", date: "2026-07-07" },
  ] as Order[],

  settings: {
    systemPrompt: "Anda adalah asisten AI untuk Dapoer Navita, sebuah bisnis katering dan rice bowl di Bogor.\nMenu kami hari ini:\n- Nasi Ayam Geprek (Rp 25.000)\n- Cumi Cabe Ijo (Rp 25.000)\n- Nasi Box Uduk (Rp 17.000)\n\nPromo Hari Ini: Gratis Tahu Berontak untuk pembelian di atas Rp 100.000.",
    isFailoverActive: false,
  } as ChatbotSettings,
};
