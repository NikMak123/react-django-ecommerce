import { Container } from "react-bootstrap";

// component
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import About from "./screens/About";

import { BrowserRouter as Router , Route } from "react-router-dom";
import CategoryButtons from "./components/CategoryButton";
import CategoryPage from "./components/Category";

// import {Redirect} from "react-router-dom/cjs/react-router-dom.min";

function App(){
    return (
      <Router>
        <div style={{position:"sticky",top:0 , zIndex:"100"}}>
         <Header/>
        </div>
         
        <Container>
          <main className="py-3">
           <Route exact path="/" component={HomeScreen} />
           <Route path="/page/:pageNumber" component={HomeScreen} />
           <Route path="/login" component={LoginScreen} />
           <Route path="/register" component={RegisterScreen} />
           <Route path="/profile" component={ProfileScreen} />
           <Route path="/shipping" component={ShippingScreen} />
           <Route path="/payment" component={PaymentScreen} />
           <Route path="/placeorder" component={PlaceOrderScreen} />
           <Route path="/order/:id" component={OrderScreen} />
           <Route path="/orderDetail" component={OrderScreen} />
           <Route path="/product/:id" component={ProductScreen} />
           <Route path="/cart/:id?" component={CartScreen} />
           {/* <Route path="/category/:category" component={Category}/> */}
           <Route path="/category/:categoryName" component={CategoryPage} />
           <Route path="/about" component={About} />

          </main>
        </Container>
       <Footer/>
      </Router>
    )
}

export default App;
