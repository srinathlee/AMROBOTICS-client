import Content from "./Content";
import PropductsContainer from "./PropductsContainer";
import VehicleCarousel from "./VehicleCarousel";
import Card from "./Card";
import PopularProducts from "./PopularProducts";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {GetHomeProducts} from "../../helper"
import { useState, useEffect } from "react";


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await GetHomeProducts();
    console.log(response)
    if (response.status == 200) {
      setProducts(response.data.products);
      }
      setLoading(false);
    };

  return (
    <div>
      <Navbar />
      <VehicleCarousel />
      <br />
      <Content />
      <PropductsContainer products={products} />
      <Card />
      <PopularProducts products={products} />
      <br />
      {/* <FullCard/> */}
      <br />
      <Footer/>
    </div>
  );    
}

export default Home;
