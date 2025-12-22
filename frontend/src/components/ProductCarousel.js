import React, { useEffect } from "react";
import { Carousel , Image} from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message  from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";


function ProductCarousel(){
    const dispatch = useDispatch();
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
    const {error , loading , products} = topRatedProducts;
    console.log(topRatedProducts);

    useEffect(() => {
        dispatch(fetchTopRatedProducts());
    },[dispatch]);

    return loading?(
        <Loader/>
    ): error ? (
        <Message variant="danger">{error}</Message>
    ): (
        <Carousel >    
            {products.map((product) => (     
        <Carousel.Item key={product._id} interval={1000}>
            <Link to={`/product/${product._id}`}>
        <Image src={product.image} style={{ height: "500px", width: "1250px" }} alt={product.name} />
        <Carousel.Caption>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>
            ))}
        </Carousel>

    )
    
}

export default ProductCarousel;