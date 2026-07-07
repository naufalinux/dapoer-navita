import Hero from "@/components/home/Hero";
import MenuCatalog from "@/components/home/MenuCatalog";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <MenuCatalog />
      <About />
      <Contact />
    </div>
  );
}
