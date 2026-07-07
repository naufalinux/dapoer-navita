import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src="/images/tahu_berontak_1783444124629.png" 
            alt="About Dapoer Navita" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-serif font-bold text-primary">Our Story</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Dapoer Navita is an established online food supplier and catering business based in Bogor, West Java. 
            We specialize in daily catering, Nasi Box, and highly popular rice bowl menus. 
            Our journey started with a simple passion for sharing authentic Indonesian flavors with our community.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Every dish is prepared fresh daily with the finest natural ingredients, ensuring a rich and unforgettable taste. 
            Whether it's a quick lunch or a large gathering, Dapoer Navita brings the heart of Indonesian culinary tradition straight to your table.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-3xl font-bold text-secondary mb-1">100%</h4>
              <p className="text-sm font-medium text-foreground/60">Fresh Ingredients</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-secondary mb-1">50+</h4>
              <p className="text-sm font-medium text-foreground/60">Daily Orders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
