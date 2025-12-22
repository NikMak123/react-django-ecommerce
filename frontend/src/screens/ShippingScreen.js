import React , {useState} from "react";

// react bootstrap
import { Button, Form } from "react-bootstrap";

// component
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

// React - Redux
import { useDispatch , useSelector } from "react-redux";

// action creators
import { saveShippingAddress } from "../redux/slices/cartSlice"

function ShippingScreen({ history }){
    // pulling our shipping address from cart
    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;

    // state
    const [address , setAddress] = useState(shippingAddress.address);
    const [city , setCity] = useState(shippingAddress.city);
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode);
    const [country , setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    // handlers
     const submitHandler = (e) => {
        e.preventDefault();

        // firing off action creators using dispatch to save address
        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            })
        );

        // pushing user to payments page after saving address
        history.push("./payment");
     };

     return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                 <Form.Label>Address</Form.Label>
                 <Form.Control 
                 required
                 type="text"
                 placeholder="Enter Address"
                 value={address ? address : ""}
                 onChange={(e) => setAddress(e.target.value)}
                 />
                </Form.Group>

                <Form.Group controlId="city">
                 <Form.Label>City</Form.Label>
                 <Form.Control 
                 required
                 type="text"
                 placeholder="Enter city"
                 value={city ? city : ""}
                 onChange={(e) => setCity(e.target.value)}
                 />
                </Form.Group>

                <Form.Group controlId="postalCode">
                 <Form.Label>Postal Code</Form.Label>
                 <Form.Control 
                 required
                 type="text"
                 placeholder="Enter Postal Code"
                 value={postalCode ? postalCode : ""}
                 onChange={(e) => setPostalCode(e.target.value)}
                 />
                </Form.Group>

                <Form.Group controlId="country">
                 <Form.Label>Country</Form.Label>
                 <Form.Control 
                 required
                 type="text"
                 placeholder="Enter your country"
                 value={country ? country : ""}
                 onChange={(e) => setCountry(e.target.value)}
                 />
                </Form.Group>

                <Button className="my-3" type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
     );
}

export default ShippingScreen;
