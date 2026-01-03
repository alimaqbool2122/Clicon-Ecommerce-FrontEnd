import Banner from "@/components/home/Banner";
import BestDeails from "@/components/home/BestDeails";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IntroBanner from "@/components/home/IntroBanner";
import Services from "@/components/home/Services";
import ComputerAccessries from "@/components/home/ComputerAccessries";
import MacBook from "@/components/home/MacBook";
import ProductShowCase from "@/components/home/ProductShowCase";
import Blog from "@/components/home/Blog";
import NewsLetter from "@/components/home/NewsLetter";

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
