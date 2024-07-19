import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/productList";
import Footer from "../features/common/Footer";
import HomeCom from "../features/home/Home";

function Home() {
    return ( 
        <div>
            <Navbar>
                <HomeCom></HomeCom>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default Home;