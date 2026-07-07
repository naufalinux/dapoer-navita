export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif font-bold text-2xl mb-4 text-accent">Dapoer Navita</h3>
          <p className="text-sm text-white/80 max-w-sm">
            Authentic Indonesian catering and delicious rice bowls based in Bogor, West Java.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#" className="hover:text-accent transition-colors">Menu</a></li>
            <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p className="text-sm text-white/80 mb-2">Bojongkerta, Bogor, West Java</p>
          <p className="text-sm text-white/80 mb-4">WhatsApp: <a href="https://wa.me/6282213302131" className="text-accent hover:underline">+62 822-1330-2131</a></p>
          <p className="text-sm text-white/80">Open Daily: 08:00 - 20:00</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Dapoer Navita. All rights reserved.
      </div>
    </footer>
  );
}
