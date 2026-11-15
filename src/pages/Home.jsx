import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import OfferBanner from "../components/OfferBanner";
import Features from "../components/Features";
import RecommendedProducts from "../components/RecommendedProducts";


const Home = () => {
  return (
    <main className="bg-gray-50">
      <Hero />

      <div className="w-full  sm:px-6 lg:px-2">
        <FeaturedProducts />
        <OfferBanner />
        <Features />
        <RecommendedProducts />
      </div>
    </main>
  );
};

export default Home;