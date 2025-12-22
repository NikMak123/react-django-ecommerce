import React, { useState } from "react";

// react bootstrap
import { Button, Form, Col } from "react-bootstrap";

// component
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

// react redux 
import { useDispatch, useSelector } from "react-redux";

// action creation 
import { savePaymentMethod } from "../redux/slices/cartSlice";

function PaymentScreen({ history }) {
  // pulling out shipping address from cart
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // state
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  // if no shipping address then redirect to shipping address screen 
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault(); // ✅ fixed

    dispatch(savePaymentMethod(paymentMethod));

    // after choosing the payment method redirect user to place order screen
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="Paypal" // ✅ added
              checked={paymentMethod === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>

          {/* If you want more payment methods, just add more Form.Check here */}
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
