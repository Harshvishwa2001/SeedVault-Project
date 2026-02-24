import ChooseSeed from "@/component/ChooseSeed";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Hero from "@/component/Hero";
import Improveseed from "@/component/Improveseed";
import SeedCatalog from "@/component/SeedCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ChooseSeed />
      <Improveseed />
      <SeedCatalog />
      <Footer />

    </>
  );
}
