import { MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-primary mb-4">Get in Touch</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Have questions about our catering services or want to place a bulk order? We'd love to hear from you.
        </p>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 max-w-5xl">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Our Location</h3>
          <p className="text-foreground/70 leading-relaxed">
            Bojongkerta, Bogor<br />
            West Java, Indonesia
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Contact Us</h3>
          <p className="text-foreground/70 mb-4">
            For orders and inquiries
          </p>
          <a href="https://wa.me/6282213302131" target="_blank" rel="noreferrer" className="text-lg font-bold text-secondary hover:underline">
            +62 822-1330-2131
          </a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Opening Hours</h3>
          <p className="text-foreground/70 leading-relaxed">
            Monday - Saturday<br />
            08:00 AM - 08:00 PM
          </p>
          <p className="text-sm text-secondary font-medium mt-2">Sunday Closed</p>
        </div>
      </div>
    </section>
  );
}
