import { Hero } from "./home-sections/Hero";
import { Trust } from "./home-sections/Trust";
import { Ecosystem } from "./home-sections/Ecosystem";
import { ShopServices } from "./home-sections/ShopServices";
import { ServicesDiscovery } from "./home-sections/ServicesDiscovery";
import { DigitalProducts } from "./home-sections/DigitalProducts";
import { Recommendations } from "./home-sections/Recommendations";
import { OneCheckout } from "./home-sections/OneCheckout";
import { CoffeePetshop } from "./home-sections/CoffeePetshop";
import { AppPromotion, FinalCTA } from "./home-sections/AppPromotion";
import { FeaturedProducts } from "./home-sections/FeaturedProducts";

export default function Home() {
  return (
    <div className="bg-lex-white">
      <Hero />
      <DigitalProducts />
      <FeaturedProducts />
      <Trust />
      <Ecosystem />
      <ShopServices />
      <ServicesDiscovery />
      <Recommendations />
      <CoffeePetshop />
      <OneCheckout />
      <AppPromotion />
      <FinalCTA />
    </div>
  );
}
