import Banner from "@/components/home/Banner";
import BestDeails from "@/components/home/BestDeails";
import Blog from "@/components/home/Blog";
import Categories from "@/components/home/Categories";
import ComputerAccessries from "@/components/home/ComputerAccessries";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IntroBanner from "@/components/home/IntroBanner";
import MacBook from "@/components/home/MacBook";
import NewsLetter from "@/components/home/NewsLetter";
import ProductShowCase from "@/components/home/ProductShowCase";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <BestDeails />
      <Categories />
      <FeaturedProducts />
      <IntroBanner />
      <ComputerAccessries />
      <MacBook />
      <ProductShowCase />
      <Blog />
      <NewsLetter />
    </>
  );
}
